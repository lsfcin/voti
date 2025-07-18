'use client';

import { ChatLLM } from '@/components/ChatLLM'
import VotingAnalysisComponent from '@/components/VotingAnalysisComponent'
import DeputyVotingChart from '@/components/DeputyVotingChart'
import { useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('abertura')

  const tabs = [
    { 
      id: 'abertura', 
      label: 'Abertura',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: 'conversacao', 
      label: 'Conversação',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      id: 'analise', 
      label: 'Análise',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: 'afinidade', 
      label: 'Afinidade',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    }
  ]

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header fixo */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Vôti</h1>
          </div>
          
          {/* Botões do topo direito */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors" title="Login">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Sistema de Abas */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Conteúdo das Abas */}
        <div className="flex-1 overflow-hidden">
          {/* Aba Abertura */}
          {activeTab === 'abertura' && (
            <div className="h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto p-8">
                {/* Seção principal */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    todo político é igual!
                    <span className="text-purple-600 block text-2xl">será?</span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                    a gente mostra quem na prática, <strong>sem enrolação</strong>, tá na política pra te ajudar 
                    e agir de acordo com os teus valores. baseado em <strong>votações reais</strong>, não em promessas.
                  </p>
                  
                  {/* Cards de funcionalidades */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="text-4xl mb-4">🗳️</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ações Reais</h3>
                      <p className="text-gray-600">
                        O que os políticos fizeram de verdade que afeta sua vida todos os dias
                      </p>
                    </div>
                    
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="text-4xl mb-4">📊</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Quem te Ajuda</h3>
                      <p className="text-gray-600">
                        Descubra quais políticos realmente lutaram por coisas que te beneficiam
                      </p>
                    </div>
                    
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="text-4xl mb-4">👥</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Sem Enrolação</h3>
                      <p className="text-gray-600">
                        Perguntas simples sobre questões que mexem com seu bolso e sua vida
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gráfico de Votações dos Deputados */}
                <div className="my-16">
                  <DeputyVotingChart onNavigateToQuiz={() => setActiveTab('conversacao')} />
                </div>

                {/* Seção de notícias (placeholder) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">📰</span>
                    Últimas do Congresso
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm text-gray-500">Em breve</p>
                      <p className="text-gray-700">
                        Aqui aparecerão notícias oficiais e análises de terceiros sobre as últimas movimentações do Congresso Nacional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Conversação */}
          {activeTab === 'conversacao' && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden">
                <ChatLLM className="h-full" />
              </div>
            </div>
          )}

          {/* Aba Análise */}
          {activeTab === 'analise' && (
            <div className="h-full overflow-y-auto">
              <VotingAnalysisComponent />
            </div>
          )}

          {/* Aba Afinidade */}
          {activeTab === 'afinidade' && (
            <div className="h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    🎯 Sua Afinidade Política
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Complete o questionário na aba "Conversação" para descobrir quais políticos 
                    mais se alinham com suas opiniões baseado em votações reais.
                  </p>
                </div>

                {/* Placeholder para resultados */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Resultados aparecerão aqui
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Converse com nossa IA para descobrir sua afinidade com deputados e senadores
                  </p>
                  <button
                    onClick={() => setActiveTab('conversacao')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Iniciar Conversa
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Navegação Inferior */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 flex-shrink-0">
        <div className="flex justify-center items-center space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title={tab.label}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
