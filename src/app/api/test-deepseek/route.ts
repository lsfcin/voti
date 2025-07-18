import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  return NextResponse.json({
    hasApiKey: !!apiKey,
    keyPreview: apiKey ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}` : null,
    env: process.env.NODE_ENV
  });
}

export async function POST(request: NextRequest) {
  try {
    const { testMessage = "Olá, teste simples" } = await request.json();
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'DEEPSEEK_API_KEY não encontrada',
        env: process.env.NODE_ENV
      });
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: testMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      })
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        responseBody: responseText,
        keyPreview: `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}`
      });
    }

    const data = JSON.parse(responseText);
    
    return NextResponse.json({
      success: true,
      status: response.status,
      response: data.choices?.[0]?.message?.content || 'Sem resposta',
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
