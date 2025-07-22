import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Sparkles, Filter } from 'lucide-react';

const SearchBar = ({ onSearch, onFilter, filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const categories = ['All', 'Perfume', 'Attar'];
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' }
  ];

  const priceRanges = [
    { label: 'All Prices', min: '', max: '' },
    { label: 'Under ₹1,000', min: '', max: '1000' },
    { label: '₹1,000 - ₹5,000', min: '1000', max: '5000' },
    { label: '₹5,000 - ₹10,000', min: '5000', max: '10000' },
    { label: 'Above ₹10,000', min: '10000', max: '' }
  ];

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

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
    setSearchValue('');
    onSearch('');
  };

  const hasActiveFilters = filters.category !== 'All' || 
                          filters.priceRange.min !== '' || 
                          filters.priceRange.max !== '' || 
                          searchValue !== '';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto mb-16 px-4"
    >
      {/* Main Search Container */}
      <div className="relative mb-8">
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 
                             group-hover:text-blue-400 transition-all duration-300 z-10" />
            
            <motion.input
              type="text"
              placeholder="Search your fragrance collection..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-16 pr-20 py-5 bg-gray-900/50 backdrop-blur-xl border-2 border-gray-800/50 
                       rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 
                       focus:ring-4 focus:ring-blue-500/10 transition-all duration-500 text-lg font-medium
                       hover:border-gray-700/50 hover:bg-gray-900/70 shadow-2xl shadow-black/20"
              whileFocus={{ scale: 1.01 }}
            />

            {/* Filter Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-xl 
                       transition-all duration-300 border-2 shadow-lg ${
                         showFilters 
                           ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                           : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:bg-gray-700/50 hover:border-gray-600/50'
                       }`}
            >
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </motion.div>
            </motion.button>

            {/* Active Filters Indicator */}
            {hasActiveFilters && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Category Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilters({...filters, category})}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-400 text-base
                       relative overflow-hidden group border-2 ${
                         filters.category === category 
                           ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl shadow-blue-500/25 border-blue-400/50' 
                           : 'bg-gray-900/50 text-gray-300 border-gray-700/50 hover:bg-gray-800/70 hover:border-gray-600/50 hover:text-white'
                       }`}
          >
            <span className="relative z-10">{category}</span>
            {filters.category !== category && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -30 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="bg-gray-900/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-800/50 shadow-2xl shadow-black/40">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                    <Filter className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Advanced Filters</h3>
                    <p className="text-gray-400 text-sm">Refine your collection search</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFilters(false)}
                  className="p-3 hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-gray-700/50"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Price Range Quick Select */}
                <div>
                  <label className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span>Price Range</span>
                  </label>
                  <div className="space-y-3">
                    {priceRanges.map((range, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePriceRangeSelect(range)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 text-sm font-medium border-2
                                   ${filters.priceRange.min === range.min && filters.priceRange.max === range.max
                                     ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-white' 
                                     : 'bg-gray-800/30 text-gray-300 border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800/50'
                                   }`}
                      >
                        {range.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Range & Sort */}
                <div className="space-y-6">
                  {/* Custom Price Range */}
                  <div>
                    <label className="text-white font-semibold mb-4 block">Custom Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="number"
                        placeholder="Min Price"
                        value={filters.priceRange.min}
                        onChange={(e) => setFilters({
                          ...filters, 
                          priceRange: {...filters.priceRange, min: e.target.value}
                        })}
                        className="p-4 bg-gray-800/50 border-2 border-gray-700/50 rounded-xl text-white 
                                 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 
                                 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium"
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="number"
                        placeholder="Max Price"
                        value={filters.priceRange.max}
                        onChange={(e) => setFilters({
                          ...filters, 
                          priceRange: {...filters.priceRange, max: e.target.value}
                        })}
                        className="p-4 bg-gray-800/50 border-2 border-gray-700/50 rounded-xl text-white 
                                 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 
                                 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium"
                      />
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-white font-semibold mb-4 block">Sort By</label>
                    <div className="relative">
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                        className="w-full p-4 bg-gray-800/50 border-2 border-gray-700/50 rounded-xl text-white 
                                 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 
                                 transition-all duration-300 font-medium appearance-none cursor-pointer"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onFilter(filters);
                    setShowFilters(false);
                  }}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl 
                           hover:from-blue-600 hover:to-purple-600 transition-all duration-300 
                           shadow-xl shadow-blue-500/25 text-lg"
                >
                  Apply Filters
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearFilters}
                  className="px-8 py-4 border-2 border-gray-600/50 text-gray-300 rounded-xl font-semibold
                           hover:bg-gray-800/50 hover:border-gray-500/50 hover:text-white transition-all duration-300
                           text-lg"
                >
                  Clear All
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
