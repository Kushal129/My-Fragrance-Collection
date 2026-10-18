import React from 'react';
import { ChartBarIncreasingIcon } from 'lucide-animated';

const AnalyticsView = ({ perfumes, sotdLogs }) => {
  // Total Valuation
  const totalValue = perfumes.reduce(
    (acc, p) => acc + (parseInt(p.price) || 0),
    0
  );

  // Average Price
  const avgPrice = Math.round(totalValue / (perfumes.length || 1));

  // Average Rating
  const avgRating = (
    perfumes.reduce((acc, p) => acc + (parseFloat(p.rating) || 4.3), 0) /
    (perfumes.length || 1)
  ).toFixed(2);

  // Brand Distribution
  const brandCounts = perfumes.reduce((acc, p) => {
    acc[p.brand] = (acc[p.brand] || 0) + 1;
    return acc;
  }, {});

  const sortedBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);

  // Concentration Breakdown
  const concentrationCounts = perfumes.reduce((acc, p) => {
    const conc = p.concentration || 'EDP';
    acc[conc] = (acc[conc] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      {/* Header Banner */}
      <div className="vault-panel rounded-2xl p-6 border border-white/[0.08]">
        <div className="flex items-center gap-3 mb-2">
          <ChartBarIncreasingIcon size={22} className="text-white" animateOnHover={true} />
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Collection Overview
            </h2>
            <p className="text-[11px] text-neutral-400">
              Total bottles, brands, and price summary
            </p>
          </div>
        </div>
        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          See total collection value, breakdown by brand, and perfume strength.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Value */}
        <div className="vault-panel p-3.5 rounded-xl border border-white/[0.08] space-y-1">
          <div className="text-[10px] tracking-widest uppercase text-neutral-400">
            TOTAL VALUE
          </div>
          <div className="text-base sm:text-lg font-semibold text-white">
            ₹{totalValue.toLocaleString('en-IN')}
          </div>
          <div className="text-[9px] text-neutral-400">
            {perfumes.length} TOTAL BOTTLES
          </div>
        </div>

        {/* Total Brands */}
        <div className="vault-panel p-3.5 rounded-xl border border-white/[0.08] space-y-1">
          <div className="text-[10px] tracking-widest uppercase text-neutral-400">
            BRANDS
          </div>
          <div className="text-base sm:text-lg font-semibold text-white">
            {Object.keys(brandCounts).length}
          </div>
          <div className="text-[9px] text-neutral-400">
            TOTAL BRANDS
          </div>
        </div>

        {/* Avg Price */}
        <div className="vault-panel p-3.5 rounded-xl border border-white/[0.08] space-y-1">
          <div className="text-[10px] tracking-widest uppercase text-neutral-400">
            AVERAGE PRICE
          </div>
          <div className="text-base sm:text-lg font-semibold text-white">
            ₹{avgPrice.toLocaleString('en-IN')}
          </div>
          <div className="text-[9px] text-neutral-400">
            PER BOTTLE
          </div>
        </div>

        {/* Fragrantica Rating */}
        <div className="vault-panel p-3.5 rounded-xl border border-white/[0.08] space-y-1">
          <div className="text-[10px] tracking-widest uppercase text-neutral-400">
            AVG RATING
          </div>
          <div className="text-base sm:text-lg font-semibold text-white">
            {avgRating} <span className="text-[10px] text-neutral-400 font-normal">/ 5.0</span>
          </div>
          <div className="text-[9px] text-neutral-400">
            COMMUNITY RATING
          </div>
        </div>
      </div>

      {/* House Distribution */}
      <div className="vault-panel p-4 rounded-xl border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-2">
          <h3 className="tracking-widest uppercase text-white font-semibold text-[11px]">
            BOTTLES PER BRAND
          </h3>
          <span className="text-[10px] text-neutral-400">COUNT</span>
        </div>

        <div className="space-y-2.5">
          {sortedBrands.map(([brand, count], idx) => {
            const percentage = Math.round((count / perfumes.length) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300 font-medium">{brand}</span>
                  <span className="text-neutral-400 font-mono text-[11px]">
                    {count} {count === 1 ? 'bottle' : 'bottles'} ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden bg-[#181818]">
                  <div
                    className="h-full bg-white/80 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concentration Breakdown */}
      <div className="vault-panel p-4 rounded-xl border border-white/[0.08] space-y-3">
        <h3 className="tracking-widest uppercase text-white font-semibold text-[11px] border-b border-white/[0.06] pb-2">
          PERFUME STRENGTH & TYPE
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {Object.entries(concentrationCounts).map(([conc, count], idx) => (
            <div
              key={idx}
              className="p-3 bg-[#131313] rounded-lg border border-white/[0.05] space-y-1"
            >
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                {conc}
              </span>
              <span className="text-lg font-semibold text-white block">
                {count}
              </span>
              <span className="text-[9px] text-neutral-500 block">
                {Math.round((count / perfumes.length) * 100)}% of collection
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
