// ImageDownloadResults: displays download results and local image previews
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

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

interface ImageDownloadResultsProps {
  downloadResults: DownloadResult[];
  imageStatus: ImageStatus[];
  formatFileSize: (bytes: number) => string;
}

export function ImageDownloadResults({
  downloadResults,
  imageStatus,
  formatFileSize,
}: ImageDownloadResultsProps) {
  return (
    <>
      {downloadResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados do Download</h3>
          <div className="space-y-3">
            {downloadResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{result.description}</p>
                    <p className="text-sm text-gray-600">{result.filename}</p>
                    {result.error && (
                      <p className="text-sm text-red-600 mt-1">Erro: {result.error}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {result.success ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto mb-1" />
                        {result.size && (
                          <p className="text-sm text-green-600">{formatFileSize(result.size)}</p>
                        )}
                      </>
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {imageStatus.some(img => img.exists) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview das Imagens Locais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imageStatus
              .filter(img => img.exists && img.localPath)
              .map((image, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.localPath!}
                    alt={image.description}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900">{image.description}</p>
                    <p className="text-xs text-gray-500">{image.localPath}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
