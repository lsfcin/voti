// ImageDownloader: admin UI for triggering bulk deputy image downloads and showing status
import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertCircle, Image } from 'lucide-react';
import { ImageDownloadResults } from './ImageDownloadResults';

export { ImageDownloadResults } from './ImageDownloadResults';

interface ImageStatus {
  filename: string;
  description: string;
  exists: boolean;
  localPath: string | null;
}

interface DownloadResult {
  success: boolean;
  filename: string;
  description: string;
  localPath?: string;
  size?: number;
  error?: string;
}

export default function ImageDownloader() {
  const [imageStatus, setImageStatus] = useState<ImageStatus[]>([]);
  const [downloading, setDownloading] = useState(false);
  const [downloadResults, setDownloadResults] = useState<DownloadResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkImageStatus();
  }, []);

  const checkImageStatus = async () => {
    try {
      const response = await fetch('/api/download-images');
      const data = await response.json();
      if (data.success) {
        setImageStatus(data.images);
      }
    } catch (error) {
      console.error('Erro ao verificar status das imagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImages = async () => {
    setDownloading(true);
    setDownloadResults([]);
    try {
      const response = await fetch('/api/download-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageType: 'legislative' }),
      });
      const data = await response.json();
      if (data.success) {
        setDownloadResults(data.results);
        await checkImageStatus();
      }
    } catch (error) {
      console.error('Erro no download:', error);
    } finally {
      setDownloading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / 1048576) + ' MB';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Download de Imagens</h2>
        <p className="text-gray-600">
          Baixar imagens oficiais das casas legislativas para uso local
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={downloadImages}
          disabled={downloading}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>{downloading ? 'Baixando...' : 'Baixar Imagens'}</span>
        </button>
      </div>

      {downloading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-700">Fazendo download das imagens...</span>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status das Imagens</h3>
        <div className="space-y-3">
          {imageStatus.map((image, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Image className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">{image.description}</p>
                  <p className="text-sm text-gray-500">{image.filename}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {image.exists ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600">Disponível</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-red-600">Não encontrada</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageDownloadResults
        downloadResults={downloadResults}
        imageStatus={imageStatus}
        formatFileSize={formatFileSize}
      />
    </div>
  );
}
