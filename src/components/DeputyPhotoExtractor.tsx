import React, { useState, useEffect } from 'react';
import { Users, Download, CheckCircle, AlertCircle, User } from 'lucide-react';

interface DeputyPhoto {
  filename: string;
  localPath: string;
}

interface ExtractionResult {
  success: boolean;
  deputado: string;
  filename?: string;
  localPath?: string;
  partido?: string;
  estado?: string;
  error?: string;
}

export default function DeputyPhotoExtractor() {
  const [existingPhotos, setExistingPhotos] = useState<DeputyPhoto[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [extractionResults, setExtractionResults] = useState<ExtractionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ fotosExistentes: 0 });

  useEffect(() => {
    checkExistingPhotos();
  }, []);

  const checkExistingPhotos = async () => {
    try {
      const response = await fetch('/api/extract-deputy-photos');
      const data = await response.json();
      
      if (data.success) {
        setExistingPhotos(data.fotos);
        setStats({ fotosExistentes: data.fotosExistentes });
      }
    } catch (error) {
      console.error('Erro ao verificar fotos existentes:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractPhotos = async () => {
    setExtracting(true);
    setExtractionResults([]);

    try {
      const response = await fetch('/api/extract-deputy-photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setExtractionResults(data.results);
        // Atualizar lista de fotos
        await checkExistingPhotos();
      } else {
        console.error('Erro na extração:', data.error);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setExtracting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Extração de Fotos dos Deputados
        </h2>
        <p className="text-gray-600">
          Extrair fotos dos deputados do PDF oficial da Câmara dos Deputados
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Fotos Existentes</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.fotosExistentes}</p>
        </div>
        
        {extractionResults.length > 0 && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Sucessos</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {extractionResults.filter(r => r.success).length}
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-900">Erros</span>
              </div>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {extractionResults.filter(r => !r.success).length}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mb-6">
        <button
          onClick={extractPhotos}
          disabled={extracting}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>{extracting ? 'Extraindo Fotos...' : 'Extrair Fotos do PDF'}</span>
        </button>
      </div>

      {extracting && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
            <span className="text-purple-700">Processando PDF e extraindo fotos dos deputados...</span>
          </div>
        </div>
      )}

      {/* Resultados da extração */}
      {extractionResults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados da Extração</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {extractionResults.map((result, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border text-sm ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{result.deputado}</span>
                    {result.partido && result.estado && (
                      <span className="text-gray-500 ml-2">({result.partido}/{result.estado})</span>
                    )}
                    {result.error && (
                      <p className="text-red-600 text-xs mt-1">Erro: {result.error}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {result.success ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview das fotos existentes */}
      {existingPhotos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fotos dos Deputados ({existingPhotos.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {existingPhotos.map((photo, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={photo.localPath}
                    alt={`Deputado ${photo.filename}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150x150/6366f1/ffffff?text=?';
                    }}
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-600 truncate" title={photo.filename}>
                    {photo.filename}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {existingPhotos.length === 0 && !extracting && (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma foto de deputado encontrada</p>
          <p className="text-sm text-gray-400">Clique em "Extrair Fotos do PDF" para começar</p>
        </div>
      )}
    </div>
  );
}
