'use client'

import { APP_TEXTS } from '@/lib/constants'

export function LegislativeHouses() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {APP_TEXTS.LEGISLATIVE.SECTION_TITLE}
          </h2>
          <p className="text-lg text-gray-600">
            {APP_TEXTS.LEGISLATIVE.SECTION_SUBTITLE}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Câmara dos Deputados */}
          <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <img
                src="/images/legislative/camara-deputados.svg"
                alt="Câmara dos Deputados - Congresso Nacional"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Erro ao carregar imagem da Câmara');
                  e.currentTarget.src = "https://via.placeholder.com/800x400/059669/ffffff?text=Câmara+dos+Deputados";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{APP_TEXTS.LEGISLATIVE.CHAMBER_TITLE}</h3>
                <p className="text-sm opacity-90">{APP_TEXTS.LEGISLATIVE.CHAMBER_SUBTITLE}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                {APP_TEXTS.LEGISLATIVE.CHAMBER_DESCRIPTION}
              </p>
            </div>
          </div>

          {/* Senado Federal */}
          <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <img
                src="/images/legislative/senado-federal.svg"
                alt="Plenário do Senado Federal"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Erro ao carregar imagem do Senado');
                  e.currentTarget.src = "https://via.placeholder.com/800x400/1d4ed8/ffffff?text=Senado+Federal";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{APP_TEXTS.LEGISLATIVE.SENATE_TITLE}</h3>
                <p className="text-sm opacity-90">{APP_TEXTS.LEGISLATIVE.SENATE_SUBTITLE}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                {APP_TEXTS.LEGISLATIVE.SENATE_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {APP_TEXTS.LEGISLATIVE.WHY_MATTERS_TITLE}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="text-2xl mb-2 block">💰</span>
                <h4 className="font-semibold mb-2">{APP_TEXTS.LEGISLATIVE.MONEY_CARD.title}</h4>
                <p className="text-sm text-gray-600">
                  {APP_TEXTS.LEGISLATIVE.MONEY_CARD.description}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="text-2xl mb-2 block">🏥</span>
                <h4 className="font-semibold mb-2">{APP_TEXTS.LEGISLATIVE.RIGHTS_CARD.title}</h4>
                <p className="text-sm text-gray-600">
                  {APP_TEXTS.LEGISLATIVE.RIGHTS_CARD.description}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="text-2xl mb-2 block">🌍</span>
                <h4 className="font-semibold mb-2">{APP_TEXTS.LEGISLATIVE.FUTURE_CARD.title}</h4>
                <p className="text-sm text-gray-600">
                  {APP_TEXTS.LEGISLATIVE.FUTURE_CARD.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
