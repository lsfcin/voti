import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { APP_TEXTS } from '@/lib/constants'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APP_TEXTS.METADATA.TITLE,
  description: APP_TEXTS.METADATA.DESCRIPTION,
  keywords: APP_TEXTS.METADATA.KEYWORDS,
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
