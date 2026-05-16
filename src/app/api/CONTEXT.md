# api
> ← add description

<!-- routing:start -->
## Routing

| File | Interface | API | Description |
|------|-----------|-----|-------------|
| [`analyze-voting/route.ts`](analyze-voting/route.ts) | [`analyze-voting/route.d.ts`](analyze-voting/route.d.ts) | `GET`, `POST` | Next.js API route: analyzes deputy voting data and computes similarity to user answers |
| [`chat-llm/route.ts`](chat-llm/route.ts) | [`chat-llm/route.d.ts`](chat-llm/route.d.ts) | `POST`, `callLLMChat`, `getFallbackResponse`, `getBasicFallbackResponse` | Next.js API route: proxies chat messages to Gemini LLM for conversational questionnaire |
| [`download-images/route.ts`](download-images/route.ts) | [`download-images/route.d.ts`](download-images/route.d.ts) | `POST`, `GET` | Next.js API route: downloads and saves deputy profile images to the local filesystem |
| [`dynamic-questions/route.ts`](dynamic-questions/route.ts) | [`dynamic-questions/route.d.ts`](dynamic-questions/route.d.ts) | `GET`, `POST` | Next.js API route: generates dynamic voting questions from pre-analyzed deputy data |
| [`enumerate-deputies/route.ts`](enumerate-deputies/route.ts) | [`enumerate-deputies/route.d.ts`](enumerate-deputies/route.d.ts) | `GET`, `POST`, `extrairDeputados`, `gerarArquivoEnumerado` | Next.js API route: enumerates deputy IDs and metadata from the local data files |
| [`env-check/route.ts`](env-check/route.ts) | [`env-check/route.d.ts`](env-check/route.d.ts) | `GET` | Next.js API route: checks required environment variables and returns their status |
| [`extract-deputy-photos/route.ts`](extract-deputy-photos/route.ts) | [`extract-deputy-photos/route.d.ts`](extract-deputy-photos/route.d.ts) | `POST`, `GET` | Next.js API route: extracts and saves deputy photos from the Chamber of Deputies website |
| [`politicians/route.ts`](politicians/route.ts) | [`politicians/route.d.ts`](politicians/route.d.ts) | `GET`, `carregarDeputados`, `determinarCargo` | Next.js API route: serves the list of politicians from local JSON data files |
| [`scrape-congress/route.ts`](scrape-congress/route.ts) | [`scrape-congress/route.d.ts`](scrape-congress/route.d.ts) | `GET` | Next.js API route: scrapes congress metadata from the Brazilian Congress website |
| [`scrape-deputies/route.ts`](scrape-deputies/route.ts) | [`scrape-deputies/route.d.ts`](scrape-deputies/route.d.ts) | `GET`, `POST` | Next.js API route: scrapes deputy data from the Chamber of Deputies website |
| [`simplify-text/route.ts`](simplify-text/route.ts) | [`simplify-text/route.d.ts`](simplify-text/route.d.ts) | `POST` | Next.js API route: simplifies bill text via HuggingFace inference API |
| [`test-deepseek/route.ts`](test-deepseek/route.ts) | [`test-deepseek/route.d.ts`](test-deepseek/route.d.ts) | `GET`, `POST` | Next.js API route: tests DeepSeek API connectivity and key validity |
| [`test-gemini/route.ts`](test-gemini/route.ts) | [`test-gemini/route.d.ts`](test-gemini/route.d.ts) | `GET`, `POST` | Next.js API route: tests Gemini API connectivity and key validity |
<!-- routing:end -->
