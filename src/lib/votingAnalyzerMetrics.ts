// votingAnalyzerMetrics: entropy, variance, polarization and vote-count calculations
import type { VotingProject } from './votingTypes';

export function getVoteCounts(project: VotingProject) {
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
        counts.abstention++;
        break;
    }
  });

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

export function calculateEntropy(project: VotingProject): number {
  const voteCounts = getVoteCounts(project);
  const total = voteCounts.yes + voteCounts.no + voteCounts.abstention + voteCounts.absence;

  if (total === 0) return 0;

  const probabilities = [
    voteCounts.yes / total,
    voteCounts.no / total,
    voteCounts.abstention / total,
    voteCounts.absence / total
  ].filter(p => p > 0);

  return -probabilities.reduce((sum, p) => sum + p * Math.log2(p), 0);
}

export function calculateVariance(project: VotingProject): number {
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

  const mean = numericVotes.reduce((sum, v) => sum + v, 0) / numericVotes.length;
  return numericVotes.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / numericVotes.length;
}

export function calculatePolarizationIndex(project: VotingProject): number {
  const voteCounts = getVoteCounts(project);
  const total = voteCounts.yes + voteCounts.no;

  if (total === 0) return 0;

  const yesRatio = voteCounts.yes / total;
  const noRatio = voteCounts.no / total;

  return 1 - Math.abs(yesRatio - noRatio);
}
