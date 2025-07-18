'use client'

import { useState } from 'react'
import { User, MapPin, ExternalLink } from 'lucide-react'

interface Politician {
  id: number
  name: string
  party: string
  state: string
  chamber: 'deputado' | 'senador'
  photo: string
  affinity: number
  votes: Record<number, 'favor' | 'contra' | 'abstencao'>
}

interface Question {
  id: number
  title: string
  simplifiedQuestion: string
  originalText: string
  fullText: string
  category: string
}

interface PoliticianCardProps {
  politician: Politician
  userAnswers: Record<number, 'favor' | 'contra' | 'abstencao'>
  questions: Question[]
}

export function PoliticianCard({ politician, userAnswers, questions }: PoliticianCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getAffinityColor = (affinity: number) => {
    if (affinity >= 80) return 'bg-green-500'
    if (affinity >= 60) return 'bg-yellow-400'
    if (affinity >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getAffinityText = (affinity: number) => {
    if (affinity >= 80) return 'text-green-600'
    if (affinity >= 60) return 'text-yellow-600'
    if (affinity >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getVoteIcon = (vote: 'favor' | 'contra' | 'abstencao') => {
    switch (vote) {
      case 'favor': return '✓'
      case 'contra': return '✗'
      case 'abstencao': return '−'
    }
  }

  const getVoteColor = (vote: 'favor' | 'contra' | 'abstencao') => {
    switch (vote) {
      case 'favor': return 'text-green-600'
      case 'contra': return 'text-red-600'
      case 'abstencao': return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{politician.name}</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="font-medium">{politician.party}</span>
              <span>•</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{politician.state}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500 capitalize">{politician.chamber}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Afinidade</span>
            <span className={`font-bold text-lg ${getAffinityText(politician.affinity)}`}>
              {politician.affinity}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${getAffinityColor(politician.affinity)}`}
              style={{ width: `${politician.affinity}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-purple-600 hover:text-purple-800 font-medium text-sm border border-purple-300 rounded-lg py-2 hover:bg-purple-50 transition-colors"
        >
          {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes das Votações'}
        </button>

        {showDetails && (
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-800">Comparação de Votos:</h4>
            {questions.map(question => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-800 mb-2">
                  {question.title}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Você:</span>
                    <span className={`font-medium ${getVoteColor(userAnswers[question.id])}`}>
                      {getVoteIcon(userAnswers[question.id])} {userAnswers[question.id]}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{politician.name}:</span>
                    <span className={`font-medium ${getVoteColor(politician.votes[question.id])}`}>
                      {getVoteIcon(politician.votes[question.id])} {politician.votes[question.id]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="w-full flex items-center justify-center space-x-2 text-purple-600 hover:text-purple-800 font-medium text-sm border border-purple-300 rounded-lg py-2 hover:bg-purple-50 transition-colors mt-3">
              <ExternalLink className="h-4 w-4" />
              <span>Ver Perfil Completo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
