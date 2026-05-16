// Typed loader for top-distinguishing-projects data; raw data lives in topDistinguishingProjects.json
import rawData from './topDistinguishingProjects.json';

export interface ProjectAnalysis {
  project: {
    id: string;
    title: string;
    date: string;
    votes: Record<string, string>;
  };
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

export const topDistinguishingProjects: ProjectAnalysis[] = rawData as ProjectAnalysis[];

export function loadTopProjects(): ProjectAnalysis[] {
  return topDistinguishingProjects;
}

export function hasTopProjectsData(): boolean {
  return topDistinguishingProjects.length > 0;
}

export function getProjectById(id: string): ProjectAnalysis | undefined {
  return topDistinguishingProjects.find(p => p.project.id === id);
}

export function getProjectsByCriteria(criteria: 'entropy' | 'variance' | 'polarizationIndex' | 'discriminationScore'): ProjectAnalysis[] {
  return [...topDistinguishingProjects].sort((a, b) => b[criteria] - a[criteria]);
}

export function getTopProjectsStats() {
  const scores = topDistinguishingProjects.map(p => p.discriminationScore);
  const entropies = topDistinguishingProjects.map(p => p.entropy);
  const variances = topDistinguishingProjects.map(p => p.variance);
  const polarizations = topDistinguishingProjects.map(p => p.polarizationIndex);
  return {
    count: topDistinguishingProjects.length,
    averageDiscriminationScore: scores.reduce((a, b) => a + b, 0) / scores.length,
    averageEntropy: entropies.reduce((a, b) => a + b, 0) / entropies.length,
    averageVariance: variances.reduce((a, b) => a + b, 0) / variances.length,
    averagePolarization: polarizations.reduce((a, b) => a + b, 0) / polarizations.length,
    maxScore: Math.max(...scores),
    minScore: Math.min(...scores),
    dateRange: {
      earliest: topDistinguishingProjects.map(p => p.project.date).sort()[0],
      latest: topDistinguishingProjects.map(p => p.project.date).sort().reverse()[0]
    }
  };
}
