import { NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function POST(request: Request) {
  try {
    const { originalText, title } = await request.json()

    if (!originalText || !title) {
      return NextResponse.json({
        success: false,
        message: 'Texto original e título são obrigatórios'
      }, { status: 400 })
    }

    // Prompt para simplificar o texto da votação
    const prompt = `
Você é um educador que explica política para crianças de 10 anos. Transforme esta proposta de lei em uma pergunta super simples que qualquer pessoa possa entender:

Título: ${title}
Texto original: ${originalText}

REGRAS IMPORTANTES:
1. Use palavras do dia a dia, nada técnico
2. Explique como isso afeta a vida das pessoas
3. Fale como se fosse uma conversa com um amigo
4. Comece sempre com "Você acha que..." ou "Na sua opinião..."
5. Dê contexto prático: "isso ajudaria você", "mexeria no seu bolso", etc.

Exemplo de transformação:
❌ "Você concorda com o marco temporal para demarcação de terras indígenas?"
✅ "Você acha que os indígenas devem poder proteger legalmente as florestas onde eles já moram há muito tempo?"

Agora transforme o texto acima seguindo essas regras:

Pergunta simplificada:`

    // Usando um modelo gratuito do Hugging Face
    const result = await hf.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        do_sample: true,
      }
    })

    const simplifiedQuestion = result.generated_text
      ?.replace(prompt, '')
      ?.trim()
      ?.split('\n')[0] || 'Pergunta não pôde ser gerada'

    return NextResponse.json({
      success: true,
      data: {
        originalText,
        simplifiedQuestion,
        title
      }
    })

  } catch (error) {
    console.error('Erro ao processar com IA:', error)
    
    // Fallback: simplificação básica sem IA
    const { originalText, title } = await request.json()
    const fallbackQuestion = `Na sua opinião, você apoiaria a proposta: ${title}? (Isso poderia afetar sua vida no dia a dia)`

    return NextResponse.json({
      success: true,
      data: {
        originalText,
        simplifiedQuestion: fallbackQuestion,
        title
      },
      message: 'Usando simplificação básica (IA indisponível)'
    })
  }
}
