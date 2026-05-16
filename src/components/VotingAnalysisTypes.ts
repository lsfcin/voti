// VotingAnalysisTypes: local type definitions for the voting analysis UI
export interface VotingProjectLocal {
  id: string;
  title: string;
  date: string;
  votes: Record<string, string>;
}

export interface AnalysisResultLocal {
  project: VotingProjectLocal;
  entropy: number;
  variance: number;
  polarizationIndex: number;
  discriminationScore: number;
  yesVotes: number;
  noVotes: number;
  abstentions: number;
  absences: number;
  totalVotes: number;
}

export interface ApiResponse {
  topProjects: AnalysisResultLocal[];
  stats: {
    deputiesCount: number;
    projectsCount: number;
    sampleDeputies: string[];
    sampleProjects: string[];
  };
  summary: {
    totalProjects: number;
    analyzedProjects: number;
    averageDiscriminationScore: number;
    mostDiscriminatingProject: string;
    scoreDistribution: {
      high: number;
      medium: number;
      low: number;
    };
  };
}
