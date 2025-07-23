'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            "todo político é igual!"
            <span className="text-purple-600 block">será...?</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            quem na prática tá na política pra te ajudar e agir de acordo com os teus valores
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="#questionario"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              Quero saber quem me ajuda!
              <span>→</span>
            </a>
            
            <a
              href="#como-funciona"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors"
            >
              Como isso funciona?
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗳️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ações Reais</h3>
              <p className="text-gray-600">
                O que os políticos fizeram de verdade que afeta sua vida todos os dias
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quem te Ajuda</h3>
              <p className="text-gray-600">
                Descubra quais políticos realmente lutaram por coisas que te beneficiam
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sem Enrolação</h3>
              <p className="text-gray-600">
                Perguntas simples sobre questões que mexem com seu bolso e sua vida
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
