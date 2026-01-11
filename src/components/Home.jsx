import { useState, useEffect, lazy, Suspense } from 'react';
import { Search, Filter, Grid2x2 as Grid, List } from 'lucide-react';
import { perfumes as initialPerfumes } from '../data.js';
const PerfumeCard = lazy(() => import('./PerfumeCard.jsx'));

import PerfumeModal from './PerfumeModal.jsx';
import PerfumeForm from './PerfumeForm.jsx';
import Footer from './Footer.jsx';

const Home = () => {
  const [perfumes, setPerfumes] = useState(initialPerfumes);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const filteredPerfumes = perfumes
    .filter(perfume =>
      perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price) - parseInt(b.price);
        case 'price-high':
          return parseInt(b.price) - parseInt(a.price);
        case 'brand':
          return a.brand.localeCompare(b.brand);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleView = (perfume) => {
    setSelectedPerfume(perfume);
    setIsModalOpen(true);
  };

  const handleEdit = (perfume) => {
    setEditingPerfume(perfume);
    setIsFormOpen(true);
  };

  const handleDelete = (perfumeId) => {
    setPerfumes(perfumes.filter(p => p.id !== perfumeId));
  };

  const handleSave = (perfumeData) => {
    if (editingPerfume) {
      setPerfumes(perfumes.map(p => p.id === perfumeData.id ? perfumeData : p));
    } else {
      setPerfumes([...perfumes, perfumeData]);
    }
    setEditingPerfume(null);
  };

  const handleAddNew = () => {
    setEditingPerfume(null);
    setIsFormOpen(true);
  };

  const PerfumeCard = lazy(() => import('./PerfumeCard.jsx'));

  const CardSkeleton = () => (
  <div className="animate-pulse bg-white border rounded-2xl p-4 space-y-4">
    <div className="aspect-square bg-gray-300 rounded-xl" />
    <div className="h-4 bg-gray-300 rounded w-3/4" />
    <div className="h-3 bg-gray-300 rounded w-1/2" />
  </div>
);


  return (
    <div className={`min-h-screen bg-white transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'
      }`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 cursor-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            {/* Title */}
            <div className="text-center mb-6">
              <a href="/"><h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-2 tracking-tight">
                Fragrance Collection by Kushal
              </h1>
              </a>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                Discover and curate my personal perfume library
              </p>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search fragrances or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors duration-300"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-none px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors duration-300 bg-white"
                >
                  <option value="name">Name A-Z</option>
                  <option value="brand">Brand</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-colors duration-300 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-colors duration-300 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mt-4">
              <span className="text-gray-500 text-sm">
                Showing {filteredPerfumes.length} of {perfumes.length} fragrances
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPerfumes.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-3xl text-gray-900 mb-4 ">No fragrances found</h3>
            <p className="text-gray-600 text-lg">
              {searchQuery ? 'Try adjusting your search terms' : 'Start building your collection!'}
            </p>
          </div>
        ) : (
          <div className={`${viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
            }`}>
            {filteredPerfumes.map((perfume, index) => (
              <div
                key={perfume.id}
                className={`transform transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <Suspense fallback={<CardSkeleton />}>
                  <PerfumeCard
                    perfume={perfume}
                    onView={handleView}
                    viewMode={viewMode}
                  />
                </Suspense>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Admin Footer */}
      <Footer onAddNew={handleAddNew} />

      {/* Modals */}
      <PerfumeModal
        perfume={selectedPerfume}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPerfume(null);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PerfumeForm
        perfume={editingPerfume}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPerfume(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
};

export default Home;