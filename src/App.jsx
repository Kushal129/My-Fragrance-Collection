import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from 'lucide-animated';
import Navbar from './components/Navbar.jsx';
import VaultView from './components/VaultView.jsx';
import PerfumeDetailPage from './components/PerfumeDetailPage.jsx';
import PerfumeFormSheet from './components/PerfumeFormSheet.jsx';
import MainWebsiteLoader from './components/MainWebsiteLoader.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import {
  getStoredPerfumes,
  savePerfumes
} from './services/storage.js';

const checkIs404Route = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  const hash = window.location.hash;
  return (
    hash === '#404' ||
    (path !== '/' && path !== '' && path !== '/index.html' && !path.startsWith('/?'))
  );
};

function App() {
  const [perfumes, setPerfumes] = useState(() => getStoredPerfumes());
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Check if current route is 404
  const [isNotFound, setIsNotFound] = useState(() => checkIs404Route());

  // Show website loader ONLY on the home collection on initial visit, NEVER on 404 routes
  const [isWebsiteLoading, setIsWebsiteLoading] = useState(() => {
    if (checkIs404Route()) return false;
    return !sessionStorage.getItem('kushal_perfumes_preloaded');
  });

  // Listen to popstate and hashchange to react dynamically to 404 or route changes
  useEffect(() => {
    const handleRoute = () => {
      const is404 = checkIs404Route();
      setIsNotFound(is404);
      if (is404) {
        setIsWebsiteLoading(false);
      }
    };

    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, []);

  // Monitor scroll position for Back To Top button
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState(null);

  // Open Full Detail Page
  const handleSelectPerfume = (perfume) => {
    setSelectedPerfume(perfume);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from Detail Page
  const handleBackToCollection = () => {
    setSelectedPerfume(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add / Edit Perfume
  const handleSavePerfume = (perfumeData) => {
    let updated;
    const exists = perfumes.some((p) => p.id === perfumeData.id);
    if (exists) {
      updated = perfumes.map((p) => (p.id === perfumeData.id ? perfumeData : p));
      if (selectedPerfume?.id === perfumeData.id) {
        setSelectedPerfume(perfumeData);
      }
    } else {
      updated = [perfumeData, ...perfumes];
    }
    setPerfumes(updated);
    savePerfumes(updated);
    setEditingPerfume(null);
  };

  // Delete Perfume
  const handleDeletePerfume = (perfumeId) => {
    const updated = perfumes.filter((p) => p.id !== perfumeId);
    setPerfumes(updated);
    savePerfumes(updated);
    if (selectedPerfume?.id === perfumeId) {
      setSelectedPerfume(null);
    }
  };

  const handleEditFromDetail = (perfume) => {
    setEditingPerfume(perfume);
    setIsFormOpen(true);
  };

  // Return from 404 Scent Lost
  const handleReturnHome = () => {
    setIsNotFound(false);
    setSelectedPerfume(null);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Explore note from 404 Scent Lost (searches note directly in Collection)
  const handleExploreNoteFrom404 = (note) => {
    setIsNotFound(false);
    setSelectedPerfume(null);
    setSearchQuery(note);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Main Website Loader (Initial Visit & Preload - NEVER on 404 routes) */}
      {!isNotFound && isWebsiteLoading && (
        <MainWebsiteLoader
          perfumes={perfumes}
          onLoaded={() => {
            sessionStorage.setItem('kushal_perfumes_preloaded', 'true');
            setIsWebsiteLoading(false);
          }}
        />
      )}

      {/* Top Navbar (Clean Single Showcase Header) */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalBottles={perfumes.length}
        isDetailView={Boolean(selectedPerfume) || isNotFound}
        onBackToCollection={isNotFound ? handleReturnHome : handleBackToCollection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-safe">
        {isNotFound ? (
          /* Custom 404 Olfactory Trail Lost / Evaporated Flacon View */
          <NotFoundPage onReturnHome={handleReturnHome} />
        ) : selectedPerfume ? (
          /* Full Detail Page View */
          <PerfumeDetailPage
            perfume={selectedPerfume}
            onBack={handleBackToCollection}
            onEdit={handleEditFromDetail}
          />
        ) : (
          /* Main Fragrance Collection Showcase */
          <VaultView
            perfumes={perfumes}
            searchQuery={searchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            onSelectPerfume={handleSelectPerfume}
          />
        )}
      </main>

      {/* Slide-Up Sheet: Add / Edit Fragrance */}
      <PerfumeFormSheet
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPerfume(null);
        }}
        onSave={handleSavePerfume}
        initialData={editingPerfume}
        onDelete={handleDeletePerfume}
      />

      {/* Floating Compact Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-5 z-40 p-2.5 rounded-full bg-[#161616]/90 hover:bg-white text-neutral-300 hover:text-black border border-white/15 hover:border-white shadow-2xl backdrop-blur-md transition-all duration-300 active:scale-90 group"
          title="Back to Top"
          aria-label="Back to top"
        >
          <ArrowUpIcon size={16} animateOnHover={true} />
        </button>
      )}
    </div>
  );
}

export default App;
