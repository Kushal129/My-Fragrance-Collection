import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, IndianRupee, X, Calculator, Sparkles } from 'lucide-react';
import { useState } from 'react';

const ComparePriceButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [result, setResult] = useState(null);

  const calculatePriceChange = () => {
    const old = parseFloat(oldPrice);
    const current = parseFloat(newPrice);
    
    if (isNaN(old) || isNaN(current) || old <= 0) return;
    
    const difference = current - old;
    const percentage = ((difference / old) * 100).toFixed(1);
    
    let recommendation = '';
    if (difference <= 0) {
      recommendation = 'Perfect time to buy! 🎉';
    } else if (difference / old < 0.1) {
      recommendation = 'Still a good deal! 👍';
    } else if (difference / old < 0.2) {
      recommendation = 'Consider carefully 🤔';
    } else {
      recommendation = 'Better to wait ⏳';
    }
    
    setResult({
      difference: Math.abs(difference).toFixed(0),
      percentage: Math.abs(percentage),
      isIncrease: difference > 0,
      recommendation
    });
  };

  const reset = () => {
    setOldPrice('');
    setNewPrice('');
    setResult(null);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 1.5, 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)"
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 
                 rounded-full shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60
                 transition-all duration-300 z-50 border border-cyan-400/30"
      >
        <Calculator className="w-6 h-6 text-white" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-slate-800/90 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">
                      Price Comparison
                    </h3>
                    <p className="text-slate-400 text-sm">Compare old vs new prices</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </motion.button>
              </div>

              {/* Input Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-slate-300 font-medium mb-2 flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4" />
                    <span>Old Price</span>
                  </label>
                  <input
                    type="number"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    placeholder="Enter previous price"
                    className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-200 
                             placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 
                             focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium mb-2 flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4" />
                    <span>New Price</span>
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Enter current price"
                    className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-200 
                             placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 
                             focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={calculatePriceChange}
                  disabled={!oldPrice || !newPrice}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl 
                           hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 
                           shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Compare
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={reset}
                  className="px-6 py-3 border border-slate-600/50 text-slate-300 rounded-xl 
                           hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300"
                >
                  Reset
                </motion.button>
              </div>

              {/* Results */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50"
                  >
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      {result.isIncrease ? (
                        <TrendingUp className="w-5 h-5 text-red-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-green-400" />
                      )}
                      <span className={`font-medium ${result.isIncrease ? 'text-red-400' : 'text-green-400'}`}>
                        {result.isIncrease ? 'Increased' : 'Decreased'} by {result.percentage}%
                      </span>
                    </div>
                    <div className="text-center mb-3">
                      <span className="text-slate-300">Difference: ₹{result.difference}</span>
                    </div>
                    <div className="text-center text-cyan-400 font-medium">
                      {result.recommendation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComparePriceButton;