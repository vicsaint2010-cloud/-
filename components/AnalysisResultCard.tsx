import React from 'react';
import { AnalysisResult, FaceType } from '../types';
import { RefreshCw, Share2, Award, Scissors, User } from 'lucide-react';

interface Props {
  result: AnalysisResult;
  onRetry: () => void;
}

const AnalysisResultCard: React.FC<Props> = ({ result, onRetry }) => {
  const isEggen = result.type === FaceType.EGGEN;
  
  // Dynamic styles based on type
  const gradient = isEggen 
    ? 'from-yellow-100 to-orange-100 border-orange-200' 
    : 'from-blue-100 to-indigo-100 border-indigo-200';
  
  const accentColor = isEggen ? 'text-orange-600' : 'text-indigo-600';
  const bgAccent = isEggen ? 'bg-orange-500' : 'bg-indigo-500';
  const progressColor = isEggen ? 'bg-orange-400' : 'bg-indigo-400';

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className={`relative overflow-hidden bg-white rounded-3xl shadow-2xl border-4 ${isEggen ? 'border-orange-100' : 'border-indigo-100'}`}>
        
        {/* Header Section */}
        <div className={`p-8 bg-gradient-to-br ${gradient} text-center relative`}>
          <div className="absolute top-4 right-4 bg-white/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-500 tracking-wider uppercase">
            {result.type} TYPE
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-gray-800">
            {result.title}
          </h2>
          <p className={`text-lg font-medium ${accentColor} opacity-90`}>
             당신은 {result.percentage}% <span className="font-bold">{isEggen ? '에겐' : '테토'}</span> 입니다
          </p>

          {/* Type Visualizer Bar */}
          <div className="mt-6 flex items-center justify-center gap-4 text-sm font-bold text-gray-600">
            <span>🥚 에겐</span>
            <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden relative">
              <div 
                className={`absolute top-0 bottom-0 ${progressColor} transition-all duration-1000 ease-out`}
                style={{ 
                  left: isEggen ? 0 : 'auto',
                  right: isEggen ? 'auto' : 0,
                  width: `${result.percentage}%` 
                }}
              />
            </div>
            <span>🗿 테토</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          
          {/* Description */}
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <p className="text-center">{result.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Styling Tips */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className={`flex items-center gap-2 mb-4 ${accentColor}`}>
                <Scissors className="w-5 h-5" />
                <h3 className="font-bold text-lg">스타일링 팁</h3>
              </div>
              <ul className="space-y-2">
                {result.stylingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${bgAccent} flex-shrink-0`} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Celebs */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className={`flex items-center gap-2 mb-4 ${accentColor}`}>
                <User className="w-5 h-5" />
                <h3 className="font-bold text-lg">닮은꼴 연예인</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.celebrityLookalikes.map((celeb, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm">
                    {celeb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4 justify-center">
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <RefreshCw className="w-5 h-5" />
            다시 하기
          </button>
          <button 
             onClick={() => alert("스크린샷을 찍어서 공유해보세요!")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg shadow-gray-200 transition-all transform hover:scale-105 ${bgAccent}`}
          >
            <Share2 className="w-5 h-5" />
            결과 공유하기
          </button>
        </div>

      </div>
    </div>
  );
};

export default AnalysisResultCard;
