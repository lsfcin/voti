import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface ImageDownload {
  url: string;
  filename: string;
  description: string;
}

const imagesToDownload: ImageDownload[] = [
  {
    url: 'https://www12.senado.leg.br/noticias/materias/2025/07/14/senado-vota-ampliacao-do-garantia-safra-para-22-municipios-do-rj/20200205_04054mo.jpg/mural/imagem_materia',
    filename: 'senado-plenario.jpg',
    description: 'Plenário do Senado Federal'
  },
  {
    url: 'https://images.unsplash.com/photo-1555848962-6e79363ec5da?w=800&h=400&fit=crop&q=80',
    filename: 'camara-congresso.jpg',
    description: 'Congresso Nacional - Câmara dos Deputados'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { imageType } = await request.json();
    
    // Criar diretório se não existir
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    const legislativeDir = path.join(imagesDir, 'legislative');
    
    if (!existsSync(legislativeDir)) {
      await mkdir(legislativeDir, { recursive: true });
    }

    const results = [];
    
    for (const imageInfo of imagesToDownload) {
      try {
        console.log(`Baixando ${imageInfo.description}...`);
        
        const response = await fetch(imageInfo.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const filePath = path.join(legislativeDir, imageInfo.filename);
        await writeFile(filePath, buffer);
        
        results.push({
          success: true,
          filename: imageInfo.filename,
          description: imageInfo.description,
          localPath: `/images/legislative/${imageInfo.filename}`,
          size: buffer.length
        });
        
        console.log(`✅ ${imageInfo.description} salva como ${imageInfo.filename}`);
        
      } catch (error) {
        console.error(`Erro ao baixar ${imageInfo.description}:`, error);
        results.push({
          success: false,
          filename: imageInfo.filename,
          description: imageInfo.description,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Download das imagens concluído',
      results
    });

  } catch (error) {
    console.error('Erro no download das imagens:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Verificar quais imagens já existem
    const legislativeDir = path.join(process.cwd(), 'public', 'images', 'legislative');
    
    const imageStatus = [];
    for (const imageInfo of imagesToDownload) {
      const filePath = path.join(legislativeDir, imageInfo.filename);
      const exists = existsSync(filePath);
      
      imageStatus.push({
        filename: imageInfo.filename,
        description: imageInfo.description,
        exists,
        localPath: exists ? `/images/legislative/${imageInfo.filename}` : null
      });
    }

    return NextResponse.json({
      success: true,
      images: imageStatus
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao verificar imagens'
    }, { status: 500 });
  }
}
