'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'

interface Question {
  id: number
  title: string
  simplifiedQuestion: string
  originalText: string
  fullText: string
  category: string
}

interface VotingQuestionProps {
  question: Question
  onAnswer: (questionId: number, answer: 'favor' | 'contra' | 'abstencao') => void
  onPrevious: () => void
  canGoPrevious: boolean
}

export function VotingQuestion({ question, onAnswer, onPrevious, canGoPrevious }: VotingQuestionProps) {
  const [showFullText, setShowFullText] = useState(false)

  if (!question) {
    return <div className="bg-white rounded-lg shadow-lg p-8">Carregando pergunta...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
          {question.category}
        </span>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {question.title}
        </h2>
      </div>

      {/* Pergunta Principal - DESTAQUE */}
      <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">
          📋 Pergunta:
        </h3>
        <p className="text-lg text-blue-800 leading-relaxed font-medium">
          {question.simplifiedQuestion}
        </p>
      </div>

      {/* Informações adicionais sobre a proposta */}
      <div className="mb-8">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Resumo da proposta:</span>
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showFullText ? 'Ver menos' : 'Ver texto completo'}
              {showFullText ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
            </button>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            {showFullText ? question.fullText : question.originalText}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h4 className="text-lg font-semibold text-gray-800">Como você votaria?</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onAnswer(question.id, 'favor')}
            className="flex items-center justify-center space-x-3 p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group"
          >
            <ThumbsUp className="h-6 w-6 text-green-600 group-hover:text-green-700" />
            <span className="font-semibold text-green-700 group-hover:text-green-800">A Favor</span>
          </button>
          
          <button
            onClick={() => onAnswer(question.id, 'contra')}
            className="flex items-center justify-center space-x-3 p-4 border-2 border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors group"
          >
            <ThumbsDown className="h-6 w-6 text-red-600 group-hover:text-red-700" />
            <span className="font-semibold text-red-700 group-hover:text-red-800">Contra</span>
          </button>
          
          <button
            onClick={() => onAnswer(question.id, 'abstencao')}
            className="flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
          >
            <Minus className="h-6 w-6 text-gray-600 group-hover:text-gray-700" />
            <span className="font-semibold text-gray-700 group-hover:text-gray-800">Abstenção</span>
          </button>
        </div>
      </div>

      {canGoPrevious && (
        <div className="flex justify-start">
          <button
            onClick={onPrevious}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Pergunta Anterior
          </button>
        </div>
      )}
    </div>
  )
}
