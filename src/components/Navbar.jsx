import React from 'react';
import { SearchIcon, LayoutGridIcon, ListIcon } from 'lucide-animated';

const Navbar = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  totalBottles,
  isDetailView,
  onBackToCollection
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] pt-safe">
      <div className="max-w-7xl mx-auto px-4 py-2.5 space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Title */}
          <div className="flex items-center gap-2.5">
            <h1
              onClick={() => {
                if (isDetailView && onBackToCollection) {
                  onBackToCollection();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-base sm:text-lg font-bold tracking-tight text-white cursor-pointer hover:text-neutral-200 transition"
            >
              Kushal's Collection
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-medium text-neutral-400 border border-neutral-800 rounded-full bg-[#121212]">
              {totalBottles}
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isDetailView && (
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-[#141414] text-neutral-400 hover:text-white border border-white/5 active:scale-95 transition"
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

        {/* Minimal Search Bar */}
        {!isDetailView && (
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
