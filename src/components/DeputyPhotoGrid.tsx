// DeputyPhotoGrid: displays a grid of deputy photos with fallback handling
import React from 'react';
import { User } from 'lucide-react';

interface DeputyPhoto {
  filename: string;
  localPath: string;
}

interface DeputyPhotoGridProps {
  photos: DeputyPhoto[];
  isExtracting: boolean;
}

export function DeputyPhotoGrid({ photos, isExtracting }: DeputyPhotoGridProps) {
  if (photos.length === 0 && !isExtracting) {
    return (
      <div className="text-center py-8">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Nenhuma foto de deputado encontrada</p>
        <p className="text-sm text-gray-400">Clique em "Extrair Fotos do PDF" para começar</p>
      </div>
    );
  }

  if (photos.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Fotos dos Deputados ({photos.length})
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="aspect-square">
              <img
                src={photo.localPath}
                alt={`Deputado ${photo.filename}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://via.placeholder.com/150x150/6366f1/ffffff?text=?';
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
  );
}
