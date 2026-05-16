// PoliticiansGridModal: detail modal for a selected deputy
'use client';

import { DeputyAffinity } from '../lib/votingAnalyzer';
import { getAffinityColor, getAffinityLabel, formatDeputyName } from './PoliticiansGridUtils';

interface PoliticiansGridModalProps {
  deputy: DeputyAffinity;
  onClose: () => void;
}

export function PoliticiansGridModal({ deputy, onClose }: PoliticiansGridModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {formatDeputyName(deputy.deputy)}
              </h3>
              {(deputy.party || deputy.state) && (
                <p className="text-gray-600">
                  {deputy.party && deputy.state
                    ? `${deputy.party} - ${deputy.state}`
                    : deputy.party || deputy.state}
                </p>
              )}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">{deputy.affinity}%</div>
              <div className="text-blue-700 font-semibold">Afinidade</div>
              <div className="text-xs text-blue-600">{getAffinityLabel(deputy.affinity)}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-1">{deputy.agreements}</div>
              <div className="text-green-700 font-semibold">Concordâncias</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-1">{deputy.disagreements}</div>
              <div className="text-red-700 font-semibold">Divergências</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Nível de Afinidade</span>
              <span className="font-bold text-gray-800">{deputy.affinity}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${getAffinityColor(deputy.affinity)}`}
                style={{ width: `${deputy.affinity}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-3">Histórico de Votações Comparadas</h4>
            {Object.entries(deputy.matches).length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Nenhuma votação específica registrada para comparação.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {Object.entries(deputy.matches).map(([question, isMatch]) => (
                  <div
                    key={question}
                    className={`p-3 rounded-lg ${
                      isMatch
                        ? 'bg-green-50 border-l-4 border-green-400'
                        : 'bg-red-50 border-l-4 border-red-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 truncate" title={question}>
                          {question.length > 60 ? `${question.substring(0, 60)}...` : question}
                        </p>
                      </div>
                      <div
                        className={`ml-3 px-2 py-1 rounded text-xs font-semibold ${
                          isMatch ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isMatch ? '✓ Concordância' : '✗ Divergência'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
  );
}
