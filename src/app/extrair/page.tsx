'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import DeputyScraping from '@/components/DeputyScraping';
import ImageDownloader from '@/components/ImageDownloader';
import DeputyPhotoExtractor from '@/components/DeputyPhotoExtractor';
import { ArrowLeft, Database, Camera, Download } from 'lucide-react';
import Link from 'next/link';

interface Deputy {
  id: string;
  name: string;
  party: string;
  state: string;
  photoUrl: string;
}

export default function ExtractPage() {
  const [extractedDeputies, setExtractedDeputies] = useState<Deputy[]>([]);

  const handleDeputiesExtracted = (deputies: Deputy[]) => {
    setExtractedDeputies(deputies);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para início</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Extração de Dados dos Deputados
          </h1>
          <p className="text-gray-600 text-lg">
            Ferramenta para extrair fotos e informações dos deputados federais 
            diretamente do site oficial da Câmara dos Deputados.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Download de Imagens */}
          <ImageDownloader />
          
          {/* Extração de Fotos dos Deputados */}
          <DeputyPhotoExtractor />
          
          {/* Extração de Deputados */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DeputyScraping onDeputiesExtracted={handleDeputiesExtracted} />
            </div>

            {/* Painel lateral com informações */}
            <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Fonte de Dados</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Site oficial:</strong><br />
                  <a 
                    href="https://www.camara.leg.br/deputados/quem-sao" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    www.camara.leg.br/deputados/quem-sao
                  </a>
                </p>
                <p>
                  <strong>PDF Carômetro:</strong><br />
                  <a 
                    href="https://www.camara.leg.br/internet/infdoc/novoconteudo/Acervo/CELEG/Carometro/carometro_legislatura57.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    Carômetro Legislatura 57
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Camera className="w-6 h-6 text-pink-600" />
                <h3 className="text-lg font-semibold text-gray-900">Como Funciona</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                  <p>Acessa a página oficial dos deputados</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                  <p>Extrai fotos, nomes, partidos e estados</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                  <p>Organiza os dados em formato JSON</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                  <p>Permite download para uso no app</p>
                </div>
              </div>
            </div>

            {extractedDeputies.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Dados Extraídos
                </h3>
                <div className="text-sm text-green-700">
                  <p><strong>{extractedDeputies.length}</strong> deputados encontrados</p>
                  <p className="mt-2">
                    Agora você pode baixar o arquivo JSON e usar os dados no seu app!
                  </p>
                </div>
              </div>
            )}            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
