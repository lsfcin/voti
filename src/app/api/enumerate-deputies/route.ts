import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    console.log('Processando arquivo deputados.txt para enumerar com fotos...');
    
    // Caminhos dos arquivos
    const deputadosTxtPath = path.join(process.cwd(), 'public', 'images', 'politicians', 'deputies', 'deputados.txt');
    const outputPath = path.join(process.cwd(), 'public', 'images', 'politicians', 'deputies', 'deputados_enumerados.txt');
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(deputadosTxtPath)) {
      return NextResponse.json({
        success: false,
        error: 'Arquivo deputados.txt não encontrado',
        path: deputadosTxtPath
      }, { status: 404 });
    }

    // Ler o arquivo
    const conteudo = fs.readFileSync(deputadosTxtPath, 'utf-8');
    const linhas = conteudo.split('\n');
    
    console.log(`Processando ${linhas.length} linhas...`);

    // Extrair nomes dos deputados
    const deputados = extrairDeputados(linhas);
    
    console.log(`Encontrados ${deputados.length} deputados`);

    // Gerar arquivo enumerado
    const conteudoEnumerado = gerarArquivoEnumerado(deputados);
    
    // Salvar arquivo
    fs.writeFileSync(outputPath, conteudoEnumerado, 'utf-8');
    
    return NextResponse.json({
      success: true,
      totalDeputados: deputados.length,
      outputPath: outputPath,
      sample: deputados.slice(0, 10), // Primeiros 10 como amostra
      preview: conteudoEnumerado.split('\n').slice(0, 20).join('\n')
    });

  } catch (error) {
    console.error('Erro ao processar deputados:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}

function extrairDeputados(linhas: string[]) {
  const deputados: Array<{
    ordem: number;
    nome: string;
    partido: string;
    estado: string;
    email?: string;
    gabinete?: string;
    foto: string;
  }> = [];

  let ordemAtual = 0;
  
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();
    
    // Pular linhas vazias ou irrelevantes (incluindo os cabeçalhos repetidos)
    if (!linha || 
        linha.includes('F E D E R A I S') || 
        linha.includes('2023 - 2027') || 
        linha === 'DEPUTADOS' ||
        linha === 'CÂMARA DOS DEPUTADOS' ||
        linha.includes('Gab.:') ||
        linha.includes('Fone') ||
        linha.includes('Fax') ||
        linha.includes('@camara.leg.br')) {
      continue;
    }

    // Verificar se é uma linha com nome de deputado
    // Critério: linha que não contém "-", "@", números no início, e não é informação administrativa
    if (!linha.includes('-') && 
        !linha.includes('@') && 
        !linha.includes('Gab.') &&
        !linha.includes('Fone') &&
        !linha.includes('Fax') &&
        !linha.match(/^\d/) && // Não começa com número
        linha.length > 3 &&
        /^[A-ZÁÊÇÕÂÍÚÀÈ]/.test(linha)) { // Começa com letra maiúscula (incluindo acentos)
      
      // Procurar a próxima linha com formato PARTIDO - ESTADO nas próximas 5 linhas
      let partidoEstadoEncontrado = false;
      for (let j = i + 1; j < Math.min(i + 6, linhas.length); j++) {
        const proximaLinha = linhas[j].trim();
        
        // Pular linhas que não são partido-estado
        if (!proximaLinha || 
            proximaLinha.includes('@') ||
            proximaLinha.includes('Gab.') ||
            proximaLinha.includes('Fone') ||
            proximaLinha.includes('Fax') ||
            proximaLinha === 'CÂMARA DOS DEPUTADOS' ||
            proximaLinha.includes('2023 - 2027')) {
          continue;
        }
        
        // Padrão: PARTIDO - ESTADO (aceitar partidos com caracteres especiais)
        const padraoPartidoEstado = /^([A-Za-z]{2,20})\s*-\s*([A-Z]{2})$/;
        const match = proximaLinha.match(padraoPartidoEstado);
        
        if (match) {
          const [, partido, estado] = match;
          
          const numeroFoto = String(ordemAtual).padStart(3, '0');
          const nomeArquivoFoto = `deputados.pdf-image-${numeroFoto}.jpg`;
          
          deputados.push({
            ordem: ordemAtual,
            nome: linha,
            partido: partido,
            estado: estado,
            foto: nomeArquivoFoto
          });
          
          console.log(`${ordemAtual}: ${linha} - ${partido}/${estado}`);
          ordemAtual++;
          partidoEstadoEncontrado = true;
          break;
        }
      }
      
      // Parar se chegou ao limite de fotos disponíveis (512 fotos: 000-511)
      if (ordemAtual >= 512) {
        console.log('Limite de 512 fotos atingido, parando...');
        break;
      }
    }
  }
  
  console.log(`Extraídos ${deputados.length} deputados no total.`);
  return deputados;
}

function gerarArquivoEnumerado(deputados: any[]) {
  let conteudo = '';
  
  conteudo += '# DEPUTADOS FEDERAIS ENUMERADOS COM FOTOS\n';
  conteudo += '# 2023-2027\n';
  conteudo += `# Total: ${deputados.length} deputados\n`;
  conteudo += '# Formato: ORDEM | NOME | PARTIDO | ESTADO | ARQUIVO_FOTO\n';
  conteudo += '#' + '='.repeat(80) + '\n\n';
  
  deputados.forEach((dep, index) => {
    conteudo += `${dep.ordem.toString().padStart(3, '0')} | ${dep.nome} | ${dep.partido} | ${dep.estado} | ${dep.foto}\n`;
  });
  
  conteudo += '\n# FIM DA LISTA\n';
  conteudo += `# Gerado em: ${new Date().toISOString()}\n`;
  
  return conteudo;
}

export async function POST(request: NextRequest) {
  // Endpoint para reprocessar com parâmetros específicos
  try {
    const { startIndex, endIndex } = await request.json();
    
    const deputadosTxtPath = path.join(process.cwd(), 'public', 'images', 'politicians', 'deputies', 'deputados.txt');
    const conteudo = fs.readFileSync(deputadosTxtPath, 'utf-8');
    const linhas = conteudo.split('\n');
    
    const deputados = extrairDeputados(linhas);
    const slice = deputados.slice(startIndex || 0, endIndex || deputados.length);
    
    return NextResponse.json({
      success: true,
      totalDeputados: deputados.length,
      sliceStart: startIndex || 0,
      sliceEnd: endIndex || deputados.length,
      deputados: slice
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
