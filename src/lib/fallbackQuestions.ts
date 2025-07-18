// Sistema de perguntas estáticas quando IA não está disponível
export const fallbackQuestions = [
  {
    id: 'projeto_1',
    question: 'Marco Temporal das Terras Indígenas',
    description: 'Você concorda com a aprovação de lei que estabelece que terras indígenas só podem ser demarcadas se havia ocupação comprovada até a data da Constituição de 1988?',
    votingKey: 'PL490/2007'
  },
  {
    id: 'projeto_2', 
    question: 'Licenciamento Ambiental Simplificado',
    description: 'Você é favorável à simplificação do processo de licenciamento ambiental para acelerar obras de infraestrutura?',
    votingKey: 'PL3729/2004'
  },
  {
    id: 'projeto_3',
    question: 'Lei do Veneno (Agrotóxicos)',
    description: 'Você apoia a flexibilização das regras para registro e uso de agrotóxicos no Brasil?', 
    votingKey: 'PL6299/2002'
  },
  {
    id: 'projeto_4',
    question: 'Escola sem Partido',
    description: 'Você concorda com lei que proíbe discussões político-ideológicas nas escolas?',
    votingKey: 'PL867/2015'
  },
  {
    id: 'projeto_5',
    question: 'Novo Ensino Médio',
    description: 'Você apoia a reforma que permite escolher áreas específicas de estudo no ensino médio?',
    votingKey: 'MP746/2016'
  }
];

export const questionOptions = {
  favor: 'Você concordaria com essa proposta se fosse lei',
  contra: 'Você discordaria dessa proposta se fosse lei', 
  abstencao: 'Você não tem opinião formada sobre esse tema'
};
