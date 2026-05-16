// VotingAnalyzer: loads and indexes deputy voting data, ranks deputies by similarity to user profile
import * as fs from 'fs';
import * as path from 'path';

export type { VotingProject, AnalysisResult, ConcordanceMatrix, DeputyAffinity } from './votingTypes';
import type { VotingProject, AnalysisResult, ConcordanceMatrix } from './votingTypes';
import { parseCSV } from './votingAnalyzerParser';
import {
  getVoteCounts,
  calculateEntropy,
  calculateVariance,
  calculatePolarizationIndex,
} from './votingAnalyzerMetrics';

export class VotingAnalyzer {
  private projects: VotingProject[] = [];

  constructor() {
    this.loadVotingData();
  }

  private loadVotingData(): void {
    try {
      const filePath = path.join(
        process.cwd(),
        'public',
        'files',
        'politicians',
        'deputies',
        'votacoes deputados - 2022 a 2025.csv'
      );

      if (!fs.existsSync(filePath)) {
        console.error('Arquivo de votações não encontrado:', filePath);
        return;
      }

      const csvContent = fs.readFileSync(filePath, 'utf-8');
      this.projects = parseCSV(csvContent);
    } catch (error) {
      console.error('Erro ao carregar dados de votação:', error);
    }
  }

  public calculateEntropy(project: VotingProject): number {
    return calculateEntropy(project);
  }

  public calculateVariance(project: VotingProject): number {
    return calculateVariance(project);
  }

  public calculatePolarizationIndex(project: VotingProject): number {
    return calculatePolarizationIndex(project);
  }

  public analyzeProjects(count: number = 10): AnalysisResult[] {
    const results: AnalysisResult[] = [];

    for (const project of this.projects) {
      const entropy = calculateEntropy(project);
      const variance = calculateVariance(project);
      const polarizationIndex = calculatePolarizationIndex(project);
      const voteCounts = getVoteCounts(project);

      const discriminationScore =
        entropy * 0.4 + variance * 0.3 + polarizationIndex * 0.3;

      results.push({
        project,
        entropy,
        variance,
        polarizationIndex,
        discriminationScore,
        yesVotes: voteCounts.yes,
        noVotes: voteCounts.no,
        abstentions: voteCounts.abstention,
        absences: voteCounts.absence,
        totalVotes:
          voteCounts.yes +
          voteCounts.no +
          voteCounts.abstention +
          voteCounts.absence,
      });
    }

    return results
      .sort((a, b) => b.discriminationScore - a.discriminationScore)
      .slice(0, count);
  }

  public calculateConcordanceMatrix(projectIds?: string[]): ConcordanceMatrix {
    const matrix: ConcordanceMatrix = {};
    const projectsToAnalyze = projectIds
      ? this.projects.filter(p => projectIds.includes(p.id))
      : this.projects;

    const allDeputies = new Set<string>();
    projectsToAnalyze.forEach(project => {
      Object.keys(project.votes).forEach(deputy => allDeputies.add(deputy));
    });

    const deputyList = Array.from(allDeputies);

    deputyList.forEach(deputy1 => {
      matrix[deputy1] = {};
      deputyList.forEach(deputy2 => {
        matrix[deputy1][deputy2] = { concordance: 0, totalComparisons: 0 };
      });
    });

    projectsToAnalyze.forEach(project => {
      deputyList.forEach(deputy1 => {
        deputyList.forEach(deputy2 => {
          const vote1 = project.votes[deputy1];
          const vote2 = project.votes[deputy2];

          if (vote1 && vote2 && vote1 !== 'AUSENTE' && vote2 !== 'AUSENTE') {
            matrix[deputy1][deputy2].totalComparisons++;
            if (vote1 === vote2) {
              matrix[deputy1][deputy2].concordance++;
            }
          }
        });
      });
    });

    deputyList.forEach(deputy1 => {
      deputyList.forEach(deputy2 => {
        const data = matrix[deputy1][deputy2];
        if (data.totalComparisons > 0) {
          data.concordance = data.concordance / data.totalComparisons;
        }
      });
    });

    return matrix;
  }

  public getProjectsCount(): number {
    return this.projects.length;
  }

  public getAllProjects(): VotingProject[] {
    return [...this.projects];
  }
}
