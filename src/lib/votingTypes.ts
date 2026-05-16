// Shared type definitions for the voting analyzer: project data, analysis results, concordance matrix
export interface VotingProject {
  id: string;
  title: string;
  date: string;
  votes: Record<string, string>; // deputyName -> vote (SIM/NAO/ABSTENCAO/AUSENTE)
}

export interface AnalysisResult {
  project: VotingProject;
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

export interface ConcordanceMatrix {
  [deputy1: string]: {
    [deputy2: string]: {
      concordance: number;
      totalComparisons: number;
    };
  };
}

export interface DeputyAffinity {
  deputy: string;
  party: string;
  state: string;
  affinity: number;
  agreements: number;
  disagreements: number;
  matches: Record<string, boolean>;
}
