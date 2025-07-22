import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, TrendingUp, BarChart3, Crown, Star } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CollectionSection from '../components/CollectionSection';
import StatsCard from '../components/StatsCard';
import { perfumes, attars } from '../data.js';

const filterAndSortItems = (items, searchTerm, filters) => {
  let filtered = items.filter(item => {
    const matchesSearch = !searchTerm ||
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPrice = (!filters.priceRange.min || !item.price || parseFloat(item.price.replace(/,/g, '')) >= parseFloat(filters.priceRange.min)) &&
      (!filters.priceRange.max || !item.price || parseFloat(item.price.replace(/,/g, '')) <= parseFloat(filters.priceRange.max));
    return matchesSearch && matchesPrice;
  });

  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return (parseFloat(a.price?.replace(/,/g, '') || 0)) - (parseFloat(b.price?.replace(/,/g, '') || 0));
      case 'price-high':
        return (parseFloat(b.price?.replace(/,/g, '') || 0)) - (parseFloat(a.price?.replace(/,/g, '') || 0));
      case 'name':
      default:
        return (a.name || '').localeCompare(b.name || '');
    }
  });

  return filtered;
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: { min: '', max: '' },
    sortBy: 'name'
  });
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const [filteredAttars, setFilteredAttars] = useState([]);

  useEffect(() => {
    const allPerfumes = filterAndSortItems(perfumes, searchTerm, filters);
    const allAttars = filterAndSortItems(attars, searchTerm, filters);

    if (filters.category === 'All') {
      setFilteredPerfumes(allPerfumes);
      setFilteredAttars(allAttars);
    } else if (filters.category === 'Perfume') {
      setFilteredPerfumes(allPerfumes);
      setFilteredAttars([]);
    } else if (filters.category === 'Attar') {
      setFilteredPerfumes([]);
      setFilteredAttars(allAttars);
    }
  }, [searchTerm, filters]);

  const totalItems = filteredPerfumes.length + filteredAttars.length;
  const totalValue = [...filteredPerfumes, ...filteredAttars].reduce((sum, item) => 
    sum + (parseFloat(item.price?.replace(/,/g, '')) || 0), 0);

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative pt-20 pb-16 px-4 text-center"
      >
        <div className="max-w-6xl mx-auto">
          {/* Logo/Icon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div 
              className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-6 
                       border border-white/20 hover:border-blue-400/50 transition-all duration-500"
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
              }}
              transition={{ duration: 0.6 }}
            >
              <Crown className="w-10 h-10 text-blue-400" />
            </motion.div>
          </motion.div>
            
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 leading-tight">
              My Fragrance
              <motion.span 
                className="block text-4xl md:text-6xl text-gray-400 font-normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Collection
              </motion.span>
            </h1>
          </motion.div>
            
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            A personal collection of luxury fragrances and traditional attars. 
            Each scent represents a moment in my olfactory journey.
          </motion.p>

          {/* Decorative Elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center space-x-4"
          >
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 1.4 }}
            />
          </motion.div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4">
        {/* Search Section */}
        <SearchBar
          onSearch={setSearchTerm}
          onFilter={setFilters}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <StatsCard
            value={filteredPerfumes.length}
            label="Perfumes"
            icon={<Package className="w-8 h-8 text-blue-400" />}
            index={0}
          />
          <StatsCard
            value={filteredAttars.length}
            label="Attars"
            icon={<Sparkles className="w-8 h-8 text-purple-400" />}
            index={1}
          />
          <StatsCard
            value={totalItems}
            label="Total Items"
            icon={<BarChart3 className="w-8 h-8 text-cyan-400" />}
            index={2}
          />
          <StatsCard
            value={`₹${(totalValue / 1000).toFixed(1)}K`}
            label="Collection Value"
            icon={<TrendingUp className="w-8 h-8 text-green-400" />}
            index={3}
          />
        </motion.div>

        {/* Collections */}
        {(filters.category === 'All' || filters.category === 'Perfume') && (
          <CollectionSection
            title="Perfume Collection"
            items={filteredPerfumes}
            category="Perfume"
          />
        )}
        
        {(filters.category === 'All' || filters.category === 'Attar') && (
          <CollectionSection
            title="Attar Collection"
            items={filteredAttars}
            category="Attar"
          />
        )}

        {/* Empty State */}
        <AnimatePresence>
          {totalItems === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="glass-dark p-16 rounded-3xl border border-white/10 max-w-lg mx-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20"
                >
                  <Package className="w-10 h-10 text-gray-400" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  No fragrances found
                </h3>
                <p className="text-gray-400 mb-8">
                  Try adjusting your search or filter criteria
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      category: 'All',
                      priceRange: { min: '', max: '' },
                      sortBy: 'name'
                    });
                  }}
                  className="px-8 py-4 btn-primary text-white font-medium rounded-xl"
                >
                  Clear All Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-16"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
            <Star className="w-4 h-4" />
            <span>Personal Collection • Updated January 2025</span>
            <Star className="w-4 h-4" />
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;