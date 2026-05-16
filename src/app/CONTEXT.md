# app
> ← add description

<!-- routing:start -->
## Routing

| Subdirectory | Description |
|--------------|-------------|
| [`api/`](api/CONTEXT.md) | — |

| File | Interface | API | Description |
|------|-----------|-----|-------------|
| [`globals.css`](globals.css) | — | — | ← add first-line comment |
| [`layout.tsx`](layout.tsx) | [`layout.d.ts`](layout.d.ts) | `RootLayout`, `metadata` | Root layout: global metadata, fonts, and shared HTML shell for the Voti app |
| [`page.tsx`](page.tsx) | [`page.d.ts`](page.d.ts) | `Home` | Home page: entry point with chat LLM, voting analysis, and deputy chart sections |
| [`extrair/page.tsx`](extrair/page.tsx) | [`extrair/page.d.ts`](extrair/page.d.ts) | `ExtractPage` | Data extraction admin page: deputy scraping and photo extraction tools |
| [`questionario/page.tsx`](questionario/page.tsx) | [`questionario/page.d.ts`](questionario/page.d.ts) | `Questionario` | Questionnaire page: multi-step voting quiz that computes alignment with deputies |
<!-- routing:end -->
