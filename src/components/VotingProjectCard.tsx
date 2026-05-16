// VotingProjectCard: displays metrics and vote distribution for a single voting project
import React from 'react';
import type { AnalysisResultLocal } from './VotingAnalysisTypes';

interface VotingProjectCardProps {
  project: AnalysisResultLocal;
  index: number;
  formatScore: (score: number) => string;
}

export function VotingProjectCard({ project, index, formatScore }: VotingProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
              #{index + 1}
            </span>
            <span className="text-sm text-gray-500">{project.project.date}</span>
          </div>
          <h4 className="font-semibold text-lg text-gray-800 mb-2">{project.project.title}</h4>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            {formatScore(project.discriminationScore)}
          </div>
          <div className="text-sm text-gray-500">Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <h5 className="font-medium text-gray-700 mb-3">Distribuição de Votos</h5>
          <div className="space-y-2">
            {[
              { color: 'bg-green-500', label: 'Sim', count: project.yesVotes },
              { color: 'bg-red-500', label: 'Não', count: project.noVotes },
              { color: 'bg-yellow-500', label: 'Abstenção', count: project.abstentions },
              { color: 'bg-gray-500', label: 'Ausente', count: project.absences },
            ].map(({ color, label, count }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${color}`}></div>
                <span className="text-sm w-16">{label}:</span>
                <span className="text-sm font-medium">{count}</span>
                <span className="text-sm text-gray-500">
                  ({((count / project.totalVotes) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
