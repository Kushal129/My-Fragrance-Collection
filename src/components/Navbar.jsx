import React from 'react';
import { SearchIcon, LayoutGridIcon, ListIcon, FlaskIcon } from 'lucide-animated';

const Navbar = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  totalBottles,
  isDetailView,
  onBackToCollection,
  activeTab = 'collection',
  setActiveTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] pt-safe">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2.5 space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Title with Logo */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Kushal's Fragrance Collection Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded-md border border-white/10 shadow-sm cursor-pointer hover:border-white/30 transition shrink-0"
              onClick={() => {
                if (isDetailView && onBackToCollection) {
                  onBackToCollection();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
            <h1
              onClick={() => {
                if (isDetailView && onBackToCollection) {
                  onBackToCollection();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white whitespace-nowrap cursor-pointer hover:text-neutral-200 transition"
            >
              <span className="sm:hidden">Kushal's</span>
              <span className="hidden sm:inline">Kushal's Collection</span>
            </h1>
            <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-neutral-400 border border-neutral-800 rounded-full bg-[#121212] flex-shrink-0">
              {totalBottles}
            </span>
          </div>

          {/* Center / Right Section Mode Selector: Collection vs Perfume Test */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="inline-flex rounded-xl bg-[#141414] p-0.5 border border-white/[0.08]">
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('collection');
                  if (isDetailView && onBackToCollection) onBackToCollection();
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  if (document.documentElement) document.documentElement.scrollTop = 0;
                  if (document.body) document.body.scrollTop = 0;
                }}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition active:scale-95 ${
                  activeTab === 'collection' && !isDetailView
                    ? 'bg-neutral-200 text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Collection</span>
              </button>

              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('test');
                  if (isDetailView && onBackToCollection) onBackToCollection();
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  if (document.documentElement) document.documentElement.scrollTop = 0;
                  if (document.body) document.body.scrollTop = 0;
                }}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition active:scale-95 ${
                  activeTab === 'test' && !isDetailView
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                    : 'text-neutral-400 hover:text-amber-300'
                }`}
              >
                <FlaskIcon size={13} animateOnHover={true} className="flex-shrink-0" />
                <span className="hidden sm:inline">Perfume Finder</span>
                <span className="sm:hidden">Finder</span>
              </button>
            </div>

            {/* Grid / List toggle only on Collection tab */}
            {!isDetailView && activeTab === 'collection' && (
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-[#141414] text-neutral-400 hover:text-white border border-white/5 active:scale-95 transition hidden sm:inline-flex"
                title={viewMode === 'grid' ? 'Switch to List' : 'Switch to Grid'}
                aria-label="Toggle view"
              >
                {viewMode === 'grid' ? (
                  <ListIcon size={16} animateOnHover={true} />
                ) : (
                  <LayoutGridIcon size={16} animateOnHover={true} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Minimal Search Bar (Only shown on Collection tab) */}
        {!isDetailView && activeTab === 'collection' && (
          <div className="relative pt-0.5">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
              <SearchIcon size={14} animateOnHover={false} />
            </div>
            <input
              type="text"
              placeholder="Search perfumes, brands, notes (Vanilla, Coffee, Bergamot)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-14 py-2 bg-[#121212] border border-white/[0.08] rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-white/30 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-white px-2 py-0.5 rounded bg-neutral-800 font-medium"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
