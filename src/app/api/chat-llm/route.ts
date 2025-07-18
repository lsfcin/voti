import { NextRequest, NextResponse } from 'next/server'

interface ChatRequest {
  message: string
}

interface ChatResponse {
  response?: string
  error?: string
}

async function callLLMChat(message: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('API Gemini não configurada');
  }

  const systemPrompt = `Você é uma assistente especializada em transparência política brasileira. 
Responda de forma clara, educativa e imparcial sobre temas políticos, congressistas, votações e transparência.
Mantenha respostas concisas (máximo 200 palavras) e use linguagem acessível.
Foque sempre na transparência democrática e educação cívica.`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUsuário: ${message}\n\nAssistente:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro Gemini API:', response.status, errorText);
      
      // Tratamento específico para diferentes tipos de erro
      if (response.status === 403) {
        throw new Error('Chave da API Gemini inválida ou sem permissão');
      }
      if (response.status === 429) {
        throw new Error('Limite de requisições excedido na API Gemini');
      }
      
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text.trim()
    }
    
    throw new Error('Resposta inválida da API Gemini')
  } catch (error) {
    console.error('Erro ao chamar LLM:', error)
    throw error
  }
}

function getFallbackResponse(message: string, error?: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Resposta específica para diferentes tipos de erro da API
  if (error?.includes('não configurada')) {
    return `� Para ativar respostas inteligentes, configure sua chave da API do Google Gemini (gratuita).\n\nEnquanto isso, posso ajudar com informações sobre o Vôti!\n\n${getBasicFallbackResponse(message)}`
  }
  
  if (error?.includes('inválida') || error?.includes('sem permissão')) {
    return `🔑 A chave da API Gemini precisa ser atualizada. Verifique se está correta em: https://aistudio.google.com/\n\n${getBasicFallbackResponse(message)}`
  }
  
  if (error?.includes('Limite de requisições')) {
    return `⏳ Muitas solicitações ao Gemini. Aguarde um momento e tente novamente.\n\n${getBasicFallbackResponse(message)}`
  }
  
  return getBasicFallbackResponse(message);
}

function getBasicFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('voto') || lowerMessage.includes('votação')) {
    return '🗳️ No Vôti, analisamos votações reais do Congresso para mostrar sua afinidade política com deputados e senadores. Que tal fazer nosso questionário para descobrir seus alinhamentos?'
  }
  
  if (lowerMessage.includes('deputado') || lowerMessage.includes('senador')) {
    return '👥 Temos dados de todos os deputados federais e senadores em exercício. Posso ajudar você a entender suas posições e votações. Sobre qual político gostaria de saber mais?'
  }
  
  if (lowerMessage.includes('transparência')) {
    return '🔍 A transparência é fundamental para a democracia! Coletamos dados públicos do Congresso para tornar as informações mais acessíveis aos cidadãos. Como posso ajudar você a entender melhor?'
  }
  
  if (lowerMessage.includes('como funciona')) {
    return '⚙️ O Vôti funciona assim: 1) Coletamos votações reais do Congresso, 2) Simplificamos com IA, 3) Você responde perguntas, 4) Mostramos sua afinidade com políticos. Simples e transparente!'
  }

  if (lowerMessage.includes('congresso') || lowerMessage.includes('câmara') || lowerMessage.includes('senado')) {
    return '🏛️ O Congresso Nacional é formado pela Câmara dos Deputados (513 deputados) e Senado Federal (81 senadores). Eles votam leis que afetam diretamente sua vida. Quer saber sobre alguma votação específica?'
  }

  if (lowerMessage.includes('projeto') || lowerMessage.includes('lei')) {
    return '📜 Os projetos de lei passam por várias etapas: apresentação, comissões, votação e sanção. Cada etapa pode mudar sua vida! Quer entender como algum projeto específico foi votado?'
  }
  
  return `🤖 Olá! Sou sua assistente de transparência política. Posso ajudar com informações sobre:
  
• Votações do Congresso Nacional
• Perfis de deputados e senadores  
• Como funciona o processo legislativo
• Dados de transparência pública

Sobre o que gostaria de conversar?`
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    
    if (!body.message || typeof body.message !== 'string' || !body.message.trim()) {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' } as ChatResponse,
        { status: 400 }
      )
    }

    let response: string
    try {
      response = await callLLMChat(body.message.trim())
    } catch (error) {
      console.error('Erro ao chamar LLM externa, usando fallback:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      response = getFallbackResponse(body.message.trim(), errorMessage)
    }
    
    return NextResponse.json({ response } as ChatResponse)
  } catch (error) {
    console.error('Erro no endpoint chat-llm:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' } as ChatResponse,
      { status: 500 }
    )
  }
}
