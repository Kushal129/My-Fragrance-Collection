import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  SearchIcon,
  XIcon,
  CheckIcon,
  RotateCcwIcon,
  ArrowRightIcon,
  FlaskIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-animated';

// 8 Primary Scent Families / Vibe Profiles
const SCENT_FAMILIES = [
  {
    id: 'sweet_vanilla',
    label: 'Vanilla & Gourmand',
    emoji: '🍦',
    keywords: ['vanilla', 'tonka', 'caramel', 'toffee', 'praline', 'crème brûlée', 'sweet']
  },
  {
    id: 'warm_spicy',
    label: 'Warm & Spicy',
    emoji: '🌶️',
    keywords: ['cardamom', 'cinnamon', 'saffron', 'pepper', 'nutmeg', 'ginger', 'spicy', 'warm spicy']
  },
  {
    id: 'fresh_citrus',
    label: 'Fresh & Citrus',
    emoji: '🍋',
    keywords: ['bergamot', 'lemon', 'lime', 'mandarin', 'grapefruit', 'orange', 'citrus']
  },
  {
    id: 'woods_oud',
    label: 'Woods & Oud',
    emoji: '🪵',
    keywords: ['cedar', 'sandalwood', 'oud', 'agarwood', 'patchouli', 'vetiver', 'woody']
  },
  {
    id: 'tropical_fruity',
    label: 'Tropical & Fruity',
    emoji: '🍍',
    keywords: ['coconut', 'pineapple', 'maracuja', 'passionfruit', 'apple', 'blackcurrant', 'fig', 'fruity']
  },
  {
    id: 'marine_aquatic',
    label: 'Aquatic & Marine',
    emoji: '🌊',
    keywords: ['sea notes', 'aquatic', 'marine', 'mint', 'ambergris', 'ocean']
  },
  {
    id: 'coffee_cacao',
    label: 'Dark Café & Cacao',
    emoji: '☕',
    keywords: ['coffee', 'cacao', 'cocoa', 'rum', 'cognac', 'chocolate']
  },
  {
    id: 'aromatic_lavender',
    label: 'Clean Aromatic',
    emoji: '🌿',
    keywords: ['lavender', 'sage', 'rosemary', 'geranium', 'aromatic']
  }
];

// Top Popular Individual Notes in Collection (Vanilla #1)
const POPULAR_NOTES = [
  'Vanilla',
  'Cardamom',
  'Bergamot',
  'Oud',
  'Coffee',
  'Amber',
  'Cinnamon',
  'Coconut',
  'Lavender',
  'Cedarwood',
  'Patchouli',
  'Mint',
  'Leather',
  'Pineapple'
];

const normalize = (str) =>
  String(str || '')
    .toLowerCase()
    .replace(/[\(\)\-\_\/]/g, ' ')
    .trim();

const ScentTasteMatcher = ({ perfumes = [], onSelectPerfume }) => {
  const [selectedFamily, setSelectedFamily] = useState(null); // single scent family or null
  const [selectedNotes, setSelectedNotes] = useState([]); // array of individual note names
  const [searchQuery, setSearchQuery] = useState(''); // text search for notes/names
  const [selectedPriceRange, setSelectedPriceRange] = useState('all'); // price range filter
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'name' | 'price_asc' | 'price_desc'

  const vibeScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [hasSwipedVibes, setHasSwipedVibes] = useState(() => {
    return typeof window !== 'undefined' && Boolean(sessionStorage.getItem('kushal_vibes_swiped'));
  });

  const checkScroll = () => {
    if (vibeScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = vibeScrollRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);

      // Once user swipes horizontally, hide the cue permanently
      if (scrollLeft > 15 && !hasSwipedVibes) {
        setHasSwipedVibes(true);
        try {
          sessionStorage.setItem('kushal_vibes_swiped', 'true');
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    checkScroll();
    const el = vibeScrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
    }

    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
    };
  }, [hasSwipedVibes]);

  const scrollVibes = (direction) => {
    if (vibeScrollRef.current) {
      const offset = direction === 'left' ? -200 : 200;
      vibeScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setHasSwipedVibes(true);
      try {
        sessionStorage.setItem('kushal_vibes_swiped', 'true');
      } catch (e) {}
    }
  };

  // Helper: check if a perfume matches a family
  const perfumeMatchesFamily = (perfume, family) => {
    if (!family) return false;
    const keywords = family.keywords;

    // Check accords
    const accords = perfume.accords || [];
    const accordMatch = accords.some((a) =>
      keywords.some((k) => normalize(a.name).includes(k) || k.includes(normalize(a.name)))
    );
    if (accordMatch) return true;

    // Check all notes
    const allNotes = [
      ...(perfume.notes?.topNotes || perfume.notes?.top || []),
      ...(perfume.notes?.middleNotes || perfume.notes?.middle || []),
      ...(perfume.notes?.baseNotes || perfume.notes?.base || [])
    ];
    return allNotes.some((n) => {
      const normN = normalize(n);
      return keywords.some((k) => normN.includes(k) || k.includes(normN));
    });
  };

  // Helper: check which specific notes from selectedNotes match in perfume
  const getMatchedNotesInPerfume = (perfume, noteList) => {
    if (!noteList || noteList.length === 0) return [];
    const allNotes = [
      ...(perfume.notes?.topNotes || perfume.notes?.top || []),
      ...(perfume.notes?.middleNotes || perfume.notes?.middle || []),
      ...(perfume.notes?.baseNotes || perfume.notes?.base || [])
    ];

    const matched = [];
    noteList.forEach((target) => {
      const targetNorm = normalize(target);
      const found = allNotes.find((n) => {
        const nNorm = normalize(n);
        return nNorm.includes(targetNorm) || targetNorm.includes(nNorm);
      });
      if (found) {
        matched.push({ target, actual: found });
      }
    });
    return matched;
  };

  // Toggle family
  const handleToggleFamily = (familyId) => {
    setHasSwipedVibes(true);
    try {
      sessionStorage.setItem('kushal_vibes_swiped', 'true');
    } catch (e) {}

    if (selectedFamily === familyId) {
      setSelectedFamily(null);
    } else {
      setSelectedFamily(familyId);
    }
  };

  // Toggle individual note
  const handleToggleNote = (note) => {
    setSelectedNotes((prev) => {
      const norm = normalize(note);
      if (prev.some((n) => normalize(n) === norm)) {
        return prev.filter((n) => normalize(n) !== norm);
      } else {
        return [...prev, note];
      }
    });
  };

  // Reset all selections
  const handleReset = () => {
    setSelectedFamily(null);
    setSelectedNotes([]);
    setSearchQuery('');
    setSelectedPriceRange('all');
  };

  const hasActiveFilters = Boolean(
    selectedFamily || selectedNotes.length > 0 || searchQuery.trim() || selectedPriceRange !== 'all'
  );

  // Active family object
  const activeFamilyObj = useMemo(() => {
    if (!selectedFamily) return null;
    return SCENT_FAMILIES.find((f) => f.id === selectedFamily) || null;
  }, [selectedFamily]);

  // Compute matched perfumes: DO NOT RETURN ANY BY DEFAULT (prevents scaling/lag issue)
  const results = useMemo(() => {
    if (!hasActiveFilters) {
      return []; // Empty by default until user makes a selection
    }

    const queryNorm = normalize(searchQuery);

    return perfumes
      .map((p) => {
        let isMatch = true;
        let matchScore = 0;
        const matchedDetails = getMatchedNotesInPerfume(p, selectedNotes);

        // 1. If individual notes are selected: MUST contain at least one note
        if (selectedNotes.length > 0) {
          if (matchedDetails.length === 0) {
            isMatch = false;
          } else {
            // Match score based on proportion of selected notes found
            matchScore += (matchedDetails.length / selectedNotes.length) * 60;
          }
        }

        // 2. If a family is selected:
        if (selectedFamily) {
          const familyMatches = perfumeMatchesFamily(p, activeFamilyObj);
          if (!familyMatches) {
            if (selectedNotes.length === 0) {
              isMatch = false;
            }
          } else {
            matchScore += 40;
          }
        }

        // 3. If text search query is active:
        if (queryNorm) {
          const nameMatch = normalize(p.name).includes(queryNorm);
          const brandMatch = normalize(p.brand).includes(queryNorm);
          const allNotes = [
            ...(p.notes?.topNotes || p.notes?.top || []),
            ...(p.notes?.middleNotes || p.notes?.middle || []),
            ...(p.notes?.baseNotes || p.notes?.base || [])
          ];
          const noteMatch = allNotes.some((n) => normalize(n).includes(queryNorm));
          if (!nameMatch && !brandMatch && !noteMatch) {
            isMatch = false;
          } else {
            matchScore += 30;
          }
        }

        // Price Range filter
        if (selectedPriceRange !== 'all') {
          const price = parseInt(p.price) || 0;
          if (selectedPriceRange === 'under-1000' && price >= 1000) isMatch = false;
          else if (selectedPriceRange === '1000-2000' && (price < 1000 || price > 2000)) isMatch = false;
          else if (selectedPriceRange === '2000-3500' && (price <= 2000 || price > 3500)) isMatch = false;
          else if (selectedPriceRange === '3500-5000' && (price <= 3500 || price > 5000)) isMatch = false;
          else if (selectedPriceRange === 'above-5000' && price <= 5000) isMatch = false;
        }

        if (!isMatch) return null;

        return {
          perfume: p,
          matchedNotes: matchedDetails,
          score: matchScore
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (sortBy === 'match') {
          return b.score - a.score;
        }
        if (sortBy === 'name') {
          return a.perfume.name.localeCompare(b.perfume.name);
        }
        if (sortBy === 'price_asc') {
          return (parseFloat(a.perfume.price) || 0) - (parseFloat(b.perfume.price) || 0);
        }
        if (sortBy === 'price_desc') {
          return (parseFloat(b.perfume.price) || 0) - (parseFloat(a.perfume.price) || 0);
        }
        return 0;
      });
  }, [perfumes, selectedFamily, selectedNotes, searchQuery, selectedPriceRange, sortBy, hasActiveFilters, activeFamilyObj]);

  return (
    <div className="space-y-4 pb-12 animate-fadeIn max-w-7xl mx-auto">
      {/* Sleek Luxury Control Header Card */}
      <div className="bg-black border border-white/10 rounded-2xl p-3.5 sm:p-5 shadow-2xl space-y-3.5">
        <div className="flex items-start justify-between gap-2.5">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight whitespace-nowrap">
                Perfume Taste Finder
              </h2>
              {hasActiveFilters ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 whitespace-nowrap shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {results.length} Matches Found
                </span>
              ) : (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10 whitespace-nowrap">
                  Tap note or vibe
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
              Pick a scent vibe or tap specific notes to reveal matching perfumes.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white border border-white/10 transition active:scale-95 shrink-0 whitespace-nowrap"
              title="Reset all filters"
            >
              <RotateCcwIcon size={12} animateOnHover={true} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* 1. Horizontal Scrollable Scent Vibe Pills (Mobile-First 1-Tap with Swipe Animation) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400">
              1. Scent Vibe (Tap to Filter)
            </div>
            <div className="flex items-center gap-2">
              {/* Animated Swipe Cue: Only on small screens (sm:hidden), only when scrollable, and hides after 1st swipe */}
              {!hasSwipedVibes && canScrollRight && (
                <div className="flex sm:hidden items-center gap-1.5 text-[10px] text-amber-400 font-medium select-none animate-fadeIn">
                  <span className="animate-pulse">Swipe</span>
                  <span className="inline-block animate-swipe-hint font-bold text-xs">➔</span>
                </div>
              )}
              {/* Desktop Scroll Chevrons: Cleanly placed in header, never obscuring or overlapping chips */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => scrollVibes('left')}
                  disabled={!canScrollLeft}
                  className="w-6 h-6 rounded-lg bg-black hover:bg-white/10 disabled:opacity-20 disabled:pointer-events-none text-neutral-300 hover:text-white flex items-center justify-center transition border border-white/10 active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon size={12} animateOnHover={true} />
                </button>
                <button
                  onClick={() => scrollVibes('right')}
                  disabled={!canScrollRight}
                  className="w-6 h-6 rounded-lg bg-black hover:bg-white/10 disabled:opacity-20 disabled:pointer-events-none text-neutral-300 hover:text-white flex items-center justify-center transition border border-white/10 active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon size={12} animateOnHover={true} />
                </button>
              </div>
            </div>
          </div>

          {/* Clean Horizontal Scroll Container - No dark overlays or floating arrows covering chips */}
          <div
            ref={vibeScrollRef}
            className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar px-0.5 scroll-smooth"
          >
            {SCENT_FAMILIES.map((family) => {
              const isSelected = selectedFamily === family.id;
              return (
                <button
                  key={family.id}
                  onClick={() => handleToggleFamily(family.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition active:scale-95 border flex-shrink-0 ${
                    isSelected
                      ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20 font-bold'
                      : 'bg-black hover:bg-white/10 text-neutral-300 border-white/10'
                  }`}
                >
                  <span className="text-sm">{family.emoji}</span>
                  <span>{family.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Direct Note Search & Popular Notes (Vanilla #1) */}
        <div className="pt-2 border-t border-white/[0.06] space-y-2">
          <div className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400">
            2. Pick or Search Specific Notes
          </div>

          {/* Clean Note Search Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
              <SearchIcon size={14} animateOnHover={false} />
            </div>
            <input
              type="text"
              placeholder="Search note (e.g. Vanilla, Coffee, Cardamom, Oud, Mint)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-black border border-white/10 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400/60 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                aria-label="Clear note search"
              >
                <XIcon size={12} animateOnHover={false} />
              </button>
            )}
          </div>

          {/* Quick-Pick Popular Note Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {POPULAR_NOTES.map((note) => {
              const isSelected = selectedNotes.some((n) => normalize(n) === normalize(note));
              return (
                <button
                  key={note}
                  onClick={() => handleToggleNote(note)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition active:scale-95 whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-sm'
                      : 'bg-black hover:bg-white/10 text-neutral-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  {isSelected && <CheckIcon size={11} animateOnHover={false} />}
                  <span>{note}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Tags Bar */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-neutral-400 mr-1 font-medium">Active:</span>
            {selectedFamily && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
                <span>{activeFamilyObj?.emoji} {activeFamilyObj?.label}</span>
                <button
                  onClick={() => setSelectedFamily(null)}
                  className="hover:text-white"
                  aria-label="Remove family"
                >
                  <XIcon size={10} animateOnHover={false} />
                </button>
              </span>
            )}

            {selectedNotes.map((note) => (
              <span
                key={note}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-neutral-200 text-[11px] font-medium"
              >
                <span>{note}</span>
                <button
                  onClick={() => handleToggleNote(note)}
                  className="hover:text-white"
                  aria-label={`Remove ${note}`}
                >
                  <XIcon size={10} animateOnHover={false} />
                </button>
              </span>
            ))}

            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-neutral-200 text-[11px]">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-white"
                  aria-label="Clear search"
                >
                  <XIcon size={10} animateOnHover={false} />
                </button>
              </span>
            )}

            {selectedPriceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
                <span>
                  {selectedPriceRange === 'under-1000' && 'Under ₹1,000'}
                  {selectedPriceRange === '1000-2000' && '₹1k – ₹2k'}
                  {selectedPriceRange === '2000-3500' && '₹2k – ₹3.5k'}
                  {selectedPriceRange === '3500-5000' && '₹3.5k – ₹5k'}
                  {selectedPriceRange === 'above-5000' && 'Above ₹5k'}
                </span>
                <button
                  onClick={() => setSelectedPriceRange('all')}
                  className="hover:text-white"
                  aria-label="Remove price filter"
                >
                  <XIcon size={10} animateOnHover={false} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Conditional Content Area: Prompt when nothing selected, Grid when selected */}
      {!hasActiveFilters ? (
        /* Empty State: Awaiting User Selection (No lag, no scaling issues) */
        <div className="text-center py-12 sm:py-16 px-4 bg-black border border-white/10 rounded-2xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-amber-400">
            <FlaskIcon size={24} animateOnHover={true} />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-sm sm:text-base font-bold text-white">
              Select a Scent Vibe or Note to Begin
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              To keep performance lightning fast on your device, perfumes will appear as soon as you choose your preferred notes or vibe above.
            </p>
          </div>

          {/* Quick 1-Tap Suggestions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleToggleNote('Vanilla')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-neutral-200 text-xs font-semibold transition active:scale-95"
            >
              <span>🍦 Try Vanilla</span>
            </button>
            <button
              onClick={() => handleToggleFamily('warm_spicy')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-neutral-200 text-xs font-semibold transition active:scale-95"
            >
              <span>🌶️ Warm & Spicy</span>
            </button>
            <button
              onClick={() => handleToggleFamily('fresh_citrus')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-neutral-200 text-xs font-semibold transition active:scale-95"
            >
              <span>🍋 Fresh & Citrus</span>
            </button>
            <button
              onClick={() => handleToggleNote('Oud')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-neutral-200 text-xs font-semibold transition active:scale-95"
            >
              <span>🪵 Try Oud</span>
            </button>
          </div>
        </div>
      ) : (
        /* Results View when filters are active */
        <div className="space-y-3">
          {/* Header row: Match Count & Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1">
            <div className="text-xs text-neutral-400">
              Found <strong className="text-white font-semibold">{results.length}</strong> matching fragrances
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Price Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-neutral-400">Price:</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="bg-black border border-white/10 text-neutral-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-white/30 cursor-pointer"
                >
                  <option value="all">All Prices</option>
                  <option value="under-1000">Under ₹1,000</option>
                  <option value="1000-2000">₹1,000 – ₹2,000</option>
                  <option value="2000-3500">₹2,000 – ₹3,500</option>
                  <option value="3500-5000">₹3,500 – ₹5,000</option>
                  <option value="above-5000">Above ₹5,000</option>
                </select>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-neutral-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black border border-white/10 text-neutral-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-white/30 cursor-pointer"
                >
                  <option value="match">Best Match</option>
                  <option value="name">Name (A to Z)</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid or Empty Match Notice */}
          {results.length === 0 ? (
            <div className="text-center py-12 px-4 bg-black border border-dashed border-white/15 rounded-2xl space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-white/10 flex items-center justify-center text-neutral-400">
                <SearchIcon size={16} animateOnHover={false} />
              </div>
              <h4 className="text-sm font-semibold text-white">No fragrances found for this exact note</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try selecting a different note or tap one of the popular scent vibes.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition"
              >
                <RotateCcwIcon size={12} animateOnHover={true} />
                <span>Reset Selection</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {results.map(({ perfume, matchedNotes }) => (
                <div
                  key={perfume.id}
                  onClick={() => onSelectPerfume(perfume)}
                  className="group bg-black hover:bg-[#0a0a0a] border border-white/10 hover:border-white/20 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-xl"
                >
                  {/* Bottle Image */}
                  <div className="relative aspect-square w-full rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center p-2 mb-2">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600';
                      }}
                    />


                    {/* Concentration tag */}
                    {perfume.concentration && (
                      <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-semibold text-neutral-300 uppercase tracking-wider border border-white/10">
                        {perfume.concentration}
                      </div>
                    )}
                  </div>

                  {/* Fragrance Info */}
                  <div className="space-y-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold truncate">
                      {perfume.brand}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                      {perfume.name}
                    </h4>

                    {/* Matched Notes Pills */}
                    {matchedNotes && matchedNotes.length > 0 ? (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {matchedNotes.slice(0, 2).map((m, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[9px] font-medium"
                          >
                            <span>✓ {m.target}</span>
                          </span>
                        ))}
                        {matchedNotes.length > 2 && (
                          <span className="text-[9px] text-neutral-500 self-center">
                            +{matchedNotes.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-[10px] text-neutral-500 truncate pt-0.5">
                        {(perfume.notes?.topNotes || perfume.notes?.top || []).slice(0, 2).join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="mt-2.5 pt-2 border-t border-white/[0.05] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-400">₹</span>
                      <span className="text-xs sm:text-sm font-bold text-white ml-0.5">
                        {perfume.price}
                      </span>
                    </div>

                    <span className="text-[10px] font-medium text-neutral-400 group-hover:text-white flex items-center gap-0.5 transition">
                      <span>View</span>
                      <ArrowRightIcon size={10} animateOnHover={true} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScentTasteMatcher;
