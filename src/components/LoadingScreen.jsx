import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center w-full max-w-sm px-6">
        {/* Brand Heading */}
        <h1 className="text-3xl font-light tracking-[0.25em] text-white mb-10">
          WELCOME TO PERFUME's WORLD
        </h1>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-gray-200/80 overflow-hidden mb-6">
          <div
            className="h-full bg-white transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="text-xs tracking-widest text-gray-200">
          LOADING {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
