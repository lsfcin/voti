import React, { useState } from 'react';
import { Download, User, MapPin, Users } from 'lucide-react';

interface Deputy {
  id: string;
  name: string;
  party: string;
  state: string;
  photoUrl: string;
}

interface DeputyScrapingProps {
  onDeputiesExtracted?: (deputies: Deputy[]) => void;
}

export default function DeputyScraping({ onDeputiesExtracted }: DeputyScrapingProps) {
  const [deputies, setDeputies] = useState<Deputy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const extractDeputies = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/scrape-deputies');
      const data = await response.json();

      if (data.success) {
        setDeputies(data.deputies);
        setSuccessMessage(data.message);
        if (onDeputiesExtracted) {
          onDeputiesExtracted(data.deputies);
        }
      } else {
        setError(data.error || 'Erro ao extrair deputados');
      }
    } catch (err) {
      setError('Erro de conexão ao extrair deputados');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(deputies, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deputados_extraidos.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Extração de Fotos dos Deputados
        </h2>
        <p className="text-gray-600">
          Extrair fotos e informações dos deputados diretamente do site oficial da Câmara
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={extractDeputies}
          disabled={loading}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
        >
          <User className="w-5 h-5" />
          <span>{loading ? 'Extraindo...' : 'Extrair Deputados'}</span>
        </button>

        {deputies.length > 0 && (
          <button
            onClick={downloadJSON}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Baixar JSON</span>
          </button>
        )}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Extraindo informações dos deputados...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 font-medium">Erro:</p>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-600 font-medium">Sucesso!</p>
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      {deputies.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Deputados Extraídos ({deputies.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {deputies.map((deputy, index) => (
              <div key={deputy.id || index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-gray-200">
                    {deputy.photoUrl ? (
                      <img
                        src={deputy.photoUrl}
                        alt={deputy.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/64x64/6366f1/ffffff?text=?';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                    {deputy.name}
                  </h4>
                  
                  <div className="space-y-1 text-xs text-gray-600">
                    {deputy.party && deputy.party !== 'N/I' && (
                      <div className="flex items-center justify-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{deputy.party}</span>
                      </div>
                    )}
                    
                    {deputy.state && deputy.state !== 'N/I' && (
                      <div className="flex items-center justify-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{deputy.state}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
