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
  setActiveTab,
  onOpenGuide
}) => {
  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 pt-safe">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2.5 space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Title */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-shrink-0">
            <h1
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white whitespace-nowrap select-none"
            >
              <span className="sm:hidden">Kushal's</span>
              <span className="hidden sm:inline">Kushal's Collection</span>
            </h1>
            <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-neutral-400 border border-white/10 rounded-full bg-black flex-shrink-0">
              {totalBottles}
            </span>
          </div>

          {/* Center / Right Section Mode Selector: Collection vs Perfume Test */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="inline-flex rounded-xl bg-black p-0.5 border border-white/10">
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
                <span className="hidden sm:inline">Scent Finder</span>
                <span className="sm:hidden">Finder</span>
              </button>

              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('guide');
                  if (isDetailView && onBackToCollection) onBackToCollection();
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  if (document.documentElement) document.documentElement.scrollTop = 0;
                  if (document.body) document.body.scrollTop = 0;
                }}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition active:scale-95 ${
                  activeTab === 'guide' && !isDetailView
                    ? 'bg-neutral-200 text-black shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Fragrance Concentration Guide (EDT, EDP, Extrait, Attar)"
              >
                <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center font-serif italic text-[10px] leading-none shrink-0">
                  i
                </span>
                <span>Guide</span>
              </button>
            </div>

            {/* Grid / List toggle only on Collection tab */}
            {!isDetailView && activeTab === 'collection' && (
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-black text-neutral-400 hover:text-white border border-white/10 active:scale-95 transition hidden sm:inline-flex"
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
              className="w-full pl-9 pr-14 py-2 bg-black border border-white/10 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-white/30 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-300 hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 font-medium"
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
