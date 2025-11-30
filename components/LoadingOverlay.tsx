import React from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white transition-opacity duration-300">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-pink-500 opacity-20"></div>
        <div className="relative bg-gradient-to-tr from-pink-500 to-violet-500 p-6 rounded-full animate-bounce">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </div>
      <h3 className="mt-8 text-2xl font-bold animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-300">
        AI가 얼굴을 분석 중입니다...
      </h3>
      <p className="mt-2 text-gray-300 text-sm">
        에겐일까요? 테토일까요?
      </p>
    </div>
  );
};

export default LoadingOverlay;
