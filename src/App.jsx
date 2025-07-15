import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Home from './pages/Home';
import ComparePriceButton from './components/ComparePriceButton';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
        <ComparePriceButton />
      </div>
    </Router>
  );
}

export default App;