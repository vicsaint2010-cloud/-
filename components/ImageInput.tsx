import React, { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface Props {
  onImageSelected: (base64: string) => void;
}

const ImageInput: React.FC<Props> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div 
        className={`relative group cursor-pointer transition-all duration-300 ease-in-out
          border-3 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center
          bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl
          ${dragActive ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-violet-400'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-tr from-violet-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-10 h-10 text-violet-500" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">사진 업로드</h3>
        <p className="text-gray-500 text-center text-sm mb-6">
          얼굴이 잘 나온 사진을 선택하거나<br/>여기로 끌어다 놓으세요
        </p>

        <div className="flex gap-3 w-full">
           <button 
            type="button"
            className="flex-1 py-3 px-4 rounded-xl bg-gray-900 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            <ImageIcon className="w-4 h-4" />
            갤러리 선택
          </button>
          
          {/* Mobile Camera Access directly via input capture attribute */}
           <button 
            type="button"
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Trigger file input but specifically for camera on mobile if possible
              if(fileInputRef.current) {
                  fileInputRef.current.accept = "image/*";
                  fileInputRef.current.setAttribute("capture", "user");
                  fileInputRef.current.click();
                  // Reset after click so normal upload works next time
                  setTimeout(() => fileInputRef.current?.removeAttribute("capture"), 1000);
              }
            }}
          >
            <Camera className="w-4 h-4" />
            카메라 촬영
          </button>
        </div>

        <input 
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      
      <p className="mt-6 text-center text-xs text-white/70 font-medium bg-black/20 py-2 px-4 rounded-full mx-auto w-fit backdrop-blur-sm">
        🔒 사진은 서버에 저장되지 않고 분석 후 즉시 삭제됩니다.
      </p>
    </div>
  );
};

export default ImageInput;
