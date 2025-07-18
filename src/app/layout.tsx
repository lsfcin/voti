import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vôti - Descubra sua afinidade política',
  description: 'Aplicativo que mostra sua afinidade com deputados e senadores brasileiros baseado em votações reais do Congresso Nacional.',
  keywords: 'política, brasil, deputados, senadores, votações, congresso, democracia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
          {children}
        </div>
      </body>
    </html>
  )
}
