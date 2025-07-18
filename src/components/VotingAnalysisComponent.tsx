import React, { useState } from 'react';

interface VotingProject {
  id: string;
  title: string;
  date: string;
  votes: Record<string, string>;
}

interface AnalysisResult {
  project: VotingProject;
  entropy: number;
  variance: number;
  polarizationIndex: number;
  discriminationScore: number;
  yesVotes: number;
  noVotes: number;
  abstentions: number;
  absences: number;
  totalVotes: number;
}

interface ApiResponse {
  topProjects: AnalysisResult[];
  stats: {
    deputiesCount: number;
    projectsCount: number;
    sampleDeputies: string[];
    sampleProjects: string[];
  };
  summary: {
    totalProjects: number;
    analyzedProjects: number;
    averageDiscriminationScore: number;
    mostDiscriminatingProject: string;
    scoreDistribution: {
      high: number;
      medium: number;
      low: number;
    };
  };
}

const VotingAnalysisComponent: React.FC = () => {
  const [analysis, setAnalysis] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectCount, setProjectCount] = useState(10);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/analyze-voting?count=${projectCount}`);
      const result = await response.json();
      
      if (result.success) {
        setAnalysis(result.data);
      } else {
        setError(result.error || 'Erro desconhecido');
      }
    } catch (err) {
      setError('Erro ao conectar com a API');
      console.error('Erro na análise:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (score: number): string => {
    return (score * 100).toFixed(1) + '%';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Análise de Padrões de Votação dos Deputados
        </h2>
        <p className="text-gray-600 mb-6">
          Esta ferramenta identifica os projetos de lei que melhor distinguem as posições políticas dos deputados,
          usando algoritmos de análise de dados para encontrar votações mais polarizadas e discriminativas.
        </p>
        
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="project-count" className="text-sm font-medium text-gray-700">
            Número de projetos para analisar:
          </label>
          <input
            id="project-count"
            type="number"
            min="5"
            max="50"
            value={projectCount}
            onChange={(e) => setProjectCount(parseInt(e.target.value) || 10)}
            className="border border-gray-300 rounded px-3 py-2 w-20"
          />
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analisando...' : 'Executar Análise'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
            <p className="text-red-700">Erro: {error}</p>
          </div>
        )}

        {analysis && (
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
            <h3 className="font-semibold text-green-800 mb-2">Estatísticas da Análise:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Deputados:</span>
                <br />
                {analysis.stats.deputiesCount}
              </div>
              <div>
                <span className="font-medium">Projetos:</span>
                <br />
                {analysis.stats.projectsCount}
              </div>
              <div>
                <span className="font-medium">Score Médio:</span>
                <br />
                {formatScore(analysis.summary.averageDiscriminationScore)}
              </div>
              <div>
                <span className="font-medium">Mais Discriminativo:</span>
                <br />
                <span className="text-xs">{analysis.summary.mostDiscriminatingProject.substring(0, 30)}...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {analysis && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">
            Top {analysis.topProjects.length} Projetos Mais Discriminativos
          </h3>
          
          {analysis.topProjects.map((project, index) => (
            <div key={project.project.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-gray-500">{project.project.date}</span>
                  </div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    {project.project.title}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatScore(project.discriminationScore)}
                  </div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Métricas */}
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Métricas de Análise</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Entropia:</span>
                      <span className="font-medium">{project.entropy.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variância:</span>
                      <span className="font-medium">{project.variance.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Polarização:</span>
                      <span className="font-medium">{formatScore(project.polarizationIndex)}</span>
                    </div>
                  </div>
                </div>

                {/* Distribuição de Votos */}
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Distribuição de Votos</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-500"></div>
                      <span className="text-sm w-16">Sim:</span>
                      <span className="text-sm font-medium">{project.yesVotes}</span>
                      <span className="text-sm text-gray-500">({((project.yesVotes / project.totalVotes) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-500"></div>
                      <span className="text-sm w-16">Não:</span>
                      <span className="text-sm font-medium">{project.noVotes}</span>
                      <span className="text-sm text-gray-500">({((project.noVotes / project.totalVotes) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-500"></div>
                      <span className="text-sm w-16">Abstenção:</span>
                      <span className="text-sm font-medium">{project.abstentions}</span>
                      <span className="text-sm text-gray-500">({((project.abstentions / project.totalVotes) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-500"></div>
                      <span className="text-sm w-16">Ausente:</span>
                      <span className="text-sm font-medium">{project.absences}</span>
                      <span className="text-sm text-gray-500">({((project.absences / project.totalVotes) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Processando dados de votação...</span>
        </div>
      )}
    </div>
  );
};

export default VotingAnalysisComponent;
