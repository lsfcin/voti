'use client';

import React from 'react';
import { analyzeDeputyVotingPatterns, getVotingStatsDescription } from '@/lib/deputyAnalysis';
import { APP_TEXTS, replaceVariables } from '@/lib/constants';

interface DeputyVotingChartProps {
  onNavigateToQuiz?: () => void;
}

const DeputyVotingChart: React.FC<DeputyVotingChartProps> = ({ onNavigateToQuiz }) => {
  try {
    const patterns = analyzeDeputyVotingPatterns();
    const stats = getVotingStatsDescription();
    
    // Verificar se temos dados suficientes
    if (patterns.length === 0) {
      return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Dados em Carregamento</h2>
            <p className="text-gray-500">
              Os dados de votação estão sendo processados. Tente novamente em alguns instantes.
            </p>
          </div>
        </div>
      );
    }
    
    // Pegar apenas uma amostra para não sobrecarregar o gráfico
    const sampleSize = Math.min(60, patterns.length);
    const step = Math.max(1, Math.floor(patterns.length / sampleSize));
    const sampledPatterns = patterns.filter((_, index) => index % step === 0).slice(0, sampleSize);

    // Calcular altura máxima baseada em votos efetivos (sim + não) para melhor centralização
    const maxEffectiveVotes = Math.max(...sampledPatterns.map(p => p.sim + p.nao));
    const maxVotes = Math.max(...sampledPatterns.map(p => p.total)); // Para cálculo de transparentes

    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        {/* Texto introdutório */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {APP_TEXTS.CHART_TITLE}
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            {replaceVariables(APP_TEXTS.CHART_DESCRIPTION, { projectsCount: stats.totalProjects.toString() })}
          </p>
          
          {/* Legenda visual das cores */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-cyan-500 rounded"></div>
              <span className="text-sm font-medium text-cyan-700">{APP_TEXTS.CHART_LEGEND.IN_FAVOR}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-pink-500 rounded"></div>
              <span className="text-sm font-medium text-pink-700">{APP_TEXTS.CHART_LEGEND.AGAINST}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            cada barra representa um deputado
          </p>
        </div>

        {/* Remover estatísticas - não mais necessárias */}

        {/* Gráfico vertical centralizado */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-1 h-64 border-b border-gray-200">
            {sampledPatterns.map((deputy, index) => {
              const totalVotes = deputy.total;
              const effectiveVotes = deputy.sim + deputy.nao; // Apenas votos efetivos para centralização
              const heightPercentage = effectiveVotes > 0 ? (effectiveVotes / maxEffectiveVotes) * 100 : 0;
              
              // Calcular posições relativas ao centro (50% da altura disponível para cada lado)
              const favorHeight = effectiveVotes > 0 ? (deputy.sim / effectiveVotes) * heightPercentage : 0;
              const contraHeight = effectiveVotes > 0 ? (deputy.nao / effectiveVotes) * heightPercentage : 0;
              
              return (
                <div
                  key={deputy.name}
                  className="group relative flex flex-col justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10"
                  style={{ 
                    height: '100%', 
                    minWidth: `${Math.max(3, Math.min(8, 300 / sampledPatterns.length))}px`,
                    maxWidth: '12px'
                  }}
                >
                  {/* Tooltip aprimorado */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                                bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300 z-20 
                                whitespace-nowrap shadow-xl border border-gray-700 pointer-events-none">
                    <div className="font-semibold text-blue-300 mb-1">{deputy.name}</div>
                    <div className="text-cyan-300">✓ {APP_TEXTS.CHART_LEGEND.IN_FAVOR}: {deputy.sim} ({deputy.percentualSim.toFixed(1)}%)</div>
                    <div className="text-pink-300">✗ {APP_TEXTS.CHART_LEGEND.AGAINST}: {deputy.nao} ({((deputy.nao / totalVotes) * 100).toFixed(1)}%)</div>
                    <div className="text-xs text-gray-400 mt-2 pt-1 border-t border-gray-600">
                      Votos efetivos: {effectiveVotes} de {deputy.total} projetos
                    </div>
                    {/* Seta do tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                                  border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>

                  {/* Barra vertical centralizada sem buracos */}
                  <div className="flex flex-col items-center w-full h-full relative">
                    {/* Seção CONTRA (acima do centro) - alinhada ao centro para baixo */}
                    <div className="flex flex-col justify-end w-full" style={{ height: '50%' }}>
                      {deputy.nao > 0 && (
                        <div
                          className="bg-pink-500 w-full transition-colors duration-200 group-hover:bg-pink-600"
                          style={{ height: `${contraHeight * 2}%` }}
                        />
                      )}
                    </div>
                    
                    {/* Seção A FAVOR (abaixo do centro) - alinhada ao centro para cima */}
                    <div className="flex flex-col justify-start w-full" style={{ height: '50%' }}>
                      {deputy.sim > 0 && (
                        <div
                          className="bg-cyan-500 w-full transition-colors duration-200 group-hover:bg-cyan-600"
                          style={{ height: `${favorHeight * 2}%` }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Eixo X */}
          <div className="mt-2 text-center text-sm text-gray-500">
            deputados ({sampledPatterns.length} de 513 mostrados)
          </div>
          
          {/* Labels dos extremos */}
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <div>← mais "{APP_TEXTS.CHART_LEGEND.AGAINST}"</div>
            <div>mais "{APP_TEXTS.CHART_LEGEND.IN_FAVOR}" →</div>
          </div>
        </div>

        {/* Remover insights - não mais necessários */}

        {/* Conclusão */}
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <p className="text-blue-900 text-center text-lg mb-4">
            <span className="font-semibold">diferença tem</span>. descubra quem mais se alinha com você
          </p>
          <div className="text-center">
            <button 
              onClick={onNavigateToQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {APP_TEXTS.CTA.DISCOVER_AFFINITY}
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao renderizar gráfico de votações:', error);
    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Erro no Carregamento</h2>
          <p className="text-gray-500">
            Houve um problema ao carregar os dados de votação. Por favor, recarregue a página.
          </p>
        </div>
      </div>
    );
  }
};

export default DeputyVotingChart;
