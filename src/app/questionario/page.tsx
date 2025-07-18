'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { VotingQuestion } from '@/components/VotingQuestion'
import { ProgressBar } from '@/components/ProgressBar'
import { QuestionnaireResults } from '@/components/QuestionnaireResults'

// Dados de exemplo - em produção viriam da API
const sampleQuestions = [
  {
    id: 1,
    title: "Aumento do salário mínimo",
    simplifiedQuestion: "Você acha que o salário mínimo deveria subir para R$ 1.500? (Isso mexeria no bolso de muita gente)",
    originalText: "Projeto de Lei que propõe o reajuste do salário mínimo nacional para o valor de R$ 1.500,00 (um mil e quinhentos reais), com vigência a partir de 1º de janeiro de 2024...",
    fullText: "PROJETO DE LEI Nº 1234/2023 - Dispõe sobre o reajuste do salário mínimo nacional para R$ 1.500,00 e dá outras providências. O CONGRESSO NACIONAL decreta: Art. 1º O salário mínimo nacional fica reajustado para R$ 1.500,00 (um mil e quinhentos reais), com vigência a partir de 1º de janeiro de 2024. Art. 2º Esta lei entra em vigor na data de sua publicação.",
    category: "Seu Bolso"
  },
  {
    id: 2,
    title: "Proteção de terras indígenas",
    simplifiedQuestion: "Na sua opinião, os indígenas deveriam poder proteger legalmente as florestas onde eles já moram há muito tempo?",
    originalText: "Projeto que estabelece o marco temporal para demarcação de terras indígenas, considerando apenas terras ocupadas até a promulgação da Constituição de 1988...",
    fullText: "PROJETO DE LEI Nº 2903/2023 - Regulamenta o procedimento de demarcação das terras indígenas e estabelece o marco temporal constitucional. Art. 1º A demarcação das terras tradicionalmente ocupadas pelos índios observará os critérios estabelecidos na Constituição Federal de 1988...",
    category: "Meio Ambiente"
  },
  {
    id: 3,
    title: "Imposto para ricos",
    simplifiedQuestion: "Você acha que pessoas muito ricas (com mais de R$ 20 milhões) deveriam pagar mais impostos para ajudar o país?",
    originalText: "Proposta de Emenda à Constituição que institui o Imposto sobre Grandes Fortunas para patrimônios acima de R$ 20 milhões...",
    fullText: "PROPOSTA DE EMENDA À CONSTITUIÇÃO Nº 45/2023 - Acrescenta artigo ao Ato das Disposições Constitucionais Transitórias para instituir o Imposto sobre Grandes Fortunas. Art. 1º O Ato das Disposições Constitucionais Transitórias passa a vigorar acrescido do seguinte artigo...",
    category: "Seu Bolso"
  }
]

export default function Questionario() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'favor' | 'contra' | 'abstencao'>>({})
  const [showResults, setShowResults] = useState(false)

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
