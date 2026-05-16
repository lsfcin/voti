// SimpleQuizResults: results screen shown after the quiz is completed
'use client';

import { DeputyAffinity } from '../lib/votingAnalyzer';
import PoliticiansGrid from './PoliticiansGrid';

interface SimpleQuizResultsProps {
  affinities: DeputyAffinity[];
  answers: Record<string, 'favor' | 'contra' | 'abstencao'>;
  onReset: () => void;
}

export function SimpleQuizResults({ affinities, answers, onReset }: SimpleQuizResultsProps) {
  return (
    <section id="questionario" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">🎯 Seus Resultados</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Deputados com maior afinidade:</h3>
            <div className="space-y-3">
              {affinities.slice(0, 5).map((deputy: DeputyAffinity, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{deputy.deputy}</span>
                    <span className="text-sm text-gray-600 ml-2">({deputy.party} - {deputy.state})</span>
                  </div>
                  <span className="text-purple-600 font-bold">{(deputy.affinity * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Explore todos os deputados:</h3>
            <PoliticiansGrid affinities={affinities} userAnswers={answers} />
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onReset}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Refazer Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
