import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-light text-black leading-none">404</h1>
          <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The fragrance you're looking for seems to have evaporated. 
            Let's get you back to the collection.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-black text-white py-4 rounded-xl hover:bg-black/90 transition-colors duration-300 flex items-center justify-center gap-3 font-medium text-lg"
          >
            <Home className="w-5 h-5" />
            Return to Collection
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-3 font-medium text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 text-gray-300">
          <div className="text-6xl mb-4">🌸</div>
          <p className="text-sm">Lost in the scent trails</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;