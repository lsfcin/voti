# components
> ← add description

<!-- routing:start -->
## Routing

| File | Interface | API | Description |
|------|-----------|-----|-------------|
| [`BackgroundCarousel.tsx`](BackgroundCarousel.tsx) | [`BackgroundCarousel.d.ts`](BackgroundCarousel.d.ts) | `BackgroundCarousel` | BackgroundCarousel: auto-cycling image carousel used as page background |
| [`ChatLLM.tsx`](ChatLLM.tsx) | [`ChatLLM.d.ts`](ChatLLM.d.ts) | `ChatLLM` | ChatLLM: conversational chat interface that queries the LLM API for deputy alignment questions |
| [`ConversationalQuiz.tsx`](ConversationalQuiz.tsx) | [`ConversationalQuiz.d.ts`](ConversationalQuiz.d.ts) | `ConversationalQuiz` | ConversationalQuiz: step-by-step quiz presenting voting questions and collecting user stances |
| [`ConversationalQuizFixed.tsx`](ConversationalQuizFixed.tsx) | [`ConversationalQuizFixed.d.ts`](ConversationalQuizFixed.d.ts) | — | ConversationalQuizFixed: fixed-layout variant of the conversational quiz with scroll management |
| [`ConversationalQuizSimple.tsx`](ConversationalQuizSimple.tsx) | [`ConversationalQuizSimple.d.ts`](ConversationalQuizSimple.d.ts) | `ConversationalQuizSimple` | ConversationalQuizSimple: simplified single-page quiz variant without scroll behavior |
| [`ConversationalQuizWrapper.tsx`](ConversationalQuizWrapper.tsx) | [`ConversationalQuizWrapper.d.ts`](ConversationalQuizWrapper.d.ts) | `ConversationalQuizWrapper` | ConversationalQuizWrapper: dynamic-imports the quiz component to avoid SSR issues |
| [`DeputyPhotoExtractor.tsx`](DeputyPhotoExtractor.tsx) | [`DeputyPhotoExtractor.d.ts`](DeputyPhotoExtractor.d.ts) | `DeputyPhotoExtractor` | DeputyPhotoExtractor: admin UI for triggering and monitoring deputy photo extraction |
| [`DeputyPhotoGrid.tsx`](DeputyPhotoGrid.tsx) | — | `DeputyPhotoGrid` | DeputyPhotoGrid: displays a grid of deputy photos with fallback handling |
| [`DeputyScraping.tsx`](DeputyScraping.tsx) | [`DeputyScraping.d.ts`](DeputyScraping.d.ts) | `DeputyScraping` | DeputyScraping: admin UI for scraping deputy data from the Chamber of Deputies website |
| [`DeputyVotingChart.tsx`](DeputyVotingChart.tsx) | [`DeputyVotingChart.d.ts`](DeputyVotingChart.d.ts) | — | DeputyVotingChart: bar chart showing top deputies ranked by voting similarity to the user |
| [`DeputyVotingChart_new.tsx`](DeputyVotingChart_new.tsx) | [`DeputyVotingChart_new.d.ts`](DeputyVotingChart_new.d.ts) | — | DeputyVotingChart (v2): updated bar chart with expanded deputy ranking and tooltips |
| [`Header.tsx`](Header.tsx) | [`Header.d.ts`](Header.d.ts) | `Header` | Header: top navigation bar with logo and main nav links |
| [`Hero.tsx`](Hero.tsx) | [`Hero.d.ts`](Hero.d.ts) | `Hero` | Hero: landing section with headline, CTA button, and link to the voting quiz |
| [`ImageDownloadResults.tsx`](ImageDownloadResults.tsx) | — | `ImageDownloadResults` | ImageDownloadResults: displays download results and local image previews |
| [`ImageDownloader.tsx`](ImageDownloader.tsx) | [`ImageDownloader.d.ts`](ImageDownloader.d.ts) | `ImageDownloader` | ImageDownloader: admin UI for triggering bulk deputy image downloads and showing status |
| [`LegislativeHouses.tsx`](LegislativeHouses.tsx) | [`LegislativeHouses.d.ts`](LegislativeHouses.d.ts) | `LegislativeHouses` | LegislativeHouses: info section explaining the Chamber of Deputies and Federal Senate |
| [`PartyAffinity.tsx`](PartyAffinity.tsx) | [`PartyAffinity.d.ts`](PartyAffinity.d.ts) | `PartyAffinity` | PartyAffinity: displays a list of political parties ranked by affinity score |
| [`PoliticianCard.tsx`](PoliticianCard.tsx) | [`PoliticianCard.d.ts`](PoliticianCard.d.ts) | `PoliticianCard` | PoliticianCard: card UI for a single deputy with photo, name, party, and affinity score |
| [`PoliticiansGrid.tsx`](PoliticiansGrid.tsx) | [`PoliticiansGrid.d.ts`](PoliticiansGrid.d.ts) | `PoliticiansGrid` | PoliticiansGrid: filterable grid of politician cards ranked by voting affinity |
| [`PoliticiansGridModal.tsx`](PoliticiansGridModal.tsx) | — | `PoliticiansGridModal` | PoliticiansGridModal: detail modal for a selected deputy |
| [`PoliticiansGridUtils.ts`](PoliticiansGridUtils.ts) | — | `getAffinityColor`, `getAffinityLabel`, `formatDeputyName` | PoliticiansGridUtils: shared formatting helpers for the politicians grid |
| [`ProgressBar.tsx`](ProgressBar.tsx) | [`ProgressBar.d.ts`](ProgressBar.d.ts) | `ProgressBar` | ProgressBar: visual progress indicator for multi-step quiz flow |
| [`QuestionnaireResults.tsx`](QuestionnaireResults.tsx) | [`QuestionnaireResults.d.ts`](QuestionnaireResults.d.ts) | `QuestionnaireResults` | QuestionnaireResults: displays final affinity rankings after quiz completion |
| [`SimpleQuiz.tsx`](SimpleQuiz.tsx) | [`SimpleQuiz.d.ts`](SimpleQuiz.d.ts) | `SimpleQuiz` | SimpleQuiz: minimal quiz variant that shows politicians grid immediately after answers |
| [`SimpleQuizQuestion.tsx`](SimpleQuizQuestion.tsx) | — | `SimpleQuizQuestion` | SimpleQuizQuestion: single-question view with answer buttons and navigation |
| [`SimpleQuizResults.tsx`](SimpleQuizResults.tsx) | — | `SimpleQuizResults` | SimpleQuizResults: results screen shown after the quiz is completed |
| [`VotingAnalysisComponent.tsx`](VotingAnalysisComponent.tsx) | [`VotingAnalysisComponent.d.ts`](VotingAnalysisComponent.d.ts) | — | VotingAnalysisComponent: full voting analysis UI with project list and similarity scores |
| [`VotingAnalysisTypes.ts`](VotingAnalysisTypes.ts) | — | — | VotingAnalysisTypes: local type definitions for the voting analysis UI |
| [`VotingProjectCard.tsx`](VotingProjectCard.tsx) | — | `VotingProjectCard` | VotingProjectCard: displays metrics and vote distribution for a single voting project |
| [`VotingQuestion.tsx`](VotingQuestion.tsx) | [`VotingQuestion.d.ts`](VotingQuestion.d.ts) | `VotingQuestion` | VotingQuestion: single question card with expandable bill summary and stance buttons |
<!-- routing:end -->
