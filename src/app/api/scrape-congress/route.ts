import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function GET() {
  try {
    // Exemplo de scraping da Câmara dos Deputados
    const camaraUrl = 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao'
    const response = await axios.get(camaraUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    const $ = cheerio.load(response.data)
    
    // Exemplo de estrutura de dados coletados
    const propositions = [
      {
        id: 1,
        title: "PL 1234/2023 - Aumento do salário mínimo",
        description: "Projeto de lei que propõe o reajuste do salário mínimo...",
        status: "Em tramitação",
        votes: {
          "João Silva": "favor",
          "Maria Santos": "favor", 
          "Ana Costa": "contra"
        },
        date: "2023-10-15",
        category: "Economia"
      }
    ]

    return NextResponse.json({
      success: true,
      data: propositions,
      message: 'Dados coletados com sucesso'
    })

  } catch (error) {
    console.error('Erro ao coletar dados:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao coletar dados dos portais do congresso'
    }, { status: 500 })
  }
}
