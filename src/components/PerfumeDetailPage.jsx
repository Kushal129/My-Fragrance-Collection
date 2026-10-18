import React, { useState, useEffect } from 'react';
import {
  ArrowLeftIcon,
  CopyIcon,
  SquarePenIcon,
  LinkIcon,
  ClockIcon,
  DropletIcon,
  CheckIcon,
  SunIcon,
  MoonIcon,
  CloudSunIcon,
  SnowflakeIcon,
  FlameIcon,
  GaugeIcon
} from 'lucide-animated';
import { getBottleLevels, setBottleLevel } from '../services/storage.js';

// Comprehensive note color mapping helper for vibrant visual hierarchy
export const getNoteColor = (noteName = '') => {
  const n = noteName.toLowerCase().trim();

  // Citrus (Bright Lemon, Lime, Bergamot, Grapefruit, Citron, Mandarin, Orange)
  if (
    n.includes('lemon') ||
    n.includes('lime') ||
    n.includes('bergamot') ||
    n.includes('grapefruit') ||
    n.includes('citron') ||
    n.includes('yuzu') ||
    n.includes('orange') ||
    n.includes('mandarin') ||
    n.includes('tangerine') ||
    n.includes('citrus') ||
    n.includes('verbena')
  ) {
    return {
      bg: 'bg-amber-400/10',
      text: 'text-amber-300',
      border: 'border-amber-400/25',
      dot: 'bg-amber-400'
    };
  }

  // Mint / Herbal / Fresh Green (Mint, Spearmint, Peppermint, Rosemary, Sage, Basil, Pine)
  if (
    n.includes('mint') ||
    n.includes('spearmint') ||
    n.includes('peppermint') ||
    n.includes('rosemary') ||
    n.includes('sage') ||
    n.includes('basil') ||
    n.includes('thyme') ||
    n.includes('pine') ||
    n.includes('herbal') ||
    n.includes('green') ||
    n.includes('eucalyptus') ||
    n.includes('tea')
  ) {
    return {
      bg: 'bg-emerald-400/10',
      text: 'text-emerald-300',
      border: 'border-emerald-400/25',
      dot: 'bg-emerald-400'
    };
  }

  // Lavender / Iris / Violet (Soft Purple & Violet Florals)
  if (
    n.includes('lavender') ||
    n.includes('iris') ||
    n.includes('violet') ||
    n.includes('heliotrope') ||
    n.includes('lilac')
  ) {
    return {
      bg: 'bg-purple-400/10',
      text: 'text-purple-300',
      border: 'border-purple-400/25',
      dot: 'bg-purple-400'
    };
  }

  // Floral / Rose / Jasmine / Neroli / Geranium (Rose & Floral Pinks)
  if (
    n.includes('rose') ||
    n.includes('jasmine') ||
    n.includes('neroli') ||
    n.includes('geranium') ||
    n.includes('lily') ||
    n.includes('tuberose') ||
    n.includes('osmanthus') ||
    n.includes('ylang') ||
    n.includes('magnolia') ||
    n.includes('floral')
  ) {
    return {
      bg: 'bg-rose-400/10',
      text: 'text-rose-300',
      border: 'border-rose-400/25',
      dot: 'bg-rose-400'
    };
  }

  // Warm Spices (Cinnamon, Cardamom, Nutmeg, Clove, Black/Pink Pepper, Ginger, Saffron)
  if (
    n.includes('cinnamon') ||
    n.includes('cardamom') ||
    n.includes('nutmeg') ||
    n.includes('clove') ||
    n.includes('pepper') ||
    n.includes('ginger') ||
    n.includes('saffron') ||
    n.includes('coriander') ||
    n.includes('spices') ||
    n.includes('anise')
  ) {
    return {
      bg: 'bg-orange-500/10',
      text: 'text-orange-300',
      border: 'border-orange-500/25',
      dot: 'bg-orange-500'
    };
  }

  // Vanilla / Tonka Bean / Sugar / Honey (Warm Golden Gourmand)
  if (
    n.includes('vanilla') ||
    n.includes('tonka') ||
    n.includes('sugar') ||
    n.includes('caramel') ||
    n.includes('honey') ||
    n.includes('praline')
  ) {
    return {
      bg: 'bg-yellow-400/10',
      text: 'text-yellow-200',
      border: 'border-yellow-400/25',
      dot: 'bg-yellow-400'
    };
  }

  // Cacao / Chocolate / Coffee (Deep Mocha)
  if (
    n.includes('cacao') ||
    n.includes('cocoa') ||
    n.includes('chocolate') ||
    n.includes('coffee')
  ) {
    return {
      bg: 'bg-amber-900/25',
      text: 'text-amber-200',
      border: 'border-amber-700/35',
      dot: 'bg-amber-600'
    };
  }

  // Aquatic / Marine / Ocean / Ozone (Crisp Ocean Blue)
  if (
    n.includes('marine') ||
    n.includes('sea') ||
    n.includes('aquatic') ||
    n.includes('ocean') ||
    n.includes('water') ||
    n.includes('ozone') ||
    n.includes('driftwood')
  ) {
    return {
      bg: 'bg-cyan-400/10',
      text: 'text-cyan-300',
      border: 'border-cyan-400/25',
      dot: 'bg-cyan-400'
    };
  }

  // Fruity (Apple, Pineapple, Blackcurrant, Plum, Pear, Peach, Berries)
  if (
    n.includes('apple') ||
    n.includes('pineapple') ||
    n.includes('berry') ||
    n.includes('berries') ||
    n.includes('currant') ||
    n.includes('blackcurrant') ||
    n.includes('plum') ||
    n.includes('melon') ||
    n.includes('pear') ||
    n.includes('peach') ||
    n.includes('fruity') ||
    n.includes('cherry')
  ) {
    return {
      bg: 'bg-red-400/10',
      text: 'text-red-300',
      border: 'border-red-400/25',
      dot: 'bg-red-400'
    };
  }

  // Leather / Suede
  if (n.includes('leather') || n.includes('suede')) {
    return {
      bg: 'bg-orange-950/30',
      text: 'text-orange-200',
      border: 'border-orange-800/35',
      dot: 'bg-orange-500'
    };
  }

  // Amber / Resins / Frankincense / Benzoin / Incense / Elemi
  if (
    n.includes('amber') ||
    n.includes('benzoin') ||
    n.includes('olibanum') ||
    n.includes('incense') ||
    n.includes('elemi') ||
    n.includes('styrax') ||
    n.includes('myrrh') ||
    n.includes('labdanum') ||
    n.includes('resin')
  ) {
    return {
      bg: 'bg-amber-600/15',
      text: 'text-amber-300',
      border: 'border-amber-600/30',
      dot: 'bg-amber-500'
    };
  }

  // Woods / Cedarwood / Sandalwood / Vetiver / Patchouli / Oakmoss
  if (
    n.includes('cedar') ||
    n.includes('sandalwood') ||
    n.includes('vetiver') ||
    n.includes('patchouli') ||
    n.includes('oakmoss') ||
    n.includes('guaiac') ||
    n.includes('wood') ||
    n.includes('rosewood') ||
    n.includes('cypress')
  ) {
    return {
      bg: 'bg-lime-900/20',
      text: 'text-lime-200',
      border: 'border-lime-700/30',
      dot: 'bg-lime-500'
    };
  }

  // Oud / Agarwood
  if (n.includes('oud') || n.includes('agarwood')) {
    return {
      bg: 'bg-stone-800/80',
      text: 'text-amber-200',
      border: 'border-amber-700/35',
      dot: 'bg-amber-600'
    };
  }

  // Neutral / Musk / Cashmeran / Ambrox / Clean Molecules
  return {
    bg: 'bg-neutral-800/60',
    text: 'text-neutral-200',
    border: 'border-neutral-700/40',
    dot: 'bg-neutral-400'
  };
};

const PerfumeDetailPage = ({
  perfume,
  onBack,
  onLogWear,
  onEdit
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bottleLevels, setBottleLevelsState] = useState(getBottleLevels());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setImgError(false);
    setIsLoaded(false);
  }, [perfume?.id, perfume?.image]);

  if (!perfume) return null;

  const currentLevel = bottleLevels[perfume.id] ?? 90;

  const handleLevelChange = (newVal) => {
    const updated = setBottleLevel(perfume.id, Number(newVal));
    setBottleLevelsState({ ...updated });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${perfume.name} by ${perfume.brand}`,
          text: `Check out ${perfume.name} in Kushal's Fragrance Collection`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${perfume.name} by ${perfume.brand} - ₹${perfume.price}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Luxury Fallback Plaque when image is unavailable
  const renderFallback = () => (
    <div className="w-full h-80 flex flex-col items-center justify-center p-6 text-center bg-[#111111] rounded-2xl border border-white/5 select-none">
      <div className="w-16 h-20 border border-white/20 rounded-t-sm rounded-b-md flex flex-col items-center justify-center p-2 relative mb-4 bg-[#0d0d0d]">
        <div className="w-4 h-2 bg-neutral-600 rounded-t -mt-3 mb-2" />
        <DropletIcon size={20} animateOnHover={false} className="text-neutral-400" />
      </div>
      <span className="text-xs uppercase tracking-widest text-neutral-400">
        {perfume.brand}
      </span>
      <h2 className="text-lg font-semibold text-white mt-1">
        {perfume.name}
      </h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100 pb-20 animate-fade-in">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-white/[0.08] text-neutral-300 hover:text-white text-xs font-medium transition active:scale-95 group"
          >
            <ArrowLeftIcon size={15} animateOnHover={true} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Collection</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-white/[0.08] text-neutral-400 hover:text-white text-xs transition active:scale-95"
              title="Share Fragrance"
            >
              {copied ? (
                <CheckIcon size={14} animateOnHover={true} className="text-emerald-400" />
              ) : (
                <CopyIcon size={14} animateOnHover={true} />
              )}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            {onEdit && (
              <button
                onClick={() => onEdit(perfume)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-white/[0.08] text-neutral-400 hover:text-white text-xs transition active:scale-95"
              >
                <SquarePenIcon size={14} animateOnHover={true} />
                <span className="hidden sm:inline">Edit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* Hero Section: 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Studio Bottle Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/4.5] w-full rounded-2xl bg-[#0e0e0e] border border-white/[0.08] p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-2xl">
              {imgError ? (
                renderFallback()
              ) : (
                <>
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-[#0e0e0e] animate-pulse" />
                  )}
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => {
                      setImgError(true);
                      setIsLoaded(true);
                    }}
                    className={`w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-all duration-500 ease-out ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}

              {/* Concentration Tag Top-Left */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-black/80 text-white border border-white/15 rounded-md backdrop-blur-sm">
                  {perfume.concentration || 'EDP'}
                </span>
                <span className="px-2 py-1 text-[11px] font-medium tracking-wide bg-neutral-900/80 text-neutral-300 border border-white/10 rounded-md backdrop-blur-sm">
                  {perfume.volume || '100ml'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Fragrance Dossier & Identity */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header / Titles */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-neutral-200 text-xs font-semibold tracking-wider uppercase border border-white/10">
                  {perfume.brand}
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  {perfume.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                {perfume.name}
              </h1>

              {perfume.inspiredBy && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">Inspired By:</span>
                  <span className="font-medium text-white">{perfume.inspiredBy}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="p-4 rounded-xl bg-[#121212] border border-white/[0.08] flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                  Price
                </span>
                <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  ₹{Number(perfume.price || 0).toLocaleString('en-IN')}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Bottle:</span>
                <span className="font-medium text-neutral-300">{perfume.volume || '100ml'}</span>
                <span className="text-neutral-600">•</span>
                <span className="font-medium text-neutral-300">{perfume.concentration || 'EDP'}</span>
              </div>
            </div>

            {/* Weather / Season & Occasion Badges */}
            <div className="space-y-3 pt-2">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 block mb-2">
                  Best Seasons:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(perfume.seasonsList || []).map((season, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#181818] text-white text-xs font-medium border border-white/10"
                    >
                      {season}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 block mb-2">
                  Best Occasions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(perfume.occasions || []).map((occ, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#141414] text-neutral-300 text-xs font-medium border border-white/[0.06]"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            {perfume.description && (
              <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.06] space-y-1.5">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
                  About This Perfume
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {perfume.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Fragrance Notes Pyramid */}
        <div className="rounded-2xl bg-[#0f0f0f] border border-white/[0.08] p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Fragrance Notes
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                How this perfume smells as it dries down
              </p>
            </div>
            <div className="text-[11px] text-neutral-500 font-medium">
              Top, Heart & Base Notes
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1: Top Notes (Opening) */}
            <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-semibold text-white tracking-wider uppercase">
                  Top Notes
                </span>
                <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                  <ClockIcon size={11} animateOnHover={true} /> 0 - 30 min
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(perfume.notes?.topNotes || perfume.notes?.top || []).length > 0 ? (
                  (perfume.notes?.topNotes || perfume.notes?.top || []).map((note, idx) => {
                    const style = getNoteColor(note);
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        <span>{note}</span>
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs text-neutral-500 italic">No top notes specified</span>
                )}
              </div>
            </div>

            {/* Phase 2: Heart Notes (Core) */}
            <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-semibold text-white tracking-wider uppercase">
                  Heart Notes
                </span>
                <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                  <ClockIcon size={11} animateOnHover={true} /> 30 min - 4 hrs
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(perfume.notes?.middleNotes || perfume.notes?.middle || []).length > 0 ? (
                  (perfume.notes?.middleNotes || perfume.notes?.middle || []).map((note, idx) => {
                    const style = getNoteColor(note);
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        <span>{note}</span>
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs text-neutral-500 italic">No heart notes specified</span>
                )}
              </div>
            </div>

            {/* Phase 3: Base Notes (Drydown) */}
            <div className="p-4 rounded-xl bg-[#141414] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-semibold text-white tracking-wider uppercase">
                  Base Notes
                </span>
                <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                  <ClockIcon size={11} animateOnHover={true} /> 4 - 12+ hrs
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(perfume.notes?.baseNotes || perfume.notes?.base || []).length > 0 ? (
                  (perfume.notes?.baseNotes || perfume.notes?.base || []).map((note, idx) => {
                    const style = getNoteColor(note);
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        <span>{note}</span>
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs text-neutral-500 italic">No base notes specified</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Main Accords & Performance Radar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Accords Bar Chart */}
          <div className="p-5 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Dominant Scent Accords
            </h3>

            <div className="space-y-2.5">
              {(perfume.accords || []).map((accord, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="capitalize text-neutral-200">{accord.name}</span>
                    <span className="text-neutral-400">{accord.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden bg-[#181818]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${accord.percent}%`,
                        backgroundColor: accord.color || '#D4AF37'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance & Seasonal Breakdown */}
          <div className="p-5 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Performance & Best Time to Wear
              </h3>
              <span className="text-[10px] text-neutral-400 font-medium">Community Verified</span>
            </div>

            {/* Longevity & Sillage Cards - Fully responsive, stacking cleanly on small mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-3.5 bg-[#141414] rounded-xl border border-white/[0.06] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-300">
                  <ClockIcon size={18} animateOnHover={true} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 block">
                    Longevity
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
                    {perfume.performance?.longevity || 'Long Lasting (8+ hrs)'}
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 bg-[#141414] rounded-xl border border-white/[0.06] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-300">
                  <GaugeIcon size={18} animateOnHover={true} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 block">
                    Sillage (Projection)
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
                    {perfume.performance?.sillage || 'Strong'}
                  </div>
                </div>
              </div>
            </div>

            {/* Seasons Breakdown with Mini Progress Meters */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider block">
                Best Seasons
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    name: 'Spring',
                    val: perfume.seasons?.spring ?? 20,
                    icon: CloudSunIcon,
                    color: 'bg-emerald-400',
                    textColor: 'text-emerald-400'
                  },
                  {
                    name: 'Summer',
                    val: perfume.seasons?.summer ?? 10,
                    icon: SunIcon,
                    color: 'bg-amber-400',
                    textColor: 'text-amber-400'
                  },
                  {
                    name: 'Fall',
                    val: perfume.seasons?.fall ?? 35,
                    icon: FlameIcon,
                    color: 'bg-orange-400',
                    textColor: 'text-orange-400'
                  },
                  {
                    name: 'Winter',
                    val: perfume.seasons?.winter ?? 35,
                    icon: SnowflakeIcon,
                    color: 'bg-sky-400',
                    textColor: 'text-sky-400'
                  }
                ].map((s, idx) => {
                  const SIcon = s.icon;
                  return (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#141414] rounded-xl border border-white/[0.06] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                          <SIcon size={12} animateOnHover={true} className={s.textColor} />
                          {s.name}
                        </span>
                        <span className={`text-xs font-bold ${s.textColor}`}>{s.val}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#202020] overflow-hidden">
                        <div
                          className={`h-full ${s.color} rounded-full transition-all duration-500`}
                          style={{ width: `${s.val}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Day / Night Breakdown */}
            <div className="p-3 bg-[#141414] rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                  <SunIcon size={14} animateOnHover={true} className="text-amber-400" />
                  Daytime: <strong className="text-white font-semibold">{perfume.seasons?.day ?? 50}%</strong>
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                  <MoonIcon size={14} animateOnHover={true} className="text-indigo-400" />
                  Nighttime: <strong className="text-white font-semibold">{perfume.seasons?.night ?? 50}%</strong>
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#1e1e1e]">
                <div
                  style={{ width: `${perfume.seasons?.day ?? 50}%` }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                  title={`Daytime: ${perfume.seasons?.day ?? 50}%`}
                />
                <div
                  style={{ width: `${perfume.seasons?.night ?? 50}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                  title={`Nighttime: ${perfume.seasons?.night ?? 50}%`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Direct Purchase / Retailer Links */}
        <div className="p-5 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] space-y-3">
          <h3 className="text-sm font-bold text-white tracking-tight">
            Verified Distributor & Purchase Links
          </h3>

          {perfume.buyLinks && perfume.buyLinks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {perfume.buyLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-[#141414] hover:bg-[#1c1c1c] border border-white/[0.08] hover:border-white/20 rounded-xl transition group active:scale-98"
                >
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:underline">
                      {link.name}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      Direct Authentic Store
                    </div>
                  </div>
                  <LinkIcon size={15} animateOnHover={true} className="text-neutral-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-neutral-500 bg-[#141414] rounded-xl border border-white/5">
              No purchase link currently archived for this bottle.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetailPage;
