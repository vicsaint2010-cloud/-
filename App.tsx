import React, { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';
import ImageInput from './components/ImageInput';
import AnalysisResultCard from './components/AnalysisResultCard';
import LoadingOverlay from './components/LoadingOverlay';
import { analyzeFaceImage } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (base64: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await analyzeFaceImage(base64);
      setResult(data);
    } catch (err: any) {
      setError(err.message || '분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center">
      <LoadingOverlay isVisible={loading} />
      
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center text-white z-10">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <span>EggenVsTeto</span>
        </div>
        <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
          <Info className="w-6 h-6" />
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl px-4 pb-20 flex flex-col items-center justify-center">
        
        {!result && (
          <div className="text-center mb-12 animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg leading-tight">
              <span className="text-yellow-300">에겐</span> vs <span className="text-blue-300">테토</span>
            </h1>
            <p className="text-xl text-white/90 font-medium max-w-xl mx-auto leading-relaxed">
              내 얼굴은 매끈한 달걀형일까요? 아니면 엣지있는 테토형일까요? <br/>
              지금 바로 AI에게 물어보세요!
            </p>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-500/20 backdrop-blur border border-red-200 text-white rounded-xl flex items-center gap-3">
             <Info className="w-5 h-5" />
             {error}
             <button onClick={() => setError(null)} className="underline ml-auto text-sm">닫기</button>
          </div>
        )}

        {!result ? (
          <ImageInput onImageSelected={handleImageSelected} />
        ) : (
          <AnalysisResultCard result={result} onRetry={reset} />
        )}

      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-white/40 text-sm">
        <p>© 2024 Eggen vs Teto AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
