# Vôti
> Political alignment tool comparing user answers to real deputy voting records — ARCHIVED as a spec
> goal: [startapps-voti](../../brain/goals/startapps-voti.md)

**Archived 2026-07-30. There is no code here.** The implementation was deleted deliberately; the
project will be rebuilt from scratch when it comes up again.

Everything worth keeping is in [SPECS.md](SPECS.md): the idea, the discrimination-score algorithm
that decides *which* votes are worth asking about, the data model, the concordance matrix, and the
seven defects that made a rewrite the right call rather than a refactor.

The deleted implementation and its 54 MB scraped dataset are in git history — last code commit
`d43c28c`. `git show d43c28c:src/lib/votingAnalyzer.ts` still works.

Nothing here is loaded by any flow or skill. Do not restore the code to "fix" it — read the spec and
rebuild.

<!-- routing:start -->
## Routing

| File | Interface | API | Description |
|------|-----------|-----|-------------|
| [`README.md`](README.md) | — | — | Vôti 🗳️ |
| [`SPECS.md`](SPECS.md) | — | — | SPECS — Vôti |
<!-- routing:end -->
