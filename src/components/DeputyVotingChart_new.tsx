'use client';

import React from 'react';
import { analyzeDeputyVotingPatterns, getVotingStatsDescription } from '@/lib/deputyAnalysis';

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

    const maxVotes = Math.max(...sampledPatterns.map(p => p.total));

    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        {/* Texto introdutório */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nem Todo Deputado Vota Igual
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            Para mostrar as diferenças, analisamos os <span className="font-semibold text-green-600">{stats.totalProjects} projetos</span> que 
            melhor distinguem as posições políticas e estamos mostrando para vocês que nem todo mundo vota igual.
          </p>
          <p className="text-base text-gray-600">
            Cada barra representa um deputado. <span className="text-green-600 font-medium">Verde = SIM</span>, 
            <span className="text-red-600 font-medium ml-2">Vermelho = NÃO</span>, 
            <span className="text-yellow-600 font-medium ml-2">Amarelo = Abstenção</span>, 
            <span className="text-gray-400 font-medium ml-2">Cinza = Ausente</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Deputados ordenados por tendência de votos (de mais "contra" para mais "a favor")
          </p>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalDeputies}</div>
            <div className="text-sm text-blue-800">Deputados Ativos</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.averageYesPercentage.toFixed(1)}%</div>
            <div className="text-sm text-green-800">Média de Votos SIM</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{stats.mostConservative.percentualSim.toFixed(1)}%</div>
            <div className="text-sm text-red-800">Menos "A Favor"</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.mostProgressive.percentualSim.toFixed(1)}%</div>
            <div className="text-sm text-purple-800">Mais "A Favor"</div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="relative">
          <div className="flex items-end justify-center space-x-1 h-64 border-b border-gray-200">
            {sampledPatterns.map((deputy, index) => {
              const totalVotes = deputy.total;
              const heightPercentage = (totalVotes / maxVotes) * 100;
              
              return (
                <div
                  key={deputy.name}
                  className="group relative flex flex-col justify-end cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ 
                    height: '100%', 
                    minWidth: `${Math.max(3, Math.min(8, 300 / sampledPatterns.length))}px`,
                    maxWidth: '12px'
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                                bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-200 z-10 
                                whitespace-nowrap shadow-lg border border-gray-700">
                    <div className="font-semibold text-blue-300">{deputy.name}</div>
                    <div className="text-green-300">✓ SIM: {deputy.sim} ({deputy.percentualSim.toFixed(1)}%)</div>
                    <div className="text-red-300">✗ NÃO: {deputy.nao}</div>
                    {deputy.abstencao > 0 && (
                      <div className="text-yellow-300">⊖ Abstenção: {deputy.abstencao}</div>
                    )}
                    {deputy.ausente > 0 && (
                      <div className="text-gray-300">○ Ausente: {deputy.ausente}</div>
                    )}
                    <div className="text-xs text-gray-400 mt-1 border-t border-gray-600 pt-1">
                      Total: {deputy.total} projetos
                    </div>
                  </div>

                  {/* Barra empilhada */}
                  <div className="flex flex-col w-full" style={{ height: `${heightPercentage}%` }}>
                    {/* Ausente (cinza) */}
                    {deputy.ausente > 0 && (
                      <div
                        className="bg-gray-400 w-full"
                        style={{ height: `${(deputy.ausente / totalVotes) * 100}%` }}
                      />
                    )}
                    
                    {/* Abstenção (amarelo) */}
                    {deputy.abstencao > 0 && (
                      <div
                        className="bg-yellow-500 w-full"
                        style={{ height: `${(deputy.abstencao / totalVotes) * 100}%` }}
                      />
                    )}
                    
                    {/* NÃO (vermelho) */}
                    {deputy.nao > 0 && (
                      <div
                        className="bg-red-500 w-full"
                        style={{ height: `${(deputy.nao / totalVotes) * 100}%` }}
                      />
                    )}
                    
                    {/* SIM (verde) */}
                    {deputy.sim > 0 && (
                      <div
                        className="bg-green-500 w-full"
                        style={{ height: `${(deputy.sim / totalVotes) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Eixo X */}
          <div className="mt-2 text-center text-sm text-gray-500">
            Deputados ({sampledPatterns.length} de {patterns.length} mostrados)
          </div>
          
          {/* Labels dos extremos */}
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <div>← Votam mais "CONTRA"</div>
            <div>Votam mais "A FAVOR" →</div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-red-800 mb-2">Mais Conservador</h3>
            <p className="text-red-700 text-sm">
              <span className="font-medium">{stats.mostConservative.name}</span> votou SIM em apenas 
              <span className="font-bold"> {stats.mostConservative.percentualSim.toFixed(1)}%</span> dos projetos analisados
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-green-800 mb-2">Mais Progressivo</h3>
            <p className="text-green-700 text-sm">
              <span className="font-medium">{stats.mostProgressive.name}</span> votou SIM em 
              <span className="font-bold"> {stats.mostProgressive.percentualSim.toFixed(1)}%</span> dos projetos analisados
            </p>
          </div>
        </div>

        {/* Conclusão */}
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <p className="text-blue-900 text-center text-lg mb-4">
            <span className="font-semibold">Viu a diferença?</span> Os deputados têm comportamentos 
            completamente diferentes nas votações que mais importam.
          </p>
          <div className="text-center">
            <p className="text-blue-700 mb-4">
              Descubra qual deles mais se alinha com você respondendo nosso questionário!
            </p>
            <button 
              onClick={onNavigateToQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              🗳️ Descobrir Minha Afinidade Política
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
