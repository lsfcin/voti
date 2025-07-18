'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { VotingQuestion } from '@/components/VotingQuestion'
import { ProgressBar } from '@/components/ProgressBar'
import { QuestionnaireResults } from '@/components/QuestionnaireResults'

interface Question {
  id: number
  title: string
  simplifiedQuestion: string
  originalText: string
  fullText: string
  category: string
}

export default function ConversationalQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'favor' | 'contra' | 'abstencao'>>({})
  const [showResults, setShowResults] = useState(false)

  // Perguntas de exemplo
  const sampleQuestions: Question[] = [
    {
      id: 1,
      title: "Aumento do salário mínimo",
      simplifiedQuestion: "Você acha que o salário mínimo deveria subir para R$ 1.500?",
      originalText: "Projeto de Lei que propõe o reajuste do salário mínimo nacional para o valor de R$ 1.500,00",
      fullText: "PROJETO DE LEI Nº 1234/2023 - Dispõe sobre o reajuste do salário mínimo nacional para R$ 1.500,00",
      category: "Seu Bolso"
    }
  ]

  const handleAnswer = (questionId: number, answer: 'favor' | 'contra' | 'abstencao') => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

  if (showResults) {
    return <QuestionnaireResults answers={answers} questions={sampleQuestions} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <ProgressBar progress={progress} />
          <p className="text-center text-gray-600 mt-2">
            Pergunta {currentQuestion + 1} de {sampleQuestions.length}
          </p>
        </div>

        <VotingQuestion
          question={sampleQuestions[currentQuestion]}
          onAnswer={handleAnswer}
          onPrevious={handlePrevious}
          canGoPrevious={currentQuestion > 0}
        />
      </main>
    </div>
  )
}
