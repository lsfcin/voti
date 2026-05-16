# lib
> ← add description

<!-- routing:start -->
## Routing

| File | Interface | API | Description |
|------|-----------|-----|-------------|
| [`constants.ts`](constants.ts) | [`constants.d.ts`](constants.d.ts) | `replaceVariables`, `APP_TEXTS` | Constantes de texto centralizadas para evitar duplicação |
| [`deputyAnalysis.ts`](deputyAnalysis.ts) | [`deputyAnalysis.d.ts`](deputyAnalysis.d.ts) | `analyzeDeputyVotingPatterns`, `getVotingStatsDescription` | Deputy voting pattern analysis: computes similarity scores between user answers and deputy votes |
| [`fallbackQuestions.ts`](fallbackQuestions.ts) | [`fallbackQuestions.d.ts`](fallbackQuestions.d.ts) | `fallbackQuestions`, `questionOptions` | Sistema de perguntas estáticas quando IA não está disponível |
| [`votingAnalyzer.ts`](votingAnalyzer.ts) | [`votingAnalyzer.d.ts`](votingAnalyzer.d.ts) | — | VotingAnalyzer: loads and indexes deputy voting data, ranks deputies by similarity to user profile |
| [`votingAnalyzerMetrics.ts`](votingAnalyzerMetrics.ts) | — | `getVoteCounts`, `calculateEntropy`, `calculateVariance`, `calculatePolarizationIndex` | votingAnalyzerMetrics: entropy, variance, polarization and vote-count calculations |
| [`votingAnalyzerParser.ts`](votingAnalyzerParser.ts) | — | `extractDateFromHeader`, `parseCSVLine`, `parseCSV` | votingAnalyzerParser: CSV parsing helpers for deputy voting data |
| [`votingTypes.ts`](votingTypes.ts) | — | — | Shared type definitions for the voting analyzer: project data, analysis results, concordance matrix |
<!-- routing:end -->
