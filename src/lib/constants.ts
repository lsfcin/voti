// Constantes de texto centralizadas para evitar duplicação
export const APP_TEXTS = {
  // Títulos principais
  MAIN_TITLE: "todo político é igual!",
  MAIN_SUBTITLE: "será...?",
  CHART_TITLE: "nem todo deputado vota igual",

  // Descrições principais
  MAIN_DESCRIPTION: "quem na prática tá na política pra te ajudando e agindo de acordo com os teus valores",
  CHART_DESCRIPTION: "pra mostrar as diferenças analisamos os {projectsCount} projetos que melhor distinguem as posições políticas",
  
  // Features/Cards
  FEATURES: {
    REAL_ACTIONS: {
      title: "AÇÕES REAIS",
      description: "o que os políticos fizeram de verdade que afeta sua vida todos os dias, ações práticas e votações que importam"
    },
    WHO_HELPS: {
      title: "BASEADO EM DADOS OFICIAIS",
      description: "nossas análises são baseadas em dados oficiais e abertos do Congresso Nacional, inclusive, todo o nosso algoritmo é aberto e transparente"
    },
    NO_NONSENSE: {
      title: "SEM POLITIQUÊS",
      description: "identificação através de perguntas diretas sobre questões que mexem com seu bolso e sua vida"
    }
  },
  
  // Call to Actions
  CTA: {
    DISCOVER_AFFINITY: "descobrir quem vota comigo",
    WANT_HELP: "quem me ajuda (ou atrapalha...)",
    HOW_IT_WORKS: "como isso funciona?"
  },
  
  // Descritivos técnicos
  BASED_ON_REAL_VOTES: "baseado em ações",
  REAL_CONGRESS_VOTES: "dados de votações reais do Congresso Nacional",
  
  // Legendas do gráfico
  CHART_LEGEND: {
    IN_FAVOR: "A FAVOR",
    AGAINST: "CONTRA"
  },
  
  // Textos do quiz conversacional
  QUIZ: {
    CHAT_TITLE: "💬 Chat com IA - Descubra sua Afinidade Política",
    CHAT_DESCRIPTION: "Converse com nossa IA sobre questões políticas importantes do Brasil. {based}",
    SIMPLIFIED_MESSAGE: "Chat conversacional temporariamente simplificado para resolver problemas de carregamento.",
    FALLBACK_MESSAGE: "Use o questionário rápido acima para descobrir sua afinidade política.",
    WELCOME_MESSAGE: "Olá! 👋 Eu sou sua assistente virtual para descobrir sua afinidade política. Vou fazer algumas perguntas sobre temas importantes do Brasil baseadas em {votes}. Pronto para começar?",
    DEVELOPMENT_MESSAGE: "Perfeito! O questionário completo com IA ainda está sendo finalizado. Por enquanto, use o questionário rápido acima para descobrir sua afinidade com os deputados federais! 🗳️",
    CHAT_HEADER: "Conversa com IA Política",
    CHAT_SUBTITLE: "Baseado em dados reais do Congresso Nacional",
    START_CONVERSATION: "Começar Conversa",
    DEV_NOTICE: "Chat completo em desenvolvimento. Use o questionário rápido acima!"
  },
  
  // Textos da página principal
  MAIN_PAGE: {
    COMPLETE_QUIZ: "Complete o questionário na aba \"Conversação\" para descobrir quais políticos mais se alinham com suas opiniões {basedOn}.",
    RESULTS_PLACEHOLDER: "Resultados aparecerão aqui",
    RESULTS_DESCRIPTION: "Converse com nossa IA para descobrir sua afinidade com deputados e senadores",
    START_CONVERSATION_BUTTON: "Iniciar Conversa"
  },
  
  // Mensagens da API/Chatbot
  API_MESSAGES: {
    VOTING_EXPLANATION: "🗳️ No Vôti, analisamos votações reais do Congresso para mostrar sua afinidade política com deputados e senadores. Que tal fazer nosso questionário para descobrir seus alinhamentos?",
    POLITICIANS_INFO: "👥 Temos dados de todos os deputados federais e senadores em exercício. Posso ajudar você a entender suas posições e votações. Sobre qual político gostaria de saber mais?",
    TRANSPARENCY: "🔍 A transparência é fundamental para a democracia! Coletamos dados públicos do Congresso para tornar as informações mais acessíveis aos cidadãos. Como posso ajudar você a entender melhor?",
    HOW_IT_WORKS_DETAILED: "⚙️ O Vôti funciona assim: 1) Coletamos votações reais do Congresso, 2) Simplificamos com IA, 3) Você responde perguntas, 4) Mostramos sua afinidade com políticos. Simples e transparente!",
    CONGRESS_INFO: "🏛️ O Congresso Nacional é formado pela Câmara dos Deputados (513 deputados) e Senado Federal (81 senadores). Eles votam leis que afetam diretamente sua vida. Quer saber sobre alguma votação específica?",
    BILLS_PROCESS: "📜 Os projetos de lei passam por várias etapas: apresentação, comissões, votação e sanção. Cada etapa pode mudar sua vida! Quer entender como algum projeto específico foi votado?",
    DEFAULT_GREETING: "🤖 Olá! Sou sua assistente de transparência política. Posso ajudar com informações sobre:\n\n• Votações do Congresso Nacional\n• Perfis de deputados e senadores\n• Como funciona o processo legislativo\n• Dados de transparência pública\n\nSobre o que gostaria de conversar?"
  },
  
  // Metadados da aplicação
  METADATA: {
    TITLE: "Vôti - Descubra sua afinidade política",
    DESCRIPTION: "Aplicativo que mostra sua afinidade com deputados e senadores brasileiros baseado em votações reais do Congresso Nacional.",
    KEYWORDS: "política, brasil, deputados, senadores, votações, congresso, democracia"
  },
  
  // Textos do componente de casas legislativas
  LEGISLATIVE: {
    SECTION_TITLE: "Onde suas leis são decididas 🏛️",
    SECTION_SUBTITLE: "Conheça os locais onde os políticos votam as leis que mexem com sua vida",
    CHAMBER_TITLE: "Câmara dos Deputados",
    CHAMBER_SUBTITLE: "513 deputados representando todo o Brasil",
    CHAMBER_DESCRIPTION: "Votam leis sobre economia, saúde, educação e decidem sobre impostos e gastos públicos.",
    SENATE_TITLE: "Senado Federal", 
    SENATE_SUBTITLE: "81 senadores, 3 por estado",
    SENATE_DESCRIPTION: "Revisam leis vindas da Câmara e aprovam indicações do presidente.",
    WHY_MATTERS_TITLE: "Por que isso importa para você? 🤔",
    MONEY_CARD: {
      title: "Seu Dinheiro",
      description: "Eles decidem impostos, salário mínimo, benefícios sociais e onde gastar o dinheiro público"
    },
    RIGHTS_CARD: {
      title: "Seus Direitos", 
      description: "Votam leis sobre saúde, educação, trabalho, aposentadoria e proteção do consumidor"
    },
    FUTURE_CARD: {
      title: "Seu Futuro",
      description: "Definem políticas ambientais, tecnologia, segurança e desenvolvimento do país"
    }
  }
} as const;

// Função helper para substituir variáveis em strings
export function replaceVariables(text: string, variables: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}
