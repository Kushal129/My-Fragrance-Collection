import React, { useState } from 'react';

const PerfumeCard = ({ perfume, onView, viewMode = 'grid' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (viewMode === 'list') {
    return (
      <div 
        className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-black hover:shadow-lg cursor-pointer"
        onClick={() => onView(perfume)}
      >
        <div className="flex flex-col sm:flex-row p-6">
          <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 mb-4 sm:mb-0">
            {!imageLoaded && (
              <div className="w-full h-full bg-gray-100 animate-pulse"></div>
            )}
            <img
              src={perfume.image}
              alt={perfume.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="flex-1 sm:ml-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 pr-4">
                      {perfume.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        {perfume.brand}
                      </span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {perfume.volume}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
                    ₹{parseInt(perfume.price).toLocaleString()}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {perfume.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-black hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => onView(perfume)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
        )}
        <img
          src={perfume.image}
          alt={perfume.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Brand Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-medium">
            {perfume.brand}
          </span>
        </div>

        {/* Volume Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {perfume.volume}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {perfume.name}
        </h3>
        
        <div className="flex justify-center">
          <span className="text-xl font-bold text-gray-900">
            ₹{parseInt(perfume.price).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerfumeCard;