'use client'

import { useState, useEffect } from 'react'

const democraticImages = [
  {
    src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&h=1080&fit=crop',
    alt: 'Plenário da Câmara dos Deputados em sessão',
    caption: 'Câmara dos Deputados - Onde são votadas as leis que afetam sua vida'
  },
  {
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&h=1080&fit=crop',
    alt: 'Plenário do Senado Federal em sessão',
    caption: 'Senado Federal - Casa revisora das leis brasileiras'
  },
  {
    src: 'https://images.unsplash.com/photo-1555094622-96311b8d30b6?w=1920&h=1080&fit=crop',
    alt: 'Vista aérea do Congresso Nacional',
    caption: 'Congresso Nacional - Coração da democracia brasileira'
  },
  {
    src: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1920&h=1080&fit=crop',
    alt: 'Brasileiros exercendo o direito ao voto',
    caption: 'Você exercendo seu poder democrático'
  },
  {
    src: 'https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=1920&h=1080&fit=crop',
    alt: 'Manifestação pacífica de cidadãos brasileiros',
    caption: 'Cidadãos brasileiros exercendo a democracia'
  }
]

export function BackgroundCarousel() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % democraticImages.length)
    }, 5000) // Troca a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {democraticImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-20' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50 z-10" />
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 z-20 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
              {image.caption}
            </div>
          </div>
        </div>
      ))}
      
      {/* Indicadores */}
      <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
        {democraticImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentImage ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
