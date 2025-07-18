'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Vôti</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Início
            </Link>
            <Link href="/questionario" className="text-gray-700 hover:text-purple-600 transition-colors">
              Questionário
            </Link>
            <Link href="/resultados" className="text-gray-700 hover:text-purple-600 transition-colors">
              Meus Resultados
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-purple-600 transition-colors">
              Sobre
            </Link>
          </nav>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-purple-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
