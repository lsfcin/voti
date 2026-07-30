export declare const APP_TEXTS: {
    readonly MAIN_TITLE: "todo político é igual!";
    readonly MAIN_SUBTITLE: "será...?";
    readonly CHART_TITLE: "nem todo deputado vota igual";
    readonly MAIN_DESCRIPTION: "quem na prática tá na política pra te ajudando e agindo de acordo com os teus valores";
    readonly CHART_DESCRIPTION: "pra mostrar as diferenças analisamos os {projectsCount} projetos que melhor distinguem as posições políticas";
    readonly FEATURES: {
        readonly REAL_ACTIONS: {
            readonly title: "AÇÕES REAIS";
            readonly description: "o que os políticos fizeram de verdade que afeta sua vida todos os dias, ações práticas e votações que importam";
        };
        readonly WHO_HELPS: {
            readonly title: "BASEADO EM DADOS OFICIAIS";
            readonly description: "nossas análises são baseadas em dados oficiais e abertos do Congresso Nacional, inclusive, todo o nosso algoritmo é aberto e transparente";
        };
        readonly NO_NONSENSE: {
            readonly title: "SEM POLITIQUÊS";
            readonly description: "identificação através de perguntas diretas sobre questões que mexem com seu bolso e sua vida";
        };
    };
    readonly CTA: {
        readonly DISCOVER_AFFINITY: "descobrir quem vota comigo";
        readonly WANT_HELP: "quem me ajuda (ou atrapalha...)";
        readonly HOW_IT_WORKS: "como isso funciona?";
    };
    readonly BASED_ON_REAL_VOTES: "baseado em ações";
    readonly REAL_CONGRESS_VOTES: "dados de votações reais do Congresso Nacional";
    readonly CHART_LEGEND: {
        readonly IN_FAVOR: "A FAVOR";
        readonly AGAINST: "CONTRA";
    };
    readonly QUIZ: {
        readonly CHAT_TITLE: "💬 Chat com IA - Descubra sua Afinidade Política";
        readonly CHAT_DESCRIPTION: "Converse com nossa IA sobre questões políticas importantes do Brasil. {based}";
        readonly SIMPLIFIED_MESSAGE: "Chat conversacional temporariamente simplificado para resolver problemas de carregamento.";
        readonly FALLBACK_MESSAGE: "Use o questionário rápido acima para descobrir sua afinidade política.";
        readonly WELCOME_MESSAGE: "Olá! 👋 Eu sou sua assistente virtual para descobrir sua afinidade política. Vou fazer algumas perguntas sobre temas importantes do Brasil baseadas em {votes}. Pronto para começar?";
        readonly DEVELOPMENT_MESSAGE: "Perfeito! O questionário completo com IA ainda está sendo finalizado. Por enquanto, use o questionário rápido acima para descobrir sua afinidade com os deputados federais! 🗳️";
        readonly CHAT_HEADER: "Conversa com IA Política";
        readonly CHAT_SUBTITLE: "Baseado em dados reais do Congresso Nacional";
        readonly START_CONVERSATION: "Começar Conversa";
        readonly DEV_NOTICE: "Chat completo em desenvolvimento. Use o questionário rápido acima!";
    };
    readonly MAIN_PAGE: {
        readonly COMPLETE_QUIZ: "Complete o questionário na aba \"Conversação\" para descobrir quais políticos mais se alinham com suas opiniões {basedOn}.";
        readonly RESULTS_PLACEHOLDER: "Resultados aparecerão aqui";
        readonly RESULTS_DESCRIPTION: "Converse com nossa IA para descobrir sua afinidade com deputados e senadores";
        readonly START_CONVERSATION_BUTTON: "Iniciar Conversa";
    };
    readonly API_MESSAGES: {
        readonly VOTING_EXPLANATION: "🗳️ No Vôti, analisamos votações reais do Congresso para mostrar sua afinidade política com deputados e senadores. Que tal fazer nosso questionário para descobrir seus alinhamentos?";
        readonly POLITICIANS_INFO: "👥 Temos dados de todos os deputados federais e senadores em exercício. Posso ajudar você a entender suas posições e votações. Sobre qual político gostaria de saber mais?";
        readonly TRANSPARENCY: "🔍 A transparência é fundamental para a democracia! Coletamos dados públicos do Congresso para tornar as informações mais acessíveis aos cidadãos. Como posso ajudar você a entender melhor?";
        readonly HOW_IT_WORKS_DETAILED: "⚙️ O Vôti funciona assim: 1) Coletamos votações reais do Congresso, 2) Simplificamos com IA, 3) Você responde perguntas, 4) Mostramos sua afinidade com políticos. Simples e transparente!";
        readonly CONGRESS_INFO: "🏛️ O Congresso Nacional é formado pela Câmara dos Deputados (513 deputados) e Senado Federal (81 senadores). Eles votam leis que afetam diretamente sua vida. Quer saber sobre alguma votação específica?";
        readonly BILLS_PROCESS: "📜 Os projetos de lei passam por várias etapas: apresentação, comissões, votação e sanção. Cada etapa pode mudar sua vida! Quer entender como algum projeto específico foi votado?";
        readonly DEFAULT_GREETING: "🤖 Olá! Sou sua assistente de transparência política. Posso ajudar com informações sobre:\n\n• Votações do Congresso Nacional\n• Perfis de deputados e senadores\n• Como funciona o processo legislativo\n• Dados de transparência pública\n\nSobre o que gostaria de conversar?";
    };
    readonly METADATA: {
        readonly TITLE: "Vôti - Descubra sua afinidade política";
        readonly DESCRIPTION: "Aplicativo que mostra sua afinidade com deputados e senadores brasileiros baseado em votações reais do Congresso Nacional.";
        readonly KEYWORDS: "política, brasil, deputados, senadores, votações, congresso, democracia";
    };
    readonly LEGISLATIVE: {
        readonly SECTION_TITLE: "Onde suas leis são decididas 🏛️";
        readonly SECTION_SUBTITLE: "Conheça os locais onde os políticos votam as leis que mexem com sua vida";
        readonly CHAMBER_TITLE: "Câmara dos Deputados";
        readonly CHAMBER_SUBTITLE: "513 deputados representando todo o Brasil";
        readonly CHAMBER_DESCRIPTION: "Votam leis sobre economia, saúde, educação e decidem sobre impostos e gastos públicos.";
        readonly SENATE_TITLE: "Senado Federal";
        readonly SENATE_SUBTITLE: "81 senadores, 3 por estado";
        readonly SENATE_DESCRIPTION: "Revisam leis vindas da Câmara e aprovam indicações do presidente.";
        readonly WHY_MATTERS_TITLE: "Por que isso importa para você? 🤔";
        readonly MONEY_CARD: {
            readonly title: "Seu Dinheiro";
            readonly description: "Eles decidem impostos, salário mínimo, benefícios sociais e onde gastar o dinheiro público";
        };
        readonly RIGHTS_CARD: {
            readonly title: "Seus Direitos";
            readonly description: "Votam leis sobre saúde, educação, trabalho, aposentadoria e proteção do consumidor";
        };
        readonly FUTURE_CARD: {
            readonly title: "Seu Futuro";
            readonly description: "Definem políticas ambientais, tecnologia, segurança e desenvolvimento do país";
        };
    };
};
export declare function replaceVariables(text: string, variables: Record<string, string | number>): string;
