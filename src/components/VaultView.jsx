import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  SlidersHorizontalIcon,
  XIcon,
  LayersIcon,
  CalendarDaysIcon,
  SunIcon,
  ArrowDown01Icon
} from 'lucide-animated';
import PerfumeCard from './PerfumeCard.jsx';
import LuxuryDropdown from './LuxuryDropdown.jsx';

const QUICK_FILTERS = [
  { id: 'all', label: 'ALL' },
  { id: 'summer', label: 'SUMMER', season: 'Summer' },
  { id: 'monsoon', label: 'MONSOON', season: 'Monsoon' },
  { id: 'winter', label: 'WINTER', season: 'Winter' },
  { id: 'office', label: 'OFFICE', occasion: 'Office / Work' },
  { id: 'party', label: 'EVENING / CLUB', occasion: 'Party / Clubbing' },
  { id: 'datenight', label: 'DATE NIGHT', occasion: 'Date Night' },
  { id: 'casual', label: 'DAILY CASUAL', occasion: 'Casual / Daily' },
  { id: 'gym', label: 'SPORT', occasion: 'Gym / Sport' }
];

const VaultView = ({
  perfumes,
  searchQuery,
  sortBy,
  setSortBy,
  viewMode,
  onSelectPerfume
}) => {
  const [activeQuickFilter, setActiveQuickFilter] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');

  // Progressive Grid Loading: Load 12 initially, then batch 12 more on scroll for peak 60fps mobile speed
  const [visibleCount, setVisibleCount] = useState(12);
  const loadMoreRef = useRef(null);

  // Reset visibleCount back to 12 whenever filters or search change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedBrand, selectedSeason, selectedOccasion, sortBy, activeQuickFilter]);

  // Extract unique brands with counts
  const brandList = useMemo(() => {
    const counts = perfumes.reduce((acc, p) => {
      acc[p.brand] = (acc[p.brand] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [perfumes]);

  const brandOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Brands', count: perfumes.length },
      ...brandList.map(([brand, count]) => ({
        value: brand,
        label: brand,
        count
      }))
    ];
  }, [brandList, perfumes.length]);

  const occasionOptions = [
    { value: 'all', label: 'All Occasions' },
    { value: 'Office / Work', label: 'Office & Work' },
    { value: 'Party / Clubbing', label: 'Clubbing & Evening' },
    { value: 'Date Night', label: 'Date Night & Intimate' },
    { value: 'Casual / Daily', label: 'Casual & Daily Wear' },
    { value: 'Gym / Sport', label: 'Sport & Gym' },
    { value: 'Special Occasion', label: 'Formal & Special Occasions' }
  ];

  const seasonOptions = [
    { value: 'all', label: 'All Seasons' },
    { value: 'Summer', label: 'Summer (High Heat)' },
    { value: 'Monsoon', label: 'Monsoon (Humid/Rain)' },
    { value: 'Winter', label: 'Winter (Cold & Cozy)' },
    { value: 'Spring', label: 'Spring (Mild & Fresh)' },
    { value: 'All Weather', label: 'All-Weather Versatile' }
  ];

  const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name (A to Z)' },
    { value: 'brand', label: 'Brand (A to Z)' },
    { value: 'rating', label: 'Rating (Highest First)' }
  ];

  // Quick filter handler
  const handleQuickFilterClick = (filter) => {
    setActiveQuickFilter(filter.id);
    if (filter.id === 'all') {
      setSelectedSeason('all');
      setSelectedOccasion('all');
    } else if (filter.season) {
      setSelectedSeason(filter.season);
      setSelectedOccasion('all');
    } else if (filter.occasion) {
      setSelectedOccasion(filter.occasion);
      setSelectedSeason('all');
    }
  };

  const handleResetFilters = () => {
    setActiveQuickFilter('all');
    setSelectedBrand('all');
    setSelectedSeason('all');
    setSelectedOccasion('all');
  };

  const hasActiveFilters =
    activeQuickFilter !== 'all' ||
    selectedBrand !== 'all' ||
    selectedSeason !== 'all' ||
    selectedOccasion !== 'all' ||
    Boolean(searchQuery.trim());

  // Filter & Sort logic
  const filteredPerfumes = useMemo(() => {
    return perfumes
      .filter((perfume) => {

        // Search Query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesName = perfume.name.toLowerCase().includes(query);
          const matchesBrand = perfume.brand.toLowerCase().includes(query);
          const matchesInspired = (perfume.inspiredBy || '').toLowerCase().includes(query);
          const allNotes = [
            ...(perfume.notes?.topNotes || perfume.notes?.top || []),
            ...(perfume.notes?.middleNotes || perfume.notes?.middle || []),
            ...(perfume.notes?.baseNotes || perfume.notes?.base || [])
          ]
            .join(' ')
            .toLowerCase();
          const matchesNotes = allNotes.includes(query);
          const matchesAccords = (perfume.accords || [])
            .map((a) => a.name)
            .join(' ')
            .toLowerCase()
            .includes(query);

          if (!matchesName && !matchesBrand && !matchesInspired && !matchesNotes && !matchesAccords) {
            return false;
          }
        }

        // Brand filter
        if (selectedBrand !== 'all' && perfume.brand !== selectedBrand) {
          return false;
        }

        // Season filter
        if (selectedSeason !== 'all') {
          const list = perfume.seasonsList || [];
          if (selectedSeason === 'Monsoon') {
            const isMonsoon =
              list.includes('Monsoon') ||
              (perfume.accords || []).some((a) =>
                ['earthy', 'aquatic', 'woody', 'marine', 'fresh spicy'].includes(a.name.toLowerCase())
              );
            if (!isMonsoon) return false;
          } else if (selectedSeason === 'Summer') {
            const isSummer =
              list.includes('Summer') ||
              (perfume.seasons?.summer ?? 0) >= 35 ||
              (perfume.accords || []).some((a) =>
                ['citrus', 'aquatic', 'marine', 'green'].includes(a.name.toLowerCase())
              );
            if (!isSummer) return false;
          } else if (selectedSeason === 'Winter') {
            const isWinter =
              list.includes('Winter') ||
              (perfume.seasons?.winter ?? 0) >= 25 ||
              (perfume.accords || []).some((a) =>
                ['warm spicy', 'vanilla', 'amber', 'cinnamon', 'caramel', 'oud'].includes(a.name.toLowerCase())
              );
            if (!isWinter) return false;
          } else if (selectedSeason === 'Spring') {
            const isSpring =
              list.includes('Spring') ||
              (perfume.seasons?.spring ?? 0) >= 30;
            if (!isSpring) return false;
          } else if (selectedSeason === 'All Weather') {
            const isAll = list.includes('All Weather');
            if (!isAll) return false;
          }
        }

        // Occasion filter
        if (selectedOccasion !== 'all') {
          const occList = (perfume.occasions || []).map((o) => o.toLowerCase());
          const target = selectedOccasion.toLowerCase();
          const matches = occList.some((o) => o.includes(target) || target.includes(o));
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
          case 'price-low':
            return (parseInt(a.price) || 0) - (parseInt(b.price) || 0);
          case 'price-high':
            return (parseInt(b.price) || 0) - (parseInt(a.price) || 0);
          case 'brand':
            return a.brand.localeCompare(b.brand);
          case 'name':
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [
    perfumes,
    searchQuery,
    selectedBrand,
    selectedSeason,
    selectedOccasion,
    sortBy
  ]);

  // Displayed slice: Only render visibleCount items in DOM
  const displayedPerfumes = useMemo(() => {
    return filteredPerfumes.slice(0, visibleCount);
  }, [filteredPerfumes, visibleCount]);

  // Infinite scroll trigger via IntersectionObserver
  useEffect(() => {
    if (visibleCount >= filteredPerfumes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, filteredPerfumes.length));
        }
      },
      { rootMargin: '300px' } // Preload 300px before user hits bottom so scroll is seamless
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [visibleCount, filteredPerfumes.length]);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* 1. Quick Filter Pills Carousel - Clean Editorial Style */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {QUICK_FILTERS.map((filter) => {
          const isActive = activeQuickFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => handleQuickFilterClick(filter)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest whitespace-nowrap transition-all active:scale-95 flex-shrink-0 ${
                isActive
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#121212] text-neutral-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* 2. Structured Filter Controls Bar */}
      <div className="vault-panel rounded-xl p-3 border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between gap-2.5 flex-wrap">
          {/* Brand Filter */}
          <div className="flex-1 min-w-[170px]">
            <LuxuryDropdown
              value={selectedBrand}
              onChange={setSelectedBrand}
              options={brandOptions}
              icon={LayersIcon}
              searchable={true}
              placeholder="All Brands"
            />
          </div>

          {/* Occasion Filter */}
          <div className="flex-1 min-w-[150px]">
            <LuxuryDropdown
              value={selectedOccasion}
              onChange={(val) => {
                setSelectedOccasion(val);
                setActiveQuickFilter('custom');
              }}
              options={occasionOptions}
              icon={CalendarDaysIcon}
              placeholder="All Occasions"
            />
          </div>

          {/* Season Filter */}
          <div className="flex-1 min-w-[150px]">
            <LuxuryDropdown
              value={selectedSeason}
              onChange={(val) => {
                setSelectedSeason(val);
                setActiveQuickFilter('custom');
              }}
              options={seasonOptions}
              icon={SunIcon}
              placeholder="All Seasons"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1 min-w-[160px] sm:flex-initial">
            <LuxuryDropdown
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              icon={ArrowDown01Icon}
              placeholder="Sort By"
            />
          </div>
        </div>

        {/* Filter Results & Reset Action */}
        <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span>
              Showing: <strong className="text-white font-semibold">{filteredPerfumes.length}</strong> of {perfumes.length} perfumes
            </span>
            {selectedSeason !== 'all' && (
              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 rounded text-[10px] font-medium uppercase tracking-wider">
                {selectedSeason}
              </span>
            )}
            {selectedOccasion !== 'all' && (
              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 rounded text-[10px] font-medium uppercase tracking-wider">
                {selectedOccasion}
              </span>
            )}
            {selectedBrand !== 'all' && (
              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 rounded text-[10px] font-medium uppercase tracking-wider">
                {selectedBrand}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400 hover:text-white transition uppercase tracking-wider"
            >
              <XIcon size={12} animateOnHover={true} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Fragrance Cards Grid / List */}
      {filteredPerfumes.length === 0 ? (
        <div className="vault-panel rounded-2xl p-10 text-center space-y-3 border border-white/[0.08]">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-300">
            No Matching Perfumes
          </h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Adjust your active filter parameters or search query to find other perfumes.
          </p>
          <div className="pt-2 flex flex-col items-center gap-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold tracking-wide uppercase transition active:scale-95"
            >
              Clear Active Filters
            </button>
            <button
              onClick={() => {
                window.location.hash = '#404';
              }}
              className="text-[11px] text-neutral-500 hover:text-neutral-300 underline underline-offset-4 transition"
            >
              Looking for an evaporated formulation? View 404
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'
                : 'space-y-2.5'
            }
          >
            {displayedPerfumes.map((perfume) => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                onSelect={onSelectPerfume}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Infinite Scroll Sentinel */}
          {visibleCount < filteredPerfumes.length && (
            <div
              ref={loadMoreRef}
              className="py-6 flex items-center justify-center text-xs text-neutral-400 gap-2"
            >
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Loading more perfumes...</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VaultView;
