// PoliticiansGrid: filterable grid of politician cards ranked by voting affinity
'use client';

import { useState } from 'react';
import { DeputyAffinity } from '../lib/votingAnalyzer';
import { getAffinityColor, getAffinityLabel, formatDeputyName } from './PoliticiansGridUtils';
import { PoliticiansGridModal } from './PoliticiansGridModal';

export { PoliticiansGridModal } from './PoliticiansGridModal';
export { getAffinityColor, getAffinityLabel, formatDeputyName } from './PoliticiansGridUtils';

interface PoliticiansGridProps {
  affinities: DeputyAffinity[];
  userAnswers: Record<string, 'favor' | 'contra' | 'abstencao'>;
}

export default function PoliticiansGrid({ affinities, userAnswers: _userAnswers }: PoliticiansGridProps) {
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedDeputy, setSelectedDeputy] = useState<DeputyAffinity | null>(null);

  const topAffinities = affinities
    .filter(deputy => deputy.affinity > 0)
    .sort((a, b) => b.affinity - a.affinity)
    .slice(0, displayCount);

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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🎯 Sua Afinidade com Deputados</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Baseado em suas respostas, veja quais deputados federais votaram de forma
          mais alinhada com suas opiniões em projetos de lei reais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {topAffinities.map((deputy, index) => (
          <div
            key={`${deputy.deputy}-${index}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            onClick={() => setSelectedDeputy(deputy)}
          >
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-4xl font-bold text-blue-600">
                {formatDeputyName(deputy.deputy).charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm truncate">
                {formatDeputyName(deputy.deputy)}
              </h3>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Afinidade</span>
                  <span className="text-xs font-semibold text-gray-800">{deputy.affinity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getAffinityColor(deputy.affinity)}`}
                    style={{ width: `${deputy.affinity}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{getAffinityLabel(deputy.affinity)}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-semibold text-green-600">{deputy.agreements}</div>
                  <div className="text-green-500">Concordâncias</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="font-semibold text-red-600">{deputy.disagreements}</div>
                  <div className="text-red-500">Divergências</div>
                </div>
              </div>

              {(deputy.party || deputy.state) && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                  {deputy.party && deputy.state
                    ? `${deputy.party} - ${deputy.state}`
                    : deputy.party || deputy.state}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

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

      {selectedDeputy && (
        <PoliticiansGridModal deputy={selectedDeputy} onClose={() => setSelectedDeputy(null)} />
      )}
    </div>
  );
}
