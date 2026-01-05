import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoadingScreen from './components/LoadingScreen.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <Routes>
        {isLoading && <Route path="/" element={<LoadingScreen onComplete={handleLoadingComplete} />} />}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
