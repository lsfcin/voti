import * as fs from 'fs';
import * as path from 'path';

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

export class VotingAnalyzer {
  private projects: VotingProject[] = [];
  
  constructor() {
    this.loadVotingData();
  }

  private loadVotingData(): void {
    try {
      const filePath = path.join(process.cwd(), 'public', 'files', 'politicians', 'deputies', 'votacoes deputados - 2022 a 2025.csv');
      
      if (!fs.existsSync(filePath)) {
        console.error('Arquivo de votações não encontrado:', filePath);
        return;
      }

      const csvContent = fs.readFileSync(filePath, 'utf-8');
      this.parseCSV(csvContent);
    } catch (error) {
      console.error('Erro ao carregar dados de votação:', error);
    }
  }

  private parseCSV(csvContent: string): void {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length < 2) return;

    // Primeira linha: cabeçalhos (primeira coluna é "Parlamentar", o resto são as votações)
    const headers = this.parseCSVLine(lines[0]);
    const votingHeaders = headers.slice(2); // Remove "Parlamentar" e "Votação" vazia

    // Cada projeto de votação será extraído dos cabeçalhos
    votingHeaders.forEach((header, index) => {
      if (!header || header.trim() === '') return;

      const project: VotingProject = {
        id: `projeto-${index + 1}`,
        title: header.trim(),
        date: this.extractDateFromHeader(header),
        votes: {}
      };

      // Para cada deputado (linhas 2 em diante), pegar o voto para esta votação
      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCSVLine(lines[i]);
        if (values.length < 3) continue;

        const deputyName = values[0]?.trim();
        const vote = values[index + 2]?.trim(); // +2 porque pulamos "Parlamentar" e "Votação" vazia

        if (deputyName && vote && vote !== '-') {
          project.votes[deputyName] = vote.toUpperCase();
        }
      }

      // Só adiciona projetos que tenham pelo menos alguns votos
      if (Object.keys(project.votes).length > 0) {
        this.projects.push(project);
      }
    });

    console.log(`Carregados ${this.projects.length} projetos de votação`);
  }

  private extractDateFromHeader(header: string): string {
    // Tenta extrair data do formato "DD/MM/YYYY HH:MM:SS - ..."
    const dateMatch = header.match(/(\d{2}\/\d{2}\/\d{4})/);
    return dateMatch ? dateMatch[1] : 'Data não disponível';
  }

  private parseCSVLine(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    values.push(current.trim());
    return values;
  }

  public calculateEntropy(project: VotingProject): number {
    const voteCounts = this.getVoteCounts(project);
    const total = voteCounts.yes + voteCounts.no + voteCounts.abstention + voteCounts.absence;
    
    if (total === 0) return 0;

    const probabilities = [
      voteCounts.yes / total,
      voteCounts.no / total,
      voteCounts.abstention / total,
      voteCounts.absence / total
    ].filter(p => p > 0);

    return -probabilities.reduce((sum, p) => sum + (p * Math.log2(p)), 0);
  }

  public calculateVariance(project: VotingProject): number {
    const votes = Object.values(project.votes);
    const numericVotes: number[] = votes.map(vote => {
      switch (vote) {
        case 'SIM': return 1;
        case 'NAO': return 0;
        case 'ABSTENCAO': return 0.5;
        case 'AUSENTE': return 0.25;
        default: return 0;
      }
    });

    if (numericVotes.length === 0) return 0;

    const mean = numericVotes.reduce((sum: number, vote: number) => sum + vote, 0) / numericVotes.length;
    const variance = numericVotes.reduce((sum: number, vote: number) => sum + Math.pow(vote - mean, 2), 0) / numericVotes.length;

    return variance;
  }

  public calculatePolarizationIndex(project: VotingProject): number {
    const voteCounts = this.getVoteCounts(project);
    const total = voteCounts.yes + voteCounts.no;
    
    if (total === 0) return 0;

    const yesRatio = voteCounts.yes / total;
    const noRatio = voteCounts.no / total;
    
    // Índice de polarização: quanto mais próximo de 0.5/0.5, maior a polarização
    return 1 - Math.abs(yesRatio - noRatio);
  }

  private getVoteCounts(project: VotingProject) {
    const counts = { yes: 0, no: 0, abstention: 0, absence: 0 };
    const voteValues = Object.values(project.votes);
    
    voteValues.forEach(vote => {
      const normalizedVote = vote.trim();
      
      switch (normalizedVote) {
        case 'SIM': 
        case 'Sim': 
          counts.yes++; 
          break;
        case 'NAO': 
        case 'NÃO':
        case 'Não': 
          counts.no++; 
          break;
        case 'ABSTENCAO': 
        case 'Abstenção':
          counts.abstention++; 
          break;
        case 'AUSENTE': 
        case 'Não votou':
          counts.absence++; 
          break;
        case 'OBSTRUCAO':
        case 'Obstrução':
          counts.abstention++; // Tratamos obstrução como abstenção
          break;
      }
    });

    // Debug log para o primeiro projeto
    if (project.id === 'projeto-1') {
      const uniqueVotes = [...new Set(voteValues)];
      console.log('=== DEBUG PRIMEIRO PROJETO ===');
      console.log('Título:', project.title);
      console.log('Votos únicos:', uniqueVotes);
      console.log('Contagem:', counts);
      console.log('Total de votos:', voteValues.length);
    }

    return counts;
  }

  public analyzeProjects(count: number = 10): AnalysisResult[] {
    const results: AnalysisResult[] = [];

    for (const project of this.projects) {
      const entropy = this.calculateEntropy(project);
      const variance = this.calculateVariance(project);
      const polarizationIndex = this.calculatePolarizationIndex(project);
      const voteCounts = this.getVoteCounts(project);
      
      // Score de discriminação: combina entropia, variância e polarização
      const discriminationScore = (entropy * 0.4) + (variance * 0.3) + (polarizationIndex * 0.3);

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
        totalVotes: voteCounts.yes + voteCounts.no + voteCounts.abstention + voteCounts.absence
      });
    }

    // Ordenar por score de discriminação (maior para menor)
    return results
      .sort((a, b) => b.discriminationScore - a.discriminationScore)
      .slice(0, count);
  }

  public calculateConcordanceMatrix(projectIds?: string[]): ConcordanceMatrix {
    const matrix: ConcordanceMatrix = {};
    const projectsToAnalyze = projectIds 
      ? this.projects.filter(p => projectIds.includes(p.id))
      : this.projects;

    // Obter lista de todos os deputados
    const allDeputies = new Set<string>();
    projectsToAnalyze.forEach(project => {
      Object.keys(project.votes).forEach(deputy => allDeputies.add(deputy));
    });

    const deputyList = Array.from(allDeputies);

    // Inicializar matriz
    deputyList.forEach(deputy1 => {
      matrix[deputy1] = {};
      deputyList.forEach(deputy2 => {
        matrix[deputy1][deputy2] = { concordance: 0, totalComparisons: 0 };
      });
    });

    // Calcular concordâncias
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

    // Calcular percentuais de concordância
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
