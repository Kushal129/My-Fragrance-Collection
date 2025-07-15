import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Filter } from 'lucide-react';
import { useState } from 'react';

const SearchBar = ({ onSearch, onFilter, filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Perfume', 'Attar'];
  const priceRanges = [
    { label: 'All Prices', min: '', max: '' },
    { label: 'Under ₹1,000', min: '', max: '1000' },
    { label: '₹1,000 - ₹3,000', min: '1000', max: '3000' },
    { label: '₹3,000 - ₹5,000', min: '3000', max: '5000' },
    { label: 'Above ₹5,000', min: '5000', max: '' }
  ];

  const handlePriceRangeSelect = (range) => {
    setFilters({
      ...filters,
      priceRange: { min: range.min, max: range.max }
    });
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      priceRange: { min: '', max: '' },
      sortBy: 'name'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 
                           group-focus-within:text-cyan-400 transition-colors duration-300" />
          <input
            type="text"
            placeholder="Search fragrances by name or notes..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-16 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 
                     rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 
                     focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-lg
                     hover:border-slate-600/50 hover:bg-slate-800/70"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2.5 rounded-xl 
                     bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300 border border-slate-600/50
                     hover:border-slate-500/50"
          >
            <SlidersHorizontal className="w-5 h-5 text-slate-300" />
          </motion.button>
        </div>
      </div>

      {/* Quick Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilters({...filters, category})}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm
                       ${filters.category === category 
                         ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                         : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-700/50'
                       }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-slate-200">Advanced Filters</h3>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range Quick Select */}
                <div>
                  <label className="text-slate-300 font-medium mb-3 block">Price Range</label>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ x: 4 }}
                        onClick={() => handlePriceRangeSelect(range)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 text-sm
                                   ${filters.priceRange.min === range.min && filters.priceRange.max === range.max
                                     ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300' 
                                     : 'bg-slate-800/50 border border-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600/50'
                                   }`}
                      >
                        {range.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Price Range & Sort */}
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 font-medium mb-3 block">Custom Price Range</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min}
                        onChange={(e) => setFilters({
                          ...filters, 
                          priceRange: {...filters.priceRange, min: e.target.value}
                        })}
                        className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 
                                 placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 
                                 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max}
                        onChange={(e) => setFilters({
                          ...filters, 
                          priceRange: {...filters.priceRange, max: e.target.value}
                        })}
                        className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 
                                 placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 
                                 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-medium mb-3 block">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                      className="w-full p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 
                               focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 
                               transition-all duration-300"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onFilter(filters);
                    setShowFilters(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl 
                           hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                >
                  Apply Filters
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearFilters}
                  className="px-8 py-3 border border-slate-600/50 text-slate-300 rounded-xl 
                           hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300"
                >
                  Clear
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;