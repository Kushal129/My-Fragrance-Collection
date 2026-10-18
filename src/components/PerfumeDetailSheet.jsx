import React, { useState, useEffect } from 'react';
import {
  XIcon,
  CheckIcon,
  ClockIcon,
  DropletIcon,
  LinkIcon,
  SquarePenIcon
} from 'lucide-animated';
import { getBottleLevels, setBottleLevel } from '../services/storage.js';

const PerfumeDetailSheet = ({
  perfume,
  isOpen,
  onClose,
  onLogWear,
  onEdit
}) => {
  const [activeTab, setActiveTab] = useState('pyramid'); // 'pyramid' | 'accords' | 'performance' | 'retailers'
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [bottleLevels, setBottleLevelsState] = useState(getBottleLevels());

  useEffect(() => {
    setImgError(false);
  }, [perfume?.image]);

  if (!isOpen || !perfume) return null;

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
          text: `Inspect ${perfume.name} in Kushal's Fragrance Collection`,
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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm transition-opacity">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Container */}
      <div className="relative w-full max-w-2xl bg-[#0e0e0e] border-t sm:border border-white/10 sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden z-10 animate-slide-up">
        {/* Mobile Swipe Bar Handle */}
        <div className="w-full flex justify-center pt-2 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-neutral-700 rounded-full" />
        </div>

        {/* Top Header Actions */}
        <div className="px-5 py-3 border-b border-white/[0.08] flex items-center justify-between bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-300 px-2 py-0.5 bg-neutral-900 border border-neutral-700 rounded">
              {perfume.brand}
            </span>
            <span className="font-mono text-[10px] text-neutral-400">
              {perfume.volume} • {perfume.concentration || 'EDP'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(perfume);
                }}
                className="p-2 rounded-lg bg-[#141414] text-neutral-400 hover:text-white transition"
                aria-label="Edit perfume"
              >
                <SquarePenIcon size={16} animateOnHover={true} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#141414] text-neutral-400 hover:text-white transition ml-1"
              aria-label="Close"
            >
              <XIcon size={16} animateOnHover={true} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 py-4 space-y-5 flex-1 overscroll-contain">
          {/* Hero Section: Bottle Image & Metadata */}
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            <div className="relative w-40 h-44 sm:w-44 sm:h-48 rounded-xl bg-[#141414] border border-white/[0.08] flex items-center justify-center p-3 flex-shrink-0">
              {imgError ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center">
                  <DropletIcon size={24} className="text-neutral-500 mb-1" />
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                    {perfume.brand}
                  </span>
                  <span className="text-xs text-neutral-300 font-medium line-clamp-1 mt-0.5">
                    {perfume.name}
                  </span>
                </div>
              ) : (
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              )}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2 py-0.5 bg-black/80 rounded text-[9px] font-mono border border-white/5">
                <span className="text-neutral-400">JUICE: {currentLevel}%</span>
                <span className="text-neutral-200">{perfume.volume}</span>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#181818] border border-white/10 text-neutral-300 font-mono text-[10px]">
                <span>INDEX {perfume.rating} / 5.0</span>
                <span className="text-neutral-400">({(perfume.votes || 3500).toLocaleString()} VOTES)</span>
              </div>

              <h2 className="text-base sm:text-xl font-medium text-white tracking-tight">
                {perfume.name}
              </h2>

              {perfume.inspiredBy && (
                <div className="font-mono text-[10px] text-neutral-300 bg-[#141414] border border-white/10 px-2.5 py-1 rounded inline-block">
                  DNA PROFILE: <strong className="text-white font-semibold">{perfume.inspiredBy}</strong>
                </div>
              )}

              {/* Seasons & Occasion Tags */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 pt-0.5">
                {(perfume.seasonsList || []).map((s, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1c1c1c] text-neutral-200 border border-white/10"
                  >
                    {s}
                  </span>
                ))}
                {(perfume.occasions || []).map((o, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#161616] text-neutral-400 border border-white/5"
                  >
                    {o}
                  </span>
                ))}
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                {perfume.description}
              </p>

              {/* Price & Journal Action */}
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 flex-wrap">
                <div>
                  <span className="font-mono text-[10px] text-neutral-400 block uppercase">Valuation</span>
                  <span className="font-mono text-lg font-semibold text-white">
                    ₹{Number(perfume.price || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onLogWear(perfume);
                  }}
                  className="px-3.5 py-2 bg-white text-black hover:bg-neutral-200 font-mono text-xs font-semibold rounded-lg active:scale-95 transition"
                >
                  LOG IN DAILY JOURNAL
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation for Detailed Sections */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#121212] rounded-lg border border-white/5">
            {[
              { id: 'pyramid', label: 'PYRAMID' },
              { id: 'accords', label: 'ACCORDS' },
              { id: 'performance', label: 'SETTINGS' },
              { id: 'retailers', label: 'RETAIL' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-1.5 text-[10px] font-mono tracking-widest rounded transition-all ${
                  activeTab === tab.id
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Fragrance Pyramid (Notes) */}
          {activeTab === 'pyramid' && (
            <div className="space-y-3 animate-fade-in font-mono">
              {/* Top Notes */}
              <div className="vault-panel rounded-xl p-3.5 border border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] tracking-widest uppercase text-neutral-300 font-semibold">
                    OPENING (TOP NOTES)
                  </h4>
                  <span className="text-[9px] text-neutral-500">0 - 30 MIN</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(perfume.notes?.topNotes || perfume.notes?.top || []).map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#181818] text-neutral-300 text-xs rounded border border-white/5"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Heart Notes */}
              <div className="vault-panel rounded-xl p-3.5 border border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] tracking-widest uppercase text-neutral-300 font-semibold">
                    CORE (HEART NOTES)
                  </h4>
                  <span className="text-[9px] text-neutral-500">2 - 5 HOURS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(perfume.notes?.middleNotes || perfume.notes?.middle || []).map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#181818] text-neutral-300 text-xs rounded border border-white/5"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div className="vault-panel rounded-xl p-3.5 border border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] tracking-widest uppercase text-neutral-300 font-semibold">
                    DRYDOWN (BASE NOTES)
                  </h4>
                  <span className="text-[9px] text-neutral-500">6 - 12+ HOURS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(perfume.notes?.baseNotes || perfume.notes?.base || []).map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#181818] text-neutral-300 text-xs rounded border border-white/5"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Fragrantica Main Accords Breakdown */}
          {activeTab === 'accords' && (
            <div className="space-y-3 animate-fade-in font-mono">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] tracking-widest uppercase text-neutral-400">
                  Fragrantica Proportional Olfactory Weights
                </h4>
              </div>

              <div className="space-y-2">
                {(perfume.accords || []).map((accord, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="uppercase text-neutral-300 text-[11px]">
                        {accord.name}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {accord.percent}%
                      </span>
                    </div>
                    {/* Minimalist Proportional Line */}
                    <div className="w-full h-1.5 bg-[#1c1c1c] rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${accord.percent}%`
                        }}
                        className="h-full bg-neutral-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Settings & Performance */}
          {activeTab === 'performance' && (
            <div className="space-y-4 animate-fade-in font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="vault-panel p-3 rounded-xl border border-white/[0.08]">
                  <div className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">
                    LONGEVITY
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {perfume.performance?.longevity || '8-10 Hours'}
                  </div>
                </div>

                <div className="vault-panel p-3 rounded-xl border border-white/[0.08]">
                  <div className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">
                    SILLAGE / PROJECTION
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {perfume.performance?.sillage || 'Strong'}
                  </div>
                </div>
              </div>

              {/* Seasons Distribution */}
              <div className="vault-panel p-3.5 rounded-xl border border-white/[0.08] space-y-2.5">
                <h4 className="text-[10px] tracking-widest uppercase text-neutral-400">
                  SEASONAL RADAR
                </h4>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: 'SPRING', val: perfume.seasons?.spring ?? 30 },
                    { label: 'SUMMER', val: perfume.seasons?.summer ?? 40 },
                    { label: 'FALL', val: perfume.seasons?.fall ?? 20 },
                    { label: 'WINTER', val: perfume.seasons?.winter ?? 10 }
                  ].map((s, idx) => (
                    <div key={idx} className="bg-[#161616] p-2 rounded-lg border border-white/5">
                      <span className="text-[9px] uppercase text-neutral-400 block">
                        {s.label}
                      </span>
                      <span className="text-sm font-semibold text-white block my-0.5">
                        {s.val}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                    <span>DAY: {perfume.seasons?.day ?? 60}%</span>
                    <span>NIGHT: {perfume.seasons?.night ?? 40}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-[#1a1a1a]">
                    <div
                      style={{ width: `${perfume.seasons?.day ?? 60}%` }}
                      className="h-full bg-neutral-300"
                    />
                    <div
                      style={{ width: `${perfume.seasons?.night ?? 40}%` }}
                      className="h-full bg-neutral-600"
                    />
                  </div>
                </div>
              </div>

              {/* Bottle Level Slider */}
              <div className="vault-panel p-3.5 rounded-xl border border-white/[0.08] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] tracking-widest uppercase text-neutral-400">
                    JUICE REMAINING
                  </span>
                  <span className="font-semibold text-white">{currentLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentLevel}
                  onChange={(e) => handleLevelChange(e.target.value)}
                  className="w-full accent-neutral-300 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Buy Links & Retailers */}
          {activeTab === 'retailers' && (
            <div className="space-y-2.5 animate-fade-in font-mono">
              <h4 className="text-[10px] tracking-widest uppercase text-neutral-400">
                VERIFIED DISTRIBUTORS
              </h4>

              {perfume.buyLinks && perfume.buyLinks.length > 0 ? (
                <div className="space-y-2">
                  {perfume.buyLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-[#141414] hover:bg-[#1c1c1c] border border-white/[0.06] rounded-lg transition group"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:underline">
                          {link.name.toUpperCase()}
                        </div>
                        <div className="text-[9px] text-neutral-400">
                          DIRECT RETAIL ACCESS
                        </div>
                      </div>
                      <LinkIcon size={14} animateOnHover={true} className="text-neutral-400 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-neutral-500 bg-[#141414] rounded-lg">
                  NO DIRECT PURCHASE LINK AVAILABLE
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetailSheet;
