'use client';

import { useState } from 'react';

export default function ConversationalQuizSimple() {
  const [isLoaded, setIsLoaded] = useState(true);

  if (!isLoaded) {
    return (
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
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            💬 Chat com IA - Descubra sua Afinidade Política
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Converse com nossa IA sobre questões políticas importantes do Brasil. 
            Baseado em votações reais do Congresso Nacional.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Chat conversacional temporariamente simplificado para resolver problemas de carregamento.
            </p>
            <p className="text-sm text-gray-500">
              Use o questionário rápido acima para descobrir sua afinidade política.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
