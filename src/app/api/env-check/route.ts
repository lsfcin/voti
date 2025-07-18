import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    GEMINI_API_KEY: {
      exists: !!process.env.GEMINI_API_KEY,
      configured: process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here',
      preview: process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' 
        ? `${process.env.GEMINI_API_KEY.substring(0, 6)}...${process.env.GEMINI_API_KEY.substring(process.env.GEMINI_API_KEY.length - 4)}`
        : null
    },
    DEEPSEEK_API_KEY: {
      exists: !!process.env.DEEPSEEK_API_KEY,
      preview: process.env.DEEPSEEK_API_KEY 
        ? `${process.env.DEEPSEEK_API_KEY.substring(0, 6)}...${process.env.DEEPSEEK_API_KEY.substring(process.env.DEEPSEEK_API_KEY.length - 4)}`
        : null
    },
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV
  };

  return NextResponse.json({
    environment: envVars,
    instructions: {
      gemini: "Reinicie o VS Code para carregar a variável GEMINI_API_KEY do sistema",
      geminiUrl: "https://aistudio.google.com/",
      status: envVars.GEMINI_API_KEY.configured ? "✅ Pronto para usar" : "⏳ Aguardando configuração"
    }
  });
}
