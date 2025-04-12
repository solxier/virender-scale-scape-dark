
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const increment = 10;
    const maxProgress = 100;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, maxProgress));
      
      if (currentProgress >= maxProgress && videoLoaded) {
        clearInterval(timer);
        setTimeout(() => {
          onLoadingComplete();
        }, 1000);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [videoLoaded, onLoadingComplete]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <video 
        src="https://cdn.pixabay.com/video/2017/12/05/13232-246463976_large.mp4"
        autoPlay 
        muted 
        loop
        onLoadedData={handleVideoLoaded}
        className="absolute inset-0 object-cover w-full h-full opacity-40"
      />
      
      <div className="z-10 flex flex-col items-center gap-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-gradient">VIRENDER</h1>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full bg-white transition-all duration-300 ease-out",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/70 text-sm">Loading your experience... {progress}%</p>
      </div>
    </div>
  );
};

export default Loader;
