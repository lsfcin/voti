// SimpleQuizQuestion: single-question view with answer buttons and navigation
'use client';

interface Question {
  id: string;
  question: string;
  description: string;
}

interface SimpleQuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentAnswer: 'favor' | 'contra' | 'abstencao' | undefined;
  isCalculating: boolean;
  onAnswer: (id: string, answer: 'favor' | 'contra' | 'abstencao') => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ANSWER_OPTIONS = [
  { value: 'favor' as const, label: '👍 A favor' },
  { value: 'contra' as const, label: '👎 Contra' },
  { value: 'abstencao' as const, label: '🤷‍♂️ Prefiro não opinar' },
];

export function SimpleQuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  currentAnswer,
  isCalculating,
  onAnswer,
  onNext,
  onPrevious,
}: SimpleQuizQuestionProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const canProceed = !!currentAnswer;

  return (
    <section id="questionario" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Pergunta {currentIndex + 1} de {totalQuestions}
              </span>
              <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
            <p className="text-gray-600 mb-6">{question.description}</p>

            <div className="space-y-3">
              {ANSWER_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onAnswer(question.id, value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    currentAnswer === value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            <button
              onClick={onNext}
              disabled={!canProceed || isCalculating}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isCalculating ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Calculando...
                </>
              ) : currentIndex === totalQuestions - 1 ? (
                'Ver Resultados'
              ) : (
                'Próxima'
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
