// SimpleQuiz: minimal quiz variant that shows politicians grid immediately after answers
'use client';

import React, { useState, useEffect } from 'react';
import { DeputyAffinity } from '../lib/votingAnalyzer';
import { SimpleQuizResults } from './SimpleQuizResults';
import { SimpleQuizQuestion } from './SimpleQuizQuestion';

export { SimpleQuizResults } from './SimpleQuizResults';
export { SimpleQuizQuestion } from './SimpleQuizQuestion';

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
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
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
        body: JSON.stringify({ answers }),
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
    return <SimpleQuizResults affinities={affinities} answers={answers} onReset={resetQuiz} />;
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
    <SimpleQuizQuestion
      question={questions[currentQuestionIndex]}
      currentIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      currentAnswer={answers[questions[currentQuestionIndex]?.id]}
      isCalculating={isCalculating}
      onAnswer={handleAnswer}
      onNext={goToNextQuestion}
      onPrevious={goToPreviousQuestion}
    />
  );
}
