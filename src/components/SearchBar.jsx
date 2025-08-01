import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mb-12 px-4"
    >
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your collection..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-16 py-4 bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
              showFilters || hasActiveFilters
                ? 'bg-primary-500 text-white' 
                : 'bg-dark-700/50 text-gray-400 hover:bg-dark-600/50'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilters({...filters, category})}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filters.category === category 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'bg-dark-800/50 text-gray-300 hover:bg-dark-700/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-dark-700/50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <label className="text-white font-medium mb-3 block">Price Range</label>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setFilters({
                          ...filters, 
                          priceRange: { min: range.min, max: range.max }
                        })}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          filters.priceRange.min === range.min && filters.priceRange.max === range.max
                            ? 'bg-primary-500/20 border border-primary-500/50 text-primary-300' 
                            : 'bg-dark-700/30 text-gray-300 hover:bg-dark-600/50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-white font-medium mb-3 block">Sort By</label>
                  <div className="relative">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                      className="w-full p-3 bg-dark-700/50 border border-dark-600/50 rounded-lg text-white focus:outline-none focus:border-primary-500 appearance-none cursor-pointer"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-dark-800">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    onFilter(filters);
                    setShowFilters(false);
                  }}
                  className="btn-primary flex-1"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="btn-secondary"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;