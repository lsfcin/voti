# SPECS — Vôti

> **Status: archived as an idea, 2026-07-30.** The implementation was deleted; the project will be
> rebuilt from scratch. Everything needed to rebuild it is in this file. The old code and the 54 MB
> scraped dataset are **not lost** — they are in this repo's git history (last code commit
> `c28b108`); `git show c28b108:src/lib/votingAnalyzer.ts` and friends still work.

## The idea

Compare a citizen's actual positions against a legislator's **actual voting record**, not against
what the legislator claims to believe. The user answers a questionnaire about concrete legislative
matters; each answer is matched to how every deputy really voted on that matter; the output is an
affinity ranking.

The value is in refusing self-declaration on both sides: no manifestos, no party labels, no
candidate questionnaires. Only roll-call votes, which are public record.

## The hard problem (this is the part worth keeping)

The Câmara holds thousands of roll-call votes. You cannot ask a citizen about all of them, and most
are useless for telling deputies apart — near-unanimous votes carry almost no information.

**So the central question is: which votes best discriminate between deputies?** That is a
question-selection problem, and it is what the whole system turns on. The old implementation scored
every vote and kept the top N:

```
discriminationScore = 0.4·entropy + 0.3·variance + 0.3·polarizationIndex
```

- **entropy** — Shannon entropy over the four outcome categories (SIM / NÃO / ABSTENÇÃO / AUSENTE),
  in bits. High when the chamber genuinely split.
- **variance** — votes mapped to a scalar (SIM=1, NÃO=0, ABSTENÇÃO=0.5, AUSENTE=0.25), then
  population variance.
- **polarizationIndex** — `1 - |yesRatio - noRatio|` computed over SIM+NÃO only (abstentions and
  absences excluded from the denominator). Peaks at a 50/50 split.

The 0.4/0.3/0.3 weights were **chosen by hand and never validated.** Treat them as a starting guess,
not a result. Validating them is the first real research question of the rebuild.

## Data model

```ts
VotingProject  { id, title, date, votes: Record<deputyName, "SIM"|"NAO"|"ABSTENCAO"|"AUSENTE"> }
AnalysisResult { project, entropy, variance, polarizationIndex, discriminationScore,
                 yesVotes, noVotes, abstentions, absences, totalVotes }
ConcordanceMatrix { [deputy1]: { [deputy2]: { concordance, totalComparisons } } }
DeputyAffinity { deputy, party, state, affinity, agreements, disagreements, matches }
```

**Concordance matrix** — pairwise deputy agreement: for every project where both deputies were
present (`AUSENTE` excluded on either side), count identical votes, then divide by comparisons.
Gives party-affinity clustering for free, independent of declared party.

## Data sources

- Câmara dos Deputados open data + scraping of the Congress site (deputy roster, party, state,
  photos, roll-call results).
- The working set was a CSV of roll-call votes 2022–2025, plus a curated
  `topDistinguishingProjects.json` of high-signal matters.
- **Scraping was the fragile part.** The Congress site's structure changed under the project more
  than once. In a rebuild, isolate parsing behind a seam with recorded fixtures so a layout change
  breaks one adapter and one test, not the app.

## Where an LLM earned its place, and where it did not

- **Earned it:** simplifying legislative text into plain Portuguese. Bill language is the single
  biggest barrier to a citizen answering honestly.
- **Earned it:** generating questionnaire items from a selected vote.
- **Did not:** anything touching the score. Affinity must stay deterministic and auditable — a
  citizen has to be able to see exactly why a deputy ranked where they did. Keep the LLM on the
  presentation side of the line, never the scoring side.
- Always keep a static fallback question set for when the model is unavailable.

## Defects to not rebuild

Found while archiving. These are the concrete reasons the rewrite is warranted:

1. **Vote-string normalization was inconsistent between metrics — a real scoring bug.**
   `getVoteCounts` accepted many spellings (`SIM`/`Sim`, `NAO`/`NÃO`/`Não`, `ABSTENCAO`/`Abstenção`,
   `AUSENTE`/`Não votou`, `OBSTRUCAO`/`Obstrução`), but `calculateVariance` switched on only the
   uppercase canonical forms and defaulted everything else to `0` — i.e. to "NÃO". So a project
   whose CSV used `Sim`/`Não votou` scored correctly in entropy and **silently wrong in variance**,
   and therefore wrong in `discriminationScore`. Normalize once, at parse time, into a closed enum.
   Never switch on a raw string twice.
2. **`AUSENTE` = 0.25 in the variance scalar is meaningless.** An absence is missing data, not a
   quarter-yes. Model presence explicitly and exclude absences from scalar statistics.
3. **Concordance matrix is O(deputies² × projects)** with the deputy loop nested inside the project
   loop — 513 deputies is ~263k pairs recomputed per project. Fine for a demo, not for the real
   chamber. Compute upper-triangle only, or vectorize.
4. **A debug `console.log` block fired on `project.id === 'projeto-1'`** in the hot path.
5. **No auth, every API route public**, including the scraping and image-download triggers.
6. **`verify:fast` was red** (8 `react/no-unescaped-entities` errors) and `max-lines-per-function`,
   `curly` and `no-explicit-any` were demoted to `warn` to hide an accumulated backlog. Start the
   rebuild with these at `error` — the backlog only formed because the rule was silenced.
7. **54 MB of scraped assets committed into the repo**, including an 18.8 MB PDF. Data belongs
   outside the code repo, fetched by a reproducible script.

## If rebuilt

Keep: the discrimination-score idea, the concordance matrix, the deterministic-scoring rule, the
plain-language simplification step. Redo: the data layer (fetch script + fixtures, no committed
blobs), the normalization seam, and the question-selection weights — this time with a validation
method rather than three hand-picked constants.
