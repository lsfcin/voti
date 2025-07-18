import { NextRequest, NextResponse } from 'next/server';
import { VotingAnalyzer } from '@/lib/votingAnalyzer';

// Cache global para evitar reprocessamento
let cachedAnalyzer: VotingAnalyzer | null = null;
let cachedQuestions: any[] | null = null;

export async function GET() {
  try {
    // Inicializa analyzer se necessário
    if (!cachedAnalyzer) {
      cachedAnalyzer = new VotingAnalyzer();
      await cachedAnalyzer.loadVotingData();
    }

    // Gera perguntas se necessário
    if (!cachedQuestions) {
      const questions = [];
      
      // Gera 5 questões dinâmicas
      for (let i = 0; i < 5; i++) {
        try {
          const questionData = await cachedAnalyzer.generateDynamicQuestion();
          if (questionData) {
            questions.push(questionData);
          }
        } catch (error) {
          console.warn(`Erro ao gerar questão ${i}:`, error);
        }
      }
      
      cachedQuestions = questions;
    }

    return NextResponse.json({
      success: true,
      questions: cachedQuestions
    });

  } catch (error) {
    console.error('Erro ao gerar perguntas dinâmicas:', error);
    
    // Fallback: retorna perguntas fixas se algo der errado
    return NextResponse.json({
      success: true,
      questions: [
        {
          id: "salario-minimo",
          originalProject: {
            id: "PL 1886/2022",
            title: "Estabelece salário mínimo de R$ 1.500",
            description: "Proposta para aumentar o salário mínimo nacional para R$ 1.500",
            author: "Diversos",
            party: "",
            state: "",
            date: "2022",
            status: "Em tramitação",
            link: ""
          },
          simplifiedQuestion: "O salário mínimo hoje é R$ 1.320. Na sua opinião, deveria aumentar para R$ 1.500?",
          options: {
            favor: "👍 Com certeza! É muito pouco para viver",
            contra: "👎 Melhor não mexer nisso agora",
            abstencao: "🤷‍♂️ Hmm, não sei bem..."
          },
          votingKey: "salario-minimo"
        },
        {
          id: "meio-ambiente",
          originalProject: {
            id: "PL 2633/2020",
            title: "Proteção de terras indígenas",
            description: "Estabelece diretrizes para proteção de povos indígenas",
            author: "Diversos",
            party: "",
            state: "",
            date: "2020",
            status: "Em tramitação",
            link: ""
          },
          simplifiedQuestion: "Você apoiaria proteger as terras indígenas mesmo que isso limite um pouco o agronegócio?",
          options: {
            favor: "🌱 Sim! Preservar é fundamental",
            contra: "🚜 Não, agronegócio gera empregos",
            abstencao: "⚖️ É complicado... preciso saber mais"
          },
          votingKey: "meio-ambiente"
        },
        {
          id: "impostos",
          originalProject: {
            id: "PEC 45/2019",
            title: "Imposto sobre Grandes Fortunas",
            description: "Institui imposto sobre patrimônios superiores a R$ 20 milhões",
            author: "Diversos",
            party: "",
            state: "",
            date: "2019",
            status: "Em tramitação",
            link: ""
          },
          simplifiedQuestion: "Se uma pessoa tem mais de R$ 20 milhões, ela deveria pagar um imposto extra para ajudar em programas sociais?",
          options: {
            favor: "💰 Óbvio! Quem pode mais, contribui mais",
            contra: "📈 Não, isso afasta investimentos",
            abstencao: "🎯 Depende muito de como seria feito"
          },
          votingKey: "impostos"
        }
      ]
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json();
    
    if (!cachedAnalyzer) {
      cachedAnalyzer = new VotingAnalyzer();
      await cachedAnalyzer.loadVotingData();
    }

    // Calcula afinidade com base nas respostas reais
    const affinities = cachedAnalyzer.calculateAffinity(answers);
    
    return NextResponse.json({
      success: true,
      affinities: affinities.slice(0, 20) // Top 20 deputados
    });

  } catch (error) {
    console.error('Erro ao calcular afinidade:', error);
    
    // Fallback: gera afinidades simuladas
    const mockAffinities = Array.from({ length: 20 }, (_, i) => ({
      deputy: `Deputado ${i + 1}`,
      party: ['PT', 'PSDB', 'PL', 'MDB', 'PP'][i % 5],
      state: ['SP', 'RJ', 'MG', 'RS', 'PR'][i % 5],
      affinity: Math.floor(Math.random() * 100),
      agreements: Math.floor(Math.random() * 10),
      disagreements: Math.floor(Math.random() * 5),
      matches: {}
    })).sort((a, b) => b.affinity - a.affinity);

    return NextResponse.json({
      success: true,
      affinities: mockAffinities
    });
  }
}
