import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CollectionSection from '../components/CollectionSection';
import StatsCard from '../components/StatsCard';
import { perfumes, attars } from '../data.js';

const filterAndSortItems = (items, searchTerm, filters) => {
  let filtered = items.filter(item => {
    const matchesSearch = !searchTerm ||
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4">
        {/* Search */}
        <SearchBar
          onSearch={setSearchTerm}
          onFilter={setFilters}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          <StatsCard
            value={filteredPerfumes.length}
            label="Perfumes"
            icon={<Package className="w-6 h-6 text-primary-400" />}
            index={0}
          />
          <StatsCard
            value={filteredAttars.length}
            label="Attars"
            icon={<Sparkles className="w-6 h-6 text-purple-400" />}
            index={1}
          />
          <StatsCard
            value={totalItems}
            label="Total Items"
            icon={<BarChart3 className="w-6 h-6 text-cyan-400" />}
            index={2}
          />
          <StatsCard
            value={`₹${(totalValue / 1000).toFixed(1)}K`}
            label="Collection Value"
            icon={<TrendingUp className="w-6 h-6 text-green-400" />}
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
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="card max-w-lg mx-auto">
                <div className="w-20 h-20 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-primary-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  No fragrances found
                </h3>
                <p className="text-gray-400 mb-8">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      category: 'All',
                      priceRange: { min: '', max: '' },
                      sortBy: 'name'
                    });
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer */}
        <footer className="text-center py-12">
          <div className="text-gray-500 text-sm">
            Personal Collection •  Made with <span className="text-red-500">♥</span> KHP
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;