'use client';

import React, { useState, useEffect } from 'react';
import PoliticiansGrid from './PoliticiansGrid';
import { DeputyAffinity } from '../lib/votingAnalyzer';

interface Question {
  id: string;
  question: string;
  description: string;
}

export function SimpleQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'favor' | 'contra' | 'abstencao'>>({});
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [affinities, setAffinities] = useState<DeputyAffinity[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoadingQuestions(true);
      const response = await fetch('/api/dynamic-questions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
      } else {
        console.error('Erro ao carregar perguntas:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao carregar perguntas:', error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleAnswer = (questionId: string, answer: 'favor' | 'contra' | 'abstencao') => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = async () => {
    try {
      setIsCalculating(true);
      const response = await fetch('/api/dynamic-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      
      if (response.ok) {
        const data = await response.json();
        setAffinities(data.affinities || []);
        setShowResults(true);
      } else {
        console.error('Erro ao calcular resultados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao calcular resultados:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setAffinities([]);
  };

  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const canProceed = !!currentAnswer;

  if (isLoadingQuestions) {
    return (
      <section id="questionario" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-lg text-gray-600">Carregando perguntas baseadas em dados reais...</p>
          </div>
        </div>
      </section>
    );
  }

  if (showResults) {
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
                onClick={resetQuiz}
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

  if (questions.length === 0) {
    return (
      <section id="questionario" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Nenhuma pergunta disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="questionario" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Pergunta {currentQuestionIndex + 1} de {questions.length}
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
            <h2 className="text-2xl font-bold mb-4">{currentQuestion?.question}</h2>
            <p className="text-gray-600 mb-6">{currentQuestion?.description}</p>

            <div className="space-y-3">
              {['favor', 'contra', 'abstencao'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(currentQuestion.id, option as 'favor' | 'contra' | 'abstencao')}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    currentAnswer === option
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">
                    {option === 'favor' && '👍 A favor'}
                    {option === 'contra' && '👎 Contra'}
                    {option === 'abstencao' && '🤷‍♂️ Prefiro não opinar'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            <button
              onClick={goToNextQuestion}
              disabled={!canProceed || isCalculating}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isCalculating ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Calculando...
                </>
              ) : currentQuestionIndex === questions.length - 1 ? (
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
