import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  return NextResponse.json({
    hasApiKey: !!apiKey,
    keyConfigured: apiKey !== 'your_gemini_api_key_here',
    keyPreview: apiKey && apiKey !== 'your_gemini_api_key_here' ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}` : null,
    env: process.env.NODE_ENV
  });
}

export async function POST(request: NextRequest) {
  try {
    const { testMessage = "Olá, isso é um teste do Gemini" } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({ 
        success: false, 
        error: 'GEMINI_API_KEY não configurada ou ainda com valor padrão',
        instruction: 'Obtenha sua chave gratuita em: https://aistudio.google.com/',
        env: process.env.NODE_ENV
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: testMessage
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 100,
        }
      })
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        responseBody: responseText,
        keyPreview: `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}`,
        instruction: response.status === 403 ? 'Verifique se a chave da API está correta em: https://aistudio.google.com/' : undefined
      });
    }

    const data = JSON.parse(responseText);
    
    return NextResponse.json({
      success: true,
      status: response.status,
      response: data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta',
      fullData: data
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : null
    });
  }
}
