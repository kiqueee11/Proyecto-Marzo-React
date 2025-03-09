import React, { useState } from 'react';
import { ApiMediaController } from '../../data/sources/remote/api/ApiFlashmeet';
 // Ajusta esta ruta según tu estructura de archivos

interface ImageData {
  url: string;
  blob: Blob;
  fileName: string;
}

const ImageDownloader = () => {
  const [fileName, setFileName] = useState('');
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  const handleDownload = async () => {
    if (!fileName.trim()) {
      setError('Por favor ingresa un nombre de archivo');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Utilizamos ApiMediaController en lugar de axios directamente
      const response = await ApiMediaController({
        method: 'POST',
        url: 'media/get-media', // Sin la barra inicial ya que está en baseURL
        params: { fileName },
        responseType: 'arraybuffer'
      });
      
      // Convertimos los datos binarios a un objeto URL para mostrar la imagen
      const blob = new Blob([response.data as ArrayBuffer], { 
        type: response.headers['content-type'] || 'image/jpeg' 
      });
      const imageUrl = URL.createObjectURL(blob);
      
      setImageData({
        url: imageUrl,
        blob: blob,
        fileName: fileName
      });
      setLoading(false);
    } catch (err) {
      console.error('Error al descargar la imagen:', err);
      let errorMessage = 'Error al descargar la imagen';
      if (err instanceof Error && err.message) {
        errorMessage += `: ${err.message}`;
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleSaveImage = () => {
    if (!imageData) return;
    
    // Creamos un enlace para descargar la imagen
    const downloadLink = document.createElement('a');
    downloadLink.href = imageData.url;
    downloadLink.download = imageData.fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="p-4 border rounded-md shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Descargador de Imágenes</h2>
      
      <div className="mb-4">
        <label htmlFor="fileName" className="block text-sm font-medium mb-1">
          Nombre del archivo:
        </label>
        <input
          type="text"
          id="fileName"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Ingresa el nombre del archivo"
        />
      </div>
      
      <button
        onClick={handleDownload}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Descargando...' : 'Descargar Imagen'}
      </button>
      
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      {imageData && (
        <div className="mt-4">
          <div className="mb-2">
            <img 
              src={imageData.url} 
              alt="Imagen descargada" 
              className="max-w-full h-auto rounded-md" 
            />
          </div>
          <button
            onClick={handleSaveImage}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Guardar Imagen
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageDownloader;