import React, { useState, useEffect, useRef } from 'react';
import { DropletIcon } from 'lucide-animated';

const PerfumeCard = ({
  perfume,
  onSelect,
  viewMode = 'grid'
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [perfume.image]);

  // Minimalist Luxury Fallback when image fails
  const renderFallback = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-[#111111] select-none">
      <div className="w-10 h-12 border border-white/20 rounded-t-sm rounded-b-md flex flex-col items-center justify-center p-1 relative mb-2 bg-[#0d0d0d]">
        <div className="w-3 h-1.5 bg-neutral-600 rounded-t -mt-2.5 mb-1" />
        <DropletIcon size={14} animateOnHover={false} className="text-neutral-400" />
      </div>
      <span className="text-[10px] text-neutral-400 uppercase tracking-widest line-clamp-1 font-medium">
        {perfume.brand}
      </span>
      <span className="text-xs font-semibold text-neutral-200 line-clamp-1 mt-0.5">
        {perfume.name}
      </span>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onSelect(perfume)}
        className="vault-card-interactive rounded-2xl p-3 flex items-center gap-3.5 cursor-pointer group hover:bg-[#121212] transition-colors"
      >
        {/* Thumbnail */}
        <div className="relative w-20 h-24 rounded-xl bg-[#0c0c0c] border border-white/[0.08] overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
          {imgError ? (
            renderFallback()
          ) : (
            <>
              {!isLoaded && (
                <div className="absolute inset-0 bg-[#121212] flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <img
                src={perfume.image}
                alt={perfume.name}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  setImgError(true);
                  setIsLoaded(true);
                }}
                className={`w-full h-full object-contain group-hover:scale-105 transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          )}
          {perfume.concentration && (
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-black/85 text-neutral-200 rounded border border-white/10">
              {perfume.concentration}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-[11px] tracking-wider uppercase text-neutral-400 font-semibold truncate">
              {perfume.brand}
            </span>
            <span className="text-[11px] text-neutral-400 font-medium">
              {perfume.volume || '100ml'}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-white truncate group-hover:text-neutral-200 transition-colors">
            {perfume.name}
          </h3>

          {perfume.inspiredBy && (
            <div className="text-[11px] text-neutral-400 tracking-wide mt-0.5 truncate">
              Inspired by: <span className="text-neutral-300 font-medium">{perfume.inspiredBy}</span>
            </div>
          )}

          {/* Season & Occasion tags */}
          <div className="flex items-center gap-1.5 mt-2 overflow-hidden">
            {(perfume.seasonsList || []).slice(0, 1).map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium tracking-wide px-2 py-0.5 bg-[#181818] text-neutral-200 rounded-md border border-white/10"
              >
                {s}
              </span>
            ))}
            {(perfume.occasions || []).slice(0, 1).map((o, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium tracking-wide px-2 py-0.5 bg-[#141414] text-neutral-400 rounded-md border border-white/5 truncate"
              >
                {o}
              </span>
            ))}
          </div>

          {/* Price & Vol */}
          <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-white/[0.06]">
            <span className="text-sm font-bold text-white">
              ₹{Number(perfume.price || 0).toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-neutral-400 font-medium">
              {perfume.volume || '100ml'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card View (Default)
  return (
    <div
      onClick={() => onSelect(perfume)}
      className="vault-card-interactive rounded-2xl overflow-hidden flex flex-col cursor-pointer group hover:border-white/20 transition-all duration-300"
    >
      {/* Bottle Image Showcase Container */}
      <div className="relative aspect-[4/4.5] w-full bg-[#0d0d0d] border-b border-white/[0.06] flex items-center justify-center p-4 overflow-hidden">
        {imgError ? (
          renderFallback()
        ) : (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 bg-[#121212] flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <img
              ref={imgRef}
              src={perfume.image}
              alt={perfume.name}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setImgError(true);
                setIsLoaded(true);
              }}
              className={`w-full h-full object-contain group-hover:scale-105 transition-opacity duration-300 ease-out ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        )}

        {/* Top Left Concentration Pill */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
          <span className="px-2 py-0.5 text-[9.5px] font-semibold tracking-wider uppercase bg-black/85 text-neutral-200 border border-white/15 rounded-md backdrop-blur-sm">
            {perfume.concentration || 'EDP'}
          </span>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-[#111111]">
        <div>
          {/* Brand */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-400 font-semibold truncate">
              {perfume.brand}
            </span>
            <span className="text-[10px] text-neutral-500 font-medium truncate">
              {perfume.volume || '100ml'}
            </span>
          </div>

          {/* Fragrance Name */}
          <h3 className="font-semibold text-sm text-neutral-100 line-clamp-1 group-hover:text-white transition-colors">
            {perfume.name}
          </h3>

          {perfume.inspiredBy && (
            <div className="text-[11px] text-neutral-400 mt-1 truncate">
              Inspired by: <span className="text-neutral-300 font-medium">{perfume.inspiredBy}</span>
            </div>
          )}

          {/* Seasons & Occasion Tags */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {(perfume.seasonsList || []).slice(0, 1).map((season, idx) => (
              <span
                key={idx}
                className="text-[9.5px] font-medium tracking-wide px-2 py-0.5 rounded-md bg-[#181818] text-neutral-300 border border-white/10"
              >
                {season}
              </span>
            ))}
            {(perfume.occasions || []).slice(0, 1).map((occ, idx) => (
              <span
                key={idx}
                className="text-[9.5px] font-medium tracking-wide px-2 py-0.5 rounded-md bg-[#141414] text-neutral-400 border border-white/5 truncate max-w-[120px]"
              >
                {occ}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with Price */}
        <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <div className="text-sm sm:text-base font-bold text-white tracking-tight">
            ₹{Number(perfume.price || 0).toLocaleString('en-IN')}
          </div>

          <span className="text-[11px] font-semibold text-neutral-400 group-hover:text-white transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerfumeCard;