import { NextRequest, NextResponse } from 'next/server';
import { VotingAnalyzer } from '@/lib/votingAnalyzer';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '10');
    
    const analyzer = new VotingAnalyzer();
    
    // Analisa os projetos mais discriminativos
    const results = analyzer.analyzeProjects(count);
    
    // Calcula estatísticas gerais
    const totalProjects = analyzer.getProjectsCount();
    const allProjects = analyzer.getAllProjects();
    
    // Calcula distribuição de scores
    const allResults = analyzer.analyzeProjects(totalProjects);
    // Calcula estatísticas dos deputados
    const allDeputies = new Set<string>();
    allProjects.forEach(project => {
      Object.keys(project.votes).forEach(deputy => allDeputies.add(deputy));
    });

    const scoreDistribution = {
      high: allResults.filter(r => r.discriminationScore > 0.8).length,
      medium: allResults.filter(r => r.discriminationScore > 0.5 && r.discriminationScore <= 0.8).length,
      low: allResults.filter(r => r.discriminationScore <= 0.5).length
    };

    return NextResponse.json({
      success: true,
      data: {
        topProjects: results,
        stats: {
          deputiesCount: allDeputies.size,
          projectsCount: totalProjects,
          sampleDeputies: Array.from(allDeputies).slice(0, 5),
          sampleProjects: results.slice(0, 3).map(r => r.project.title)
        },
        summary: {
          totalProjects,
          analyzedProjects: count,
          averageDiscriminationScore: results.length > 0 
            ? results.reduce((sum, r) => sum + r.discriminationScore, 0) / results.length 
            : 0,
          mostDiscriminatingProject: results[0]?.project.title || 'N/A',
          scoreDistribution
        }
      }
    });
  } catch (error) {
    console.error('Erro na análise de votações:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectIds, action } = body;
    
    const analyzer = new VotingAnalyzer();
    
    if (action === 'analyze-concordance' && Array.isArray(projectIds)) {
      // Análise de concordância entre deputados
      const concordanceMatrix = analyzer.calculateConcordanceMatrix(projectIds);
      
      // Calcula estatísticas da matriz de concordância
      const deputies = Object.keys(concordanceMatrix);
      let totalConcordance = 0;
      let totalComparisons = 0;
      
      deputies.forEach(deputy1 => {
        deputies.forEach(deputy2 => {
          if (deputy1 !== deputy2) {
            const data = concordanceMatrix[deputy1][deputy2];
            if (data.totalComparisons > 0) {
              totalConcordance += data.concordance;
              totalComparisons++;
            }
          }
        });
      });
      
      const averageConcordance = totalComparisons > 0 ? totalConcordance / totalComparisons : 0;
      
      return NextResponse.json({
        success: true,
        data: {
          concordanceMatrix,
          summary: {
            deputiesAnalyzed: deputies.length,
            averageConcordance,
            projectsAnalyzed: projectIds.length,
            totalComparisons
          }
        }
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Ação não suportada ou parâmetros inválidos' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro na análise de concordância:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
