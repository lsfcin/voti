import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface Deputy {
  id: string;
  name: string;
  party: string;
  state: string;
  photoUrl: string;
}

export async function GET(request: NextRequest) {
  try {
    console.log('Iniciando scraping dos deputados...');
    
    // Fazer requisição para a página de deputados
    const response = await fetch('https://www.camara.leg.br/deputados/quem-sao', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao acessar página: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const deputies: Deputy[] = [];
    
    // Buscar por cards ou elementos que contenham informações dos deputados
    $('.deputy-card, .deputado-card, .card-deputado, .parlamentar').each((index, element) => {
      const $element = $(element);
      
      // Tentar extrair nome
      const name = $element.find('.nome, .name, h3, h4, .titulo').first().text().trim() ||
                   $element.find('a').attr('title') ||
                   $element.find('img').attr('alt');
      
      // Tentar extrair foto
      const photoUrl = $element.find('img').attr('src') ||
                       $element.find('img').attr('data-src') ||
                       $element.find('.foto img').attr('src');
      
      // Tentar extrair partido
      const party = $element.find('.partido, .party, .sigla').text().trim();
      
      // Tentar extrair estado
      const state = $element.find('.estado, .uf, .state').text().trim();
      
      // Tentar extrair ID do deputado do link
      const link = $element.find('a').attr('href');
      const idMatch = link?.match(/\/(\d+)/);
      const id = idMatch ? idMatch[1] : `dep_${index}`;
      
      if (name && photoUrl) {
        deputies.push({
          id,
          name,
          party: party || 'N/I',
          state: state || 'N/I',
          photoUrl: photoUrl.startsWith('http') ? photoUrl : `https://www.camara.leg.br${photoUrl}`
        });
      }
    });

    // Se não encontrou com os seletores acima, tentar uma abordagem mais genérica
    if (deputies.length === 0) {
      $('img').each((index, element) => {
        const $img = $(element);
        const src = $img.attr('src') || $img.attr('data-src');
        const alt = $img.attr('alt');
        
        // Verificar se a imagem parece ser de um deputado
        if (src && alt && (
          alt.toLowerCase().includes('deputado') ||
          alt.toLowerCase().includes('deputada') ||
          src.includes('foto') ||
          src.includes('deputado')
        )) {
          const $parent = $img.closest('div, article, section');
          const name = alt.replace(/deputado|deputada/gi, '').trim();
          
          if (name.length > 3) {
            deputies.push({
              id: `dep_${index}`,
              name,
              party: 'N/I',
              state: 'N/I',
              photoUrl: src.startsWith('http') ? src : `https://www.camara.leg.br${src}`
            });
          }
        }
      });
    }

    console.log(`Encontrados ${deputies.length} deputados`);
    
    // Retornar os primeiros 20 para teste
    return NextResponse.json({
      success: true,
      count: deputies.length,
      deputies: deputies.slice(0, 20),
      message: `Extraídos ${Math.min(deputies.length, 20)} deputados com fotos`
    });

  } catch (error) {
    console.error('Erro no scraping:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      deputies: []
    }, { status: 500 });
  }
}

// Função para buscar dados de um deputado específico por ID
export async function POST(request: NextRequest) {
  try {
    const { deputyId } = await request.json();
    
    const response = await fetch(`https://www.camara.leg.br/deputados/${deputyId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extrair informações detalhadas do deputado
    const name = $('.nome-deputado, .nome-parlamentar, h1').first().text().trim();
    const party = $('.partido, .sigla-partido').first().text().trim();
    const state = $('.estado, .uf').first().text().trim();
    const photoUrl = $('.foto-deputado img, .foto-parlamentar img, .perfil-foto img').attr('src');
    
    const deputy = {
      id: deputyId,
      name,
      party,
      state,
      photoUrl: photoUrl ? (photoUrl.startsWith('http') ? photoUrl : `https://www.camara.leg.br${photoUrl}`) : null
    };

    return NextResponse.json({
      success: true,
      deputy
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao buscar deputado'
    }, { status: 500 });
  }
}
