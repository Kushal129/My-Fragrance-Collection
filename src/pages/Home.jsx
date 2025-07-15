import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import CollectionSection from '../components/CollectionSection';
import { Sparkles, Star, Heart, Crown, TrendingUp, Package } from 'lucide-react';
import { perfumes, attars } from '../data.js';

const filterAndSortItems = (items, searchTerm, filters) => {
    let filtered = items.filter(item => {
        const matchesSearch = !searchTerm ||
            (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesPrice = (!filters.priceRange.min || !item.price || parseFloat(item.price) >= parseFloat(filters.priceRange.min)) &&
            (!filters.priceRange.max || !item.price || parseFloat(item.price) <= parseFloat(filters.priceRange.max));
        return matchesSearch && matchesPrice;
    });

    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'price-low':
                return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
            case 'price-high':
                return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
            case 'name':
            default:
                return (a.name || '').localeCompare(b.name || '');
        }
    });

    return filtered;
};

const StatCard = ({ value, label, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 
             transition-all duration-300 group"
    >
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                {icon}
            </div>
            <div>
                <div className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
                    {value}
                </div>
                <div className="text-slate-400 text-sm">{label}</div>
            </div>
        </div>
    </motion.div>
);

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
    const totalValue = [...filteredPerfumes, ...filteredAttars].reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

    return (
        <div className="min-h-screen">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="floating-gradient w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 top-20 -left-20" />
                <div className="floating-gradient w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 top-40 -right-20"
                    style={{ animationDelay: '2s' }} />
                <div className="floating-gradient w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 bottom-20 left-1/4"
                    style={{ animationDelay: '4s' }} />
            </div>

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center p-2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text text-shadow mb-6">
                            Fragrance Collection
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Explore a curated collection of premium perfumes and traditional attars,
                            each telling its own unique story of luxury and elegance.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 relative">
                {/* Search Bar */}
                <SearchBar
                    onSearch={setSearchTerm}
                    onFilter={setFilters}
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 justify-center max-w-md mx-auto">
                    <StatCard
                        value={filteredPerfumes.length}
                        label="Perfumes"
                        icon={<Crown className="w-6 h-6 text-cyan-400" />}
                        delay={0.1}
                    />
                    <StatCard
                        value={filteredAttars.length}
                        label="Attars"
                        icon={<Sparkles className="w-6 h-6 text-purple-400" />}
                        delay={0.2}
                    />
                </div>

                {/* Collections */}
                {(filters.category === 'All' || filters.category === 'Perfume') && (
                    <CollectionSection
                        title="Premium Perfumes"
                        items={filteredPerfumes}
                        category="Perfume"
                    />
                )}
                {(filters.category === 'All' || filters.category === 'Attar') && (
                    <CollectionSection
                        title="Traditional Attars"
                        items={filteredAttars}
                        category="Attar"
                    />
                )}

                {/* Empty State */}
                {totalItems === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-20"
                    >
                        <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-6" />
                        <h3 className="text-2xl font-display font-semibold text-slate-300 mb-4">
                            No fragrances found
                        </h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            Try adjusting your search terms or filters to discover more fragrances in your collection.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setSearchTerm('');
                                setFilters({
                                    category: 'All',
                                    priceRange: { min: '', max: '' },
                                    sortBy: 'name'
                                });
                            }}
                            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl 
                       hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                        >
                            Clear Filters
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Home;