import { topDistinguishingProjects } from '@/data/topDistinguishingProjects';

export interface DeputyVotingPattern {
  name: string;
  sim: number;
  nao: number;
  abstencao: number;
  ausente: number;
  total: number;
  percentualSim: number;
}

export function analyzeDeputyVotingPatterns(): DeputyVotingPattern[] {
  const deputyStats: Record<string, { sim: number; nao: number; abstencao: number; ausente: number }> = {};

  // Processar cada projeto
  topDistinguishingProjects.forEach(project => {
    Object.entries(project.project.votes).forEach(([deputyName, vote]) => {
      if (!deputyStats[deputyName]) {
        deputyStats[deputyName] = { sim: 0, nao: 0, abstencao: 0, ausente: 0 };
      }

      const normalizedVote = vote.toUpperCase().trim();
      
      if (normalizedVote === 'SIM') {
        deputyStats[deputyName].sim++;
      } else if (normalizedVote === 'NÃO') {
        deputyStats[deputyName].nao++;
      } else if (normalizedVote.includes('ABSTENÇ') || normalizedVote === 'ABSTENÇÃO') {
        deputyStats[deputyName].abstencao++;
      } else {
        // Qualquer outro voto (NÃO VOTOU, AUSENTE, ART. 17, etc.)
        deputyStats[deputyName].ausente++;
      }
    });
  });

  // Converter para array e calcular estatísticas
  const patterns: DeputyVotingPattern[] = Object.entries(deputyStats).map(([name, stats]) => {
    const total = stats.sim + stats.nao + stats.abstencao + stats.ausente;
    const percentualSim = total > 0 ? (stats.sim / total) * 100 : 0;
    
    return {
      name,
      sim: stats.sim,
      nao: stats.nao,
      abstencao: stats.abstencao,
      ausente: stats.ausente,
      total,
      percentualSim
    };
  });

  // Filtrar deputados que votaram em pelo menos metade dos projetos
  const minVotes = Math.floor(topDistinguishingProjects.length / 2);
  const activeDeputies = patterns.filter(deputy => 
    (deputy.sim + deputy.nao) >= minVotes
  );

  // Ordenar por percentual de votos SIM para criar a transição visual
  return activeDeputies.sort((a, b) => a.percentualSim - b.percentualSim);
}

export function getVotingStatsDescription() {
  const patterns = analyzeDeputyVotingPatterns();
  const totalProjects = topDistinguishingProjects.length;
  
  return {
    totalProjects,
    totalDeputies: patterns.length,
    mostConservative: patterns[0],
    mostProgressive: patterns[patterns.length - 1],
    averageYesPercentage: patterns.reduce((sum, p) => sum + p.percentualSim, 0) / patterns.length
  };
}
