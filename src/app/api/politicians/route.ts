import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

interface Politician {
  id: number;
  nome: string;
  cargo: string;
  partido: string;
  estado: string;
  afinidade: number;
  imageUrl: string;
  perfil: {
    votacoes: number;
    projetos: number;
    comissoes: number;
  };
}

function carregarDeputados(): Politician[] {
  try {
    const path = join(process.cwd(), 'public', 'images', 'politicians', 'deputies', 'deputados_enumerados.txt');
    const content = readFileSync(path, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    const deputados: Politician[] = [];
    
    for (const line of lines) {
      const parts = line.split('\t');
      if (parts.length >= 4) {
        const numero = parts[0].trim();
        const nome = parts[1].trim();
        const partido = parts[2].trim();
        const estado = parts[3].trim();
        
        // Pular linhas que não são dados válidos
        if (!numero || isNaN(parseInt(numero)) || !nome || !partido || !estado) {
          continue;
        }
        
        const id = parseInt(numero);
        
        // Validar que está no range correto (0-511)
        if (id < 0 || id > 511) {
          continue;
        }
        
        // Determinar gênero do cargo
        const cargo = determinarCargo(nome);
        
        // Gerar o caminho da imagem baseado no número
        const imageUrl = `/images/politicians/deputies/imagens/deputados.pdf-image-${numero.padStart(3, '0')}.jpg`;
        
        deputados.push({
          id,
          nome,
          cargo,
          partido,
          estado,
          afinidade: Math.floor(Math.random() * 101), // Simulando afinidade aleatória
          imageUrl,
          perfil: {
            votacoes: Math.floor(Math.random() * 100) + 50,
            projetos: Math.floor(Math.random() * 50) + 10,
            comissoes: Math.floor(Math.random() * 8) + 2
          }
        });
      }
    }
    
    console.log(`Carregados ${deputados.length} deputados do arquivo (índices 0-511)`);
    return deputados;
  } catch (error) {
    console.error('Erro ao carregar deputados:', error);
    return [];
  }
}

function determinarCargo(nome: string): string {
  const nomeMinusculo = nome.toLowerCase();
  
  // Lista de indicadores femininos
  const indicadoresFemininos = [
    'ana', 'alice', 'aline', 'adriana', 'benedita', 'bia', 'carla', 'caroline', 
    'chris', 'clarissa', 'fernanda', 'cristiane', 'daniela', 'dra.', 'emanuela', 
    'erika', 'flávia', 'greyce', 'jandira', 'janete', 'jéssica', 'julia', 
    'laura', 'lêda', 'lidice', 'liziane', 'luizianne', 'maria', 'mariana', 
    'marília', 'natália', 'perpétua', 'katia', 'rosangela', 'silvia', 'soraya', 
    'tabata', 'talíria', 'vera', 'camila', 'carol', 'célia', 'taliria', 'rejane',
    'amanda', 'amom', 'antônia', 'andreia', 'any', 'célia', 'duda', 'enfermeira',
    'professora', 'delegada', 'coronel fernanda', 'gisela', 'greyce', 'helena',
    'ivoneide', 'iza', 'luiza', 'lêda', 'perpétua', 'professora', 'renata',
    'renilce', 'roberta', 'rogéria', 'rosana', 'rosângela', 'sâmia', 'silvia',
    'simone', 'socorro', 'sonize', 'soraya', 'yandra'
  ];
  
  // Verificar se contém algum indicador feminino
  for (const indicador of indicadoresFemininos) {
    if (nomeMinusculo.includes(indicador)) {
      return 'Deputada Federal';
    }
  }
  
  return 'Deputado Federal';
}

export async function GET() {
  try {
    console.log('Carregando dados dos 512 deputados federais (índices 0-511)...');
    
    // Carregar todos os deputados
    const deputados = carregarDeputados();
    
    // Verificar se temos todos os 512 deputados
    const indicesEsperados = Array.from({ length: 512 }, (_, i) => i);
    const indicesEncontrados = deputados.map(d => d.id).sort((a, b) => a - b);
    const indicesFaltando = indicesEsperados.filter(i => !indicesEncontrados.includes(i));
    
    if (indicesFaltando.length > 0) {
      console.warn(`Índices faltando: ${indicesFaltando.slice(0, 10).join(', ')}${indicesFaltando.length > 10 ? '...' : ''}`);
    }
    
    // Ordenar alfabeticamente por nome
    const deputadosOrdenados = deputados.sort((a, b) => a.nome.localeCompare(b.nome));
    
    console.log(`Retornando ${deputadosOrdenados.length}/512 deputados ordenados alfabeticamente`);
    
    return NextResponse.json({
      success: true,
      data: deputadosOrdenados,
      total: deputadosOrdenados.length,
      expectedTotal: 512,
      message: `${deputadosOrdenados.length} deputados federais carregados (índices 0-511)`
    });
    
  } catch (error) {
    console.error('Erro na API de políticos:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      data: [],
      total: 0,
      expectedTotal: 512
    }, { status: 500 });
  }
}
