import React, { useState, useRef } from 'react';
import { Stethoscope } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';
import ResultCard from './components/ResultCard';
import { analyzeLesion } from './services/apiService';

function App() {
  const [step, setStep] = useState('upload'); // 'upload', 'loading', 'result'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const abortControllerRef = useRef(null);

  const handleImageSelect = async (file, previewUrl, clinicalData) => {
    setImageFile(file);
    setImagePreview(previewUrl);
    setStep('loading');

    abortControllerRef.current = new AbortController();

    try {
      // Call our API service
      const analysisResult = await analyzeLesion(file, clinicalData, abortControllerRef.current.signal);
      setResult(analysisResult);
      setStep('result');
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Análisis cancelado por el usuario');
        setStep('upload');
        return;
      }
      console.error('Error analyzing image:', error);
      alert('Hubo un error al analizar la imagen. Por favor intenta nuevamente.');
      setStep('upload');
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleCancelAnalysis = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setStep('upload');
  };

  const resetAnalysis = () => {
    setStep('upload');
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
  };

  return (
    <div className="container">
      <header className="mb-8 w-full text-center">
        <div className="flex justify-center items-center gap-3 mb-2" style={{ display: 'flex', justifyContent: 'center' }}>
          <Stethoscope size={36} color="var(--color-primary)" />
          <h1 className="title">DermaXai</h1>
        </div>
        <p className="subtitle">
          Análisis dermatológico impulsado por Inteligencia Artificial
        </p>
      </header>

      <main className="w-full" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: step === 'upload' ? 'block' : 'none', width: '100%' }}>
          <ImageUploader onImageSelect={handleImageSelect} />
        </div>

        {step === 'loading' && (
          <Loader onCancel={handleCancelAnalysis} />
        )}

        {step === 'result' && (
          <ResultCard
            result={result}
            image={imagePreview}
            onReset={resetAnalysis}
          />
        )}
      </main>

      <footer style={{ marginTop: 'auto', padding: '2rem 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
        &copy; {new Date().getFullYear()} DermaXai. Solo para fines demostrativos y educativos. <br /> Proyecto realizado por Jesús Márquez Mora y Roberto Alonso Herraiz.
      </footer>
    </div>
  );
}

export default App;
