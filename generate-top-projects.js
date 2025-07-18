const fs = require('fs');

// Lê os dados do JSON
const response = JSON.parse(fs.readFileSync('api-response.json', 'utf8'));
const topProjects = response.data.topProjects;

// Pega apenas os primeiros 20 projetos (já estão ordenados por discrimination score)
const top20 = topProjects.slice(0, 20);

// Gera o código TypeScript
const tsContent = `// Top 20 projetos que melhor distinguem os deputados
// Gerado automaticamente em 18/07/2025
// Baseado na análise de entropia, variância e polarização das votações

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

// Os 20 projetos que melhor distinguem as posições dos deputados
// Ordenados por discrimination score (combinação de entropia, variância e polarização)
export const topDistinguishingProjects: ProjectAnalysis[] = ${JSON.stringify(top20, null, 2)};

// Função para carregar os dados salvos
export function loadTopProjects(): ProjectAnalysis[] {
  return topDistinguishingProjects;
}

// Função para verificar se os dados estão disponíveis
export function hasTopProjectsData(): boolean {
  return topDistinguishingProjects.length > 0;
}

// Função para obter um projeto específico por ID
export function getProjectById(id: string): ProjectAnalysis | undefined {
  return topDistinguishingProjects.find(p => p.project.id === id);
}

// Função para obter os projetos ordenados por critério específico
export function getProjectsByCriteria(criteria: 'entropy' | 'variance' | 'polarizationIndex' | 'discriminationScore'): ProjectAnalysis[] {
  return [...topDistinguishingProjects].sort((a, b) => b[criteria] - a[criteria]);
}

// Função para obter estatísticas resumidas dos top projetos
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
}`;

// Salva o arquivo TypeScript
fs.writeFileSync('src/data/topDistinguishingProjects.ts', tsContent, 'utf8');

console.log('Arquivo topDistinguishingProjects.ts criado com sucesso!');
console.log(`Salvos ${top20.length} projetos principais`);

// Mostra um resumo dos projetos
console.log('\nTop 5 projetos por discrimination score:');
top20.slice(0, 5).forEach((project, index) => {
  console.log(`${index + 1}. ${project.project.title.substring(0, 80)}...`);
  console.log(`   Score: ${project.discriminationScore.toFixed(4)}, Entropy: ${project.entropy.toFixed(4)}`);
  console.log(`   Votos: ${project.yesVotes} Sim, ${project.noVotes} Não, ${project.abstentions} Abstenção, ${project.absences} Ausente\n`);
});

// Mostra estatísticas gerais
const stats = {
  count: top20.length,
  averageDiscriminationScore: top20.reduce((sum, p) => sum + p.discriminationScore, 0) / top20.length,
  averageEntropy: top20.reduce((sum, p) => sum + p.entropy, 0) / top20.length,
  averageVariance: top20.reduce((sum, p) => sum + p.variance, 0) / top20.length,
  averagePolarization: top20.reduce((sum, p) => sum + p.polarizationIndex, 0) / top20.length,
  maxScore: Math.max(...top20.map(p => p.discriminationScore)),
  minScore: Math.min(...top20.map(p => p.discriminationScore))
};

console.log('Estatísticas dos Top 20 Projetos:');
console.log(`- Média do Discrimination Score: ${stats.averageDiscriminationScore.toFixed(4)}`);
console.log(`- Média da Entropia: ${stats.averageEntropy.toFixed(4)}`);
console.log(`- Média da Variância: ${stats.averageVariance.toFixed(4)}`);
console.log(`- Média da Polarização: ${stats.averagePolarization.toFixed(4)}`);
console.log(`- Score Máximo: ${stats.maxScore.toFixed(4)}`);
console.log(`- Score Mínimo: ${stats.minScore.toFixed(4)}`);

console.log('\nArquivo salvo em: src/data/topDistinguishingProjects.ts');
console.log('Agora você pode usar estes dados diretamente sem precisar refazer a análise!');
