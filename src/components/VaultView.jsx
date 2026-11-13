import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  SlidersHorizontalIcon,
  XIcon,
  LayersIcon,
  CalendarDaysIcon,
  SunIcon,
  ArrowDown01Icon,
  IndianRupeeIcon
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
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [customMinPrice, setCustomMinPrice] = useState('');
  const [customMaxPrice, setCustomMaxPrice] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');

  // Progressive Grid Loading: Load 12 initially, then batch 12 more on scroll for peak 60fps mobile speed
  const [visibleCount, setVisibleCount] = useState(12);
  const loadMoreRef = useRef(null);

  // Reset visibleCount back to 12 whenever filters or search change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedBrand, selectedPriceRange, customMinPrice, customMaxPrice, selectedSeason, selectedOccasion, sortBy, activeQuickFilter]);

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
    { value: 'name', label: 'Name (A to Z)' },
    { value: 'brand', label: 'Brand (A to Z)' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  // Price range options with live perfume count
  const priceOptions = useMemo(() => {
    const countUnder1k = perfumes.filter((p) => (parseInt(p.price) || 0) < 1000).length;
    const count1to2k = perfumes.filter((p) => {
      const pr = parseInt(p.price) || 0;
      return pr >= 1000 && pr <= 2000;
    }).length;
    const count2to35k = perfumes.filter((p) => {
      const pr = parseInt(p.price) || 0;
      return pr > 2000 && pr <= 3500;
    }).length;
    const count35to5k = perfumes.filter((p) => {
      const pr = parseInt(p.price) || 0;
      return pr > 3500 && pr <= 5000;
    }).length;
    const countAbove5k = perfumes.filter((p) => (parseInt(p.price) || 0) > 5000).length;

    let customLabel = 'Custom Range...';
    if (selectedPriceRange === 'custom') {
      if (customMinPrice && customMaxPrice) {
        customLabel = `₹${Number(customMinPrice).toLocaleString('en-IN')} - ₹${Number(customMaxPrice).toLocaleString('en-IN')}`;
      } else if (customMinPrice) {
        customLabel = `Min ₹${Number(customMinPrice).toLocaleString('en-IN')}`;
      } else if (customMaxPrice) {
        customLabel = `Max ₹${Number(customMaxPrice).toLocaleString('en-IN')}`;
      }
    }

    return [
      { value: 'all', label: 'All Prices', count: perfumes.length },
      { value: 'under-1000', label: 'Under ₹1,000', count: countUnder1k },
      { value: '1000-2000', label: '₹1,000 – ₹2,000', count: count1to2k },
      { value: '2000-3500', label: '₹2,000 – ₹3,500', count: count2to35k },
      { value: '3500-5000', label: '₹3,500 – ₹5,000', count: count35to5k },
      { value: 'above-5000', label: 'Above ₹5,000', count: countAbove5k },
      { value: 'custom', label: customLabel }
    ];
  }, [perfumes, selectedPriceRange, customMinPrice, customMaxPrice]);

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
    setSelectedPriceRange('all');
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setSelectedSeason('all');
    setSelectedOccasion('all');
  };

  const hasActiveFilters =
    activeQuickFilter !== 'all' ||
    selectedBrand !== 'all' ||
    selectedPriceRange !== 'all' ||
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

        // Price Range filter
        if (selectedPriceRange !== 'all') {
          const price = parseInt(perfume.price) || 0;
          if (selectedPriceRange === 'under-1000' && price >= 1000) return false;
          if (selectedPriceRange === '1000-2000' && (price < 1000 || price > 2000)) return false;
          if (selectedPriceRange === '2000-3500' && (price <= 2000 || price > 3500)) return false;
          if (selectedPriceRange === '3500-5000' && (price <= 3500 || price > 5000)) return false;
          if (selectedPriceRange === 'above-5000' && price <= 5000) return false;
          if (selectedPriceRange === 'custom') {
            const min = customMinPrice !== '' ? parseInt(customMinPrice) || 0 : 0;
            const max = customMaxPrice !== '' ? parseInt(customMaxPrice) || Infinity : Infinity;
            if (price < min || price > max) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
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
    selectedPriceRange,
    customMinPrice,
    customMaxPrice,
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
      {/* 1. Quick Filter Pills Carousel - Clean Editorial Style with Edge Darkness Fades */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
          {QUICK_FILTERS.map((filter) => {
            const isActive = activeQuickFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => handleQuickFilterClick(filter)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest whitespace-nowrap transition-all active:scale-95 flex-shrink-0 ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'bg-black text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>

      {/* 2. Structured Filter Controls Bar */}
      <div className="vault-panel rounded-xl p-3 border border-white/[0.08] space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {/* Brand Filter */}
          <div>
            <LuxuryDropdown
              value={selectedBrand}
              onChange={setSelectedBrand}
              options={brandOptions}
              icon={LayersIcon}
              searchable={true}
              placeholder="All Brands"
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <LuxuryDropdown
              value={selectedPriceRange}
              onChange={(val) => {
                setSelectedPriceRange(val);
              }}
              options={priceOptions}
              icon={IndianRupeeIcon}
              placeholder="All Prices"
            />
          </div>

          {/* Occasion Filter */}
          <div>
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
          <div>
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
          <div className="col-span-2 md:col-span-1">
            <LuxuryDropdown
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              icon={ArrowDown01Icon}
              placeholder="Sort By"
            />
          </div>
        </div>

        {/* Expandable Custom Price Range Drawer */}
        {selectedPriceRange === 'custom' && (
          <div className="p-3 bg-black border border-amber-400/30 rounded-xl space-y-2.5 shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200">
                <IndianRupeeIcon size={13} className="text-amber-400" />
                <span>Custom Budget Range</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPriceRange('all');
                  setCustomMinPrice('');
                  setCustomMaxPrice('');
                }}
                className="text-[11px] text-neutral-400 hover:text-white transition flex items-center gap-1"
              >
                <XIcon size={11} />
                <span>Close</span>
              </button>
            </div>

            {/* Inputs: Min Price & Max Price */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
                  Minimum Price
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-mono">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={customMinPrice}
                    onChange={(e) => setCustomMinPrice(e.target.value)}
                    placeholder="Min (e.g. 1000)"
                    className="w-full pl-6 pr-2.5 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
                  Maximum Price
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-mono">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={customMaxPrice}
                    onChange={(e) => setCustomMaxPrice(e.target.value)}
                    placeholder="Max (e.g. 3500)"
                    className="w-full pl-6 pr-2.5 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>
            </div>

            {/* Quick helper chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/[0.06]">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mr-1">Quick:</span>
              {[
                { label: 'Under 1k', min: '', max: '1000' },
                { label: '1k - 2k', min: '1000', max: '2000' },
                { label: '2k - 3.5k', min: '2000', max: '3500' },
                { label: '3.5k - 5k', min: '3500', max: '5000' },
                { label: '5k+', min: '5000', max: '' }
              ].map((p) => {
                const isPresetActive = customMinPrice === p.min && customMaxPrice === p.max;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setCustomMinPrice(p.min);
                      setCustomMaxPrice(p.max);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] border transition active:scale-95 ${
                      isPresetActive
                        ? 'bg-amber-400 text-black border-amber-300 font-semibold'
                        : 'bg-black hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Results & Reset Action */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-white/[0.06] text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span className="whitespace-nowrap">
              Showing: <strong className="text-white font-semibold">{filteredPerfumes.length}</strong> of {perfumes.length} perfumes
            </span>
            {selectedPriceRange !== 'all' && (
              <span className="px-2 py-0.5 bg-amber-400/15 text-amber-300 border border-amber-400/30 rounded text-[10px] font-medium tracking-wider whitespace-nowrap inline-flex items-center gap-1">
                <span>
                  {selectedPriceRange === 'under-1000' && 'Under ₹1,000'}
                  {selectedPriceRange === '1000-2000' && '₹1k – ₹2k'}
                  {selectedPriceRange === '2000-3500' && '₹2k – ₹3.5k'}
                  {selectedPriceRange === '3500-5000' && '₹3.5k – ₹5k'}
                  {selectedPriceRange === 'above-5000' && 'Above ₹5k'}
                  {selectedPriceRange === 'custom' && (
                    customMinPrice && customMaxPrice
                      ? `₹${Number(customMinPrice).toLocaleString('en-IN')} – ₹${Number(customMaxPrice).toLocaleString('en-IN')}`
                      : customMinPrice
                      ? `Min ₹${Number(customMinPrice).toLocaleString('en-IN')}`
                      : customMaxPrice
                      ? `Max ₹${Number(customMaxPrice).toLocaleString('en-IN')}`
                      : 'Custom Price'
                  )}
                </span>
                <button
                  onClick={() => {
                    setSelectedPriceRange('all');
                    setCustomMinPrice('');
                    setCustomMaxPrice('');
                  }}
                  className="hover:text-white ml-0.5 transition"
                  aria-label="Remove price filter"
                >
                  <XIcon size={10} animateOnHover={false} />
                </button>
              </span>
            )}
            {selectedSeason !== 'all' && (
              <span className="px-2 py-0.5 bg-white/10 text-neutral-200 border border-white/10 rounded text-[10px] font-medium uppercase tracking-wider whitespace-nowrap">
                {selectedSeason}
              </span>
            )}
            {selectedOccasion !== 'all' && (
              <span className="px-2 py-0.5 bg-white/10 text-neutral-200 border border-white/10 rounded text-[10px] font-medium uppercase tracking-wider whitespace-nowrap">
                {selectedOccasion}
              </span>
            )}
            {selectedBrand !== 'all' && (
              <span className="px-2 py-0.5 bg-white/10 text-neutral-200 border border-white/10 rounded text-[10px] font-medium uppercase tracking-wider whitespace-nowrap">
                {selectedBrand}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400 hover:text-white transition uppercase tracking-wider shrink-0 whitespace-nowrap"
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
              className="px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-lg text-xs font-semibold tracking-wide uppercase transition active:scale-95"
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
