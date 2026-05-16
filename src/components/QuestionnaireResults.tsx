// QuestionnaireResults: displays final affinity rankings after quiz completion
'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { PoliticianCard } from '@/components/PoliticianCard'
import { PartyAffinity } from '@/components/PartyAffinity'

interface Question {
  id: number
  title: string
  simplifiedQuestion: string
  originalText: string
  fullText: string
  category: string
}

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

interface QuestionnaireResultsProps {
  answers: Record<number, 'favor' | 'contra' | 'abstencao'>
  questions: Question[]
}

// Dados de exemplo dos políticos
const samplePoliticians: Politician[] = [
  {
    id: 1,
    name: "Maria Santos",
    party: "PT",
    state: "SP",
    chamber: "deputado",
    photo: "/placeholder-politician.jpg",
    affinity: 89,
    votes: { 1: 'favor', 2: 'contra', 3: 'favor' }
  },
  {
    id: 2,
    name: "João Silva",
    party: "PSOL",
    state: "RJ",
    chamber: "senador",
    photo: "/placeholder-politician.jpg",
    affinity: 85,
    votes: { 1: 'favor', 2: 'contra', 3: 'favor' }
  },
  {
    id: 3,
    name: "Ana Costa",
    party: "PSDB",
    state: "MG",
    chamber: "deputado",
    photo: "/placeholder-politician.jpg",
    affinity: 45,
    votes: { 1: 'contra', 2: 'favor', 3: 'contra' }
  }
]

const sampleParties = [
  { party: "PT", affinity: 78 },
  { party: "PSOL", affinity: 72 },
  { party: "PDT", affinity: 65 },
  { party: "PSDB", affinity: 45 },
  { party: "PL", affinity: 32 },
]

export function QuestionnaireResults({ answers, questions }: QuestionnaireResultsProps) {
  const [politicians] = useState<Politician[]>(samplePoliticians)
  const [parties] = useState(sampleParties)

  // Calcular afinidade baseada nas respostas do usuário
  const calculateAffinity = (politicianVotes: Record<number, 'favor' | 'contra' | 'abstencao'>) => {
    let matches = 0
    let total = 0

    Object.keys(answers).forEach(questionId => {
      const qId = parseInt(questionId)
      if (politicianVotes[qId] && answers[qId]) {
        total++
        if (politicianVotes[qId] === answers[qId]) {
          matches++
        }
      }
    })

    return total > 0 ? Math.round((matches / total) * 100) : 0
  }

  const sortedPoliticians = politicians
    .map(p => ({
      ...p,
      affinity: calculateAffinity(p.votes)
    }))
    .sort((a, b) => b.affinity - a.affinity)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Olha só quem tá do seu lado! 👥
          </h1>
          <p className="text-xl text-gray-600">
            Estes são os políticos que mais fizeram coisas que te ajudam no dia a dia
          </p>
        </div>

        {/* Afinidade com Partidos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quais partidos mais te representam 🎯
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <PartyAffinity parties={parties} />
          </div>
        </section>

        {/* Lista de Políticos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Políticos que realmente lutam por você 🥊
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPoliticians.map(politician => (
              <PoliticianCard
                key={politician.id}
                politician={politician}
                userAnswers={answers}
                questions={questions}
              />
            ))}
          </div>
        </section>

        {/* Botão para refazer */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.location.href = '/questionario'}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Quero fazer de novo! 🔄
          </button>
        </div>
      </main>
    </div>
  )
}
