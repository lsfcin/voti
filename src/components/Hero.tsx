'use client'

import Link from 'next/link'
import { APP_TEXTS } from '@/lib/constants'
import DeputyVotingChart from './DeputyVotingChart'

export function Hero({ onNavigateToQuiz }: { onNavigateToQuiz?: () => void }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            "{APP_TEXTS.MAIN_TITLE}"
            <span className="text-purple-600 block">{APP_TEXTS.MAIN_SUBTITLE}</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {APP_TEXTS.MAIN_DESCRIPTION}
          </p>
          
          {/* Seção do Gráfico - Movida para cá */}
          <div className="max-w-4xl mx-auto my-16">
            <DeputyVotingChart onNavigateToQuiz={onNavigateToQuiz || (() => {})} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="#questionario"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              {APP_TEXTS.CTA.WANT_HELP}
              <span>→</span>
            </a>
            
            <a
              href="#como-funciona"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors"
            >
              {APP_TEXTS.CTA.HOW_IT_WORKS}
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗳️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{APP_TEXTS.FEATURES.REAL_ACTIONS.title}</h3>
              <p className="text-gray-600">
                {APP_TEXTS.FEATURES.REAL_ACTIONS.description}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{APP_TEXTS.FEATURES.WHO_HELPS.title}</h3>
              <p className="text-gray-600">
                {APP_TEXTS.FEATURES.WHO_HELPS.description}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{APP_TEXTS.FEATURES.NO_NONSENSE.title}</h3>
              <p className="text-gray-600">
                {APP_TEXTS.FEATURES.NO_NONSENSE.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
