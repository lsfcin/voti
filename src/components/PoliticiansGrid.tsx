'use client';

import { useState } from 'react';
import { DeputyAffinity } from '../lib/votingAnalyzer';

interface PoliticiansGridProps {
  affinities: DeputyAffinity[];
  userAnswers: Record<string, 'favor' | 'contra' | 'abstencao'>;
}

export default function PoliticiansGrid({ affinities, userAnswers }: PoliticiansGridProps) {
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedDeputy, setSelectedDeputy] = useState<DeputyAffinity | null>(null);

  // Filtra e ordena por afinidade
  const topAffinities = affinities
    .filter(deputy => deputy.affinity > 0)
    .sort((a, b) => b.affinity - a.affinity)
    .slice(0, displayCount);

  const getAffinityColor = (affinity: number): string => {
    if (affinity >= 80) return 'bg-green-500'; // Perfect (80-100%)
    if (affinity >= 60) return 'bg-green-400'; // High (60-79%)
    if (affinity >= 40) return 'bg-yellow-500'; // Medium (40-59%)
    if (affinity >= 20) return 'bg-orange-500'; // Low (20-39%)
    return 'bg-red-600'; // None (0-19%)
  };

  const getAffinityLabel = (affinity: number): string => {
    if (affinity >= 80) return 'Perfeita';
    if (affinity >= 60) return 'Alta';
    if (affinity >= 40) return 'Média';
    if (affinity >= 20) return 'Baixa';
    return 'Muito Baixa';
  };

  const formatDeputyName = (name: string): string => {
    // Remove prefixos comuns e limpa o nome
    return name
      .replace(/^(Dep\.|Deputado|Deputada)\s*/i, '')
      .replace(/\s*\([^)]*\)$/, '') // Remove partido/estado no final
      .trim();
  };

  if (affinities.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🗳️</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Complete o questionário para ver sua afinidade
          </h3>
          <p className="text-gray-500">
            Responda às perguntas para descobrir quais deputados pensam como você
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🎯 Sua Afinidade com Deputados
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Baseado em suas respostas, veja quais deputados federais votaram de forma 
          mais alinhada com suas opiniões em projetos de lei reais.
        </p>
      </div>

      {/* Grid de Deputados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {topAffinities.map((deputy, index) => (
          <div
            key={`${deputy.deputy}-${index}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            onClick={() => setSelectedDeputy(deputy)}
          >
            {/* Foto do Deputado */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-4xl font-bold text-blue-600">
                {formatDeputyName(deputy.deputy).charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Informações */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm truncate">
                {formatDeputyName(deputy.deputy)}
              </h3>
              
              {/* Barra de Afinidade */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Afinidade</span>
                  <span className="text-xs font-semibold text-gray-800">
                    {deputy.affinity}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getAffinityColor(deputy.affinity)}`}
                    style={{ width: `${deputy.affinity}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getAffinityLabel(deputy.affinity)}
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-semibold text-green-600">
                    {deputy.agreements}
                  </div>
                  <div className="text-green-500">Concordâncias</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="font-semibold text-red-600">
                    {deputy.disagreements}
                  </div>
                  <div className="text-red-500">Divergências</div>
                </div>
              </div>

              {/* Partido e Estado */}
              {(deputy.party || deputy.state) && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                  {deputy.party && deputy.state 
                    ? `${deputy.party} - ${deputy.state}`
                    : deputy.party || deputy.state
                  }
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botão para carregar mais */}
      {affinities.length > displayCount && (
        <div className="text-center">
          <button
            onClick={() => setDisplayCount(prev => prev + 12)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Carregar Mais Deputados
          </button>
        </div>
      )}

      {/* Modal de Detalhes */}
      {selectedDeputy && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedDeputy(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Cabeçalho */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {formatDeputyName(selectedDeputy.deputy)}
                  </h3>
                  {(selectedDeputy.party || selectedDeputy.state) && (
                    <p className="text-gray-600">
                      {selectedDeputy.party && selectedDeputy.state 
                        ? `${selectedDeputy.party} - ${selectedDeputy.state}`
                        : selectedDeputy.party || selectedDeputy.state
                      }
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedDeputy(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Estatísticas Detalhadas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {selectedDeputy.affinity}%
                  </div>
                  <div className="text-blue-700 font-semibold">Afinidade</div>
                  <div className="text-xs text-blue-600">
                    {getAffinityLabel(selectedDeputy.affinity)}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {selectedDeputy.agreements}
                  </div>
                  <div className="text-green-700 font-semibold">Concordâncias</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {selectedDeputy.disagreements}
                  </div>
                  <div className="text-red-700 font-semibold">Divergências</div>
                </div>
              </div>

              {/* Barra de Afinidade Grande */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Nível de Afinidade</span>
                  <span className="font-bold text-gray-800">{selectedDeputy.affinity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${getAffinityColor(selectedDeputy.affinity)}`}
                    style={{ width: `${selectedDeputy.affinity}%` }}
                  />
                </div>
              </div>

              {/* Detalhes das Votações */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Histórico de Votações Comparadas
                </h4>
                
                {Object.entries(selectedDeputy.matches).length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Nenhuma votação específica registrada para comparação.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {Object.entries(selectedDeputy.matches).map(([question, isMatch]) => (
                      <div
                        key={question}
                        className={`p-3 rounded-lg ${
                          isMatch ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 truncate" title={question}>
                              {question.length > 60 ? `${question.substring(0, 60)}...` : question}
                            </p>
                          </div>
                          <div className={`ml-3 px-2 py-1 rounded text-xs font-semibold ${
                            isMatch 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {isMatch ? '✓ Concordância' : '✗ Divergência'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Ver Perfil Completo
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                  Histórico de Votações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
