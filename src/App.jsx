import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from 'lucide-animated';
import Navbar from './components/Navbar.jsx';
import VaultView from './components/VaultView.jsx';
import SOTDView from './components/SOTDView.jsx';
import NotesExplorer from './components/NotesExplorer.jsx';
import AnalyticsView from './components/AnalyticsView.jsx';
import PerfumeDetailPage from './components/PerfumeDetailPage.jsx';
import PerfumeFormSheet from './components/PerfumeFormSheet.jsx';
import MainWebsiteLoader from './components/MainWebsiteLoader.jsx';
import {
  getStoredPerfumes,
  savePerfumes,
  getSOTDLogs,
  logSOTD
} from './services/storage.js';

function App() {
  const [perfumes, setPerfumes] = useState(() => getStoredPerfumes());
  const [sotdLogs, setSotdLogs] = useState(() => getSOTDLogs());
  const [isWebsiteLoading, setIsWebsiteLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  const [activeTab, setActiveTab] = useState('vault'); // 'vault' | 'sotd' | 'notes' | 'stats'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState(null);
  const [sotdPreselected, setSotdPreselected] = useState(null);

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

  // Log Wear from Detail Page
  const handleLogWearFromDetail = (perfume) => {
    setSotdPreselected(perfume);
    setSelectedPerfume(null);
    setActiveTab('sotd');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save SOTD Log
  const handleSaveSOTD = (entry) => {
    const updated = logSOTD(entry);
    setSotdLogs([...updated]);
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

  const handleOpenAddModal = () => {
    setEditingPerfume(null);
    setIsFormOpen(true);
  };

  const handleEditFromDetail = (perfume) => {
    setEditingPerfume(perfume);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Main Website Loader (Initial Visit & Preload) */}
      {isWebsiteLoading && (
        <MainWebsiteLoader
          perfumes={perfumes}
          onLoaded={() => setIsWebsiteLoading(false)}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalBottles={perfumes.length}
        isDetailView={Boolean(selectedPerfume)}
        onBackToCollection={handleBackToCollection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-safe">
        {selectedPerfume ? (
          /* Full Detail Page View */
          <PerfumeDetailPage
            perfume={selectedPerfume}
            onBack={handleBackToCollection}
            onLogWear={handleLogWearFromDetail}
            onEdit={handleEditFromDetail}
          />
        ) : (
          <>
            {/* TAB 1: Collection Vault */}
            {activeTab === 'vault' && (
              <VaultView
                perfumes={perfumes}
                searchQuery={searchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                onSelectPerfume={handleSelectPerfume}
              />
            )}

            {/* TAB 2: Scent of the Day (SOTD Journal) */}
            {activeTab === 'sotd' && (
              <SOTDView
                perfumes={perfumes}
                logs={sotdLogs}
                onSaveLog={handleSaveSOTD}
                onSelectPerfume={handleSelectPerfume}
                preselectedPerfume={sotdPreselected}
              />
            )}

            {/* TAB 3: Notes & Accords Explorer */}
            {activeTab === 'notes' && (
              <NotesExplorer
                perfumes={perfumes}
                onSelectPerfume={handleSelectPerfume}
              />
            )}

            {/* TAB 4: Analytics & Stats */}
            {activeTab === 'stats' && (
              <AnalyticsView
                perfumes={perfumes}
                sotdLogs={sotdLogs}
              />
            )}
          </>
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
