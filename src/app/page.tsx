'use client';

import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { LegislativeHouses } from '@/components/LegislativeHouses'
import { SimpleQuiz } from '@/components/SimpleQuiz'
import { ChatLLM } from '@/components/ChatLLM'

const ConversationalQuiz = dynamic(
  () => import('@/components/ConversationalQuizFixed'),
  {
    ssr: false,
    loading: () => (
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <LegislativeHouses />
      <SimpleQuiz />
      <ConversationalQuiz />
      <div className="p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sistema com Dados Reais ✅</h2>
            <p className="text-gray-600">
              O questionário acima usa dados reais de votações dos deputados federais do Brasil. 
              As perguntas são geradas dinamicamente com base em projetos de lei que realmente passaram pelo Congresso Nacional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">📊 Dados Reais</h3>
              <p className="text-gray-600">
                Sistema integrado com votações do Congresso Nacional
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">🤖 IA Simplifica</h3>
              <p className="text-gray-600">
                Perguntas claras sobre projetos complexos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção do Chat LLM */}
      <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              💬 Converse com Nossa Assistente Política
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tire suas dúvidas sobre política brasileira, entenda melhor as propostas 
              e descubra como os políticos votam em questões que te afetam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat */}
            <div className="lg:col-span-2">
              <ChatLLM className="w-full" />
            </div>

            {/* Dicas */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  💡 Dicas para usar o chat:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Pergunte sobre propostas em votação</li>
                  <li>• Tire dúvidas sobre o processo legislativo</li>
                  <li>• Entenda melhor as diferentes posições políticas</li>
                  <li>• Explore dados de transparência</li>
                  <li>• Saiba como deputados e senadores votaram</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  🎯 Exemplos de perguntas:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• "Como funciona uma votação no Congresso?"</li>
                  <li>• "O que é marco temporal indígena?"</li>
                  <li>• "Quais deputados votaram a favor do auxílio emergencial?"</li>
                  <li>• "Explique o que é PEC da transição"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
