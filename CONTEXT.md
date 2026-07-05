# Voti
> Political alignment tool comparing user answers to real deputy voting records
> goal: [startapps-voti](../../brain/goals/startapps-voti.md)

Political alignment tool — users answer a questionnaire about legislative topics; results are compared to real deputy voting records to compute affinity scores.

## Stack

Next.js 14 · TypeScript · Tailwind CSS

## Architecture

```
Questionnaire flow → scoring (votingAnalyzer) → affinity grid (PoliticiansGrid)
API routes → Brazilian Congress scraping → deputy/voting data
```

## File Map

### Pages (`src/app/`)
- `page.tsx` — landing page with hero and entry navigation
- `layout.tsx` — root layout; global styles and font loading
- `questionario/page.tsx` — questionnaire flow entry point
- `extrair/page.tsx` — data extraction admin page (scraping triggers)

### API Routes (`src/app/api/`)
- `politicians/route.ts` — serves cached politician/deputy data
- `analyze-voting/route.ts` — computes affinity between user answers and deputy votes
- `dynamic-questions/route.ts` — generates questions from voting records via LLM
- `enumerate-deputies/route.ts` — lists deputies from the Congress API
- `scrape-congress/route.ts` — scrapes voting data from the Congress website
- `scrape-deputies/route.ts` — scrapes deputy metadata (name, party, state)
- `extract-deputy-photos/route.ts` — extracts and persists deputy photos
- `download-images/route.ts` — downloads remote images to local storage
- `chat-llm/route.ts` — LLM chat proxy; supports multiple providers
- `simplify-text/route.ts` — simplifies legislative bill text via LLM
- `env-check/route.ts` — validates required environment variables at startup

### Components (`src/components/`)
- `ConversationalQuizWrapper.tsx` — quiz state machine; routes between quiz and results views
- `ConversationalQuiz.tsx` — main question flow with conversational UI
- `QuestionnaireResults.tsx` — affinity score display after quiz completion
- `PoliticiansGrid.tsx` — grid of deputies sorted by affinity score
- `PoliticianCard.tsx` — individual deputy card (photo, party, affinity score)
- `PartyAffinity.tsx` — party-level affinity aggregation view
- `VotingAnalysisComponent.tsx` — detailed per-vote breakdown UI
- `DeputyVotingChart.tsx` — chart of deputy voting patterns
- `VotingQuestion.tsx` — single question with voting options display
- `LegislativeHouses.tsx` — Câmara/Senado navigation component
- `Header.tsx` — site header with navigation links
- `Hero.tsx` — landing page hero section
- `ChatLLM.tsx` — in-page LLM chat interface
- `BackgroundCarousel.tsx` — background image carousel
- `ProgressBar.tsx` — quiz progress indicator
- `SimpleQuiz.tsx` — lightweight quiz variant (no conversational wrapper)
- `ImageDownloader.tsx` — admin UI for batch image download
- `DeputyScraping.tsx` — admin UI for deputy scraping trigger
- `DeputyPhotoExtractor.tsx` — admin UI for photo extraction trigger

### Business Logic (`src/lib/`)
- `votingAnalyzer.ts` — core affinity scoring; user answers vs. deputy vote records
- `deputyAnalysis.ts` — deputy-level parsing, normalization, and analysis helpers
- `constants.ts` — API endpoints, scoring thresholds, app-wide constants
- `fallbackQuestions.ts` — hardcoded fallback questions when LLM generation fails

### Data (`src/data/`)
- `topDistinguishingProjects.ts` — curated high-signal legislative projects for the questionnaire

## Working Rules

- SPECS.md does not exist yet — add it when the data model and scoring algorithm stabilize.
- Scraping routes are fragile (Congress website structure changes); isolate parsing logic.
- No auth — all API routes are public; keep sensitive operations on the admin (`/extrair`) page.
- `verify:fast` = `next lint` (see code/VERIFY.md). `curly`, `max-lines-per-function`,
  `@typescript-eslint/no-explicit-any` are `warn` not `error` — the plugin registration
  needed for the last one was missing until it was wired in, which had silently let a real
  backlog accumulate (~15 files: components mostly over the 40-line limit, several
  `any` types). Pay it down incrementally, then promote each rule back to `error`.

<!-- routing:start -->
## Routing

| Subdirectory | Description |
|--------------|-------------|
| [`public/`](public/CONTEXT.md) | — |
| [`src/`](src/CONTEXT.md) | — |

| File | Interface | API | Description |
|------|-----------|-----|-------------|
| [`README.md`](README.md) | — | — | Vôti 🗳️ |
| [`download-images.js`](download-images.js) | [`download-images.d.ts`](download-images.d.ts) | `downloadImage`, `downloadAll` | ← add first-line comment |
| [`generate-top-projects.js`](generate-top-projects.js) | [`generate-top-projects.d.ts`](generate-top-projects.d.ts) | `loadTopProjects`, `hasTopProjectsData`, `getProjectById`, `getProjectsByCriteria`, `getTopProjectsStats` | ← add first-line comment |
| [`next.config.js`](next.config.js) | [`next.config.d.ts`](next.config.d.ts) | — | ← add first-line comment |
| [`next.config.ts`](next.config.ts) | [`next.config.d.ts`](next.config.d.ts) | — | ← add first-line comment |
| [`postcss.config.js`](postcss.config.js) | — | — | ← add first-line comment |
| [`tailwind.config.ts`](tailwind.config.ts) | [`tailwind.config.d.ts`](tailwind.config.d.ts) | — | ← add first-line comment |
<!-- routing:end -->
