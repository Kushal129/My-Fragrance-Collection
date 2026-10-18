import React, { useState } from 'react';
import {
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  ChevronRightIcon
} from 'lucide-animated';
import LuxuryDropdown from './LuxuryDropdown.jsx';

const SOTDView = ({
  perfumes,
  logs,
  onSaveLog,
  onSelectPerfume,
  preselectedPerfume = null
}) => {
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(
    preselectedPerfume ? preselectedPerfume.id : perfumes[0]?.id || '1'
  );
  const [sprays, setSprays] = useState(5);
  const [occasion, setOccasion] = useState('Office / Work');
  const [weather, setWeather] = useState('Pleasant 26°C');
  const [note, setNote] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  const occasions = [
    'Office / Work',
    'Evening / Clubbing',
    'Date Night',
    'Casual Daily',
    'Sport / Gym',
    'Formal Event'
  ];

  const weatherOptions = [
    'Summer Heat 32°C+',
    'Monsoon / Humid 25°C',
    'Moderate 24°C',
    'Indoor Air-Conditioned',
    'Cool Weather 18°C'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const chosen = perfumes.find((p) => p.id === selectedPerfumeId);
    if (!chosen) return;

    onSaveLog({
      perfumeId: chosen.id,
      perfumeName: chosen.name,
      perfumeBrand: chosen.brand,
      perfumeImage: chosen.image,
      sprays,
      occasion,
      weather,
      note,
      rating: 5
    });

    setSavedToast(true);
    setNote('');
    setTimeout(() => setSavedToast(false), 3000);
  };

  const selectedPerfume = perfumes.find((p) => p.id === selectedPerfumeId);

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Header Banner */}
      <div className="vault-panel rounded-2xl p-6 border border-white/[0.08]">
        <div className="flex items-center gap-3 mb-2">
          <CalendarDaysIcon size={22} className="text-white" animateOnHover={true} />
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Wear Journal (SOTD)
            </h2>
            <p className="text-xs text-neutral-400">
              Daily Rotation & Application Tracker
            </p>
          </div>
        </div>
        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          Log daily applications, evaluate performance across weather conditions, and document scent evolutions.
        </p>
      </div>

      {/* Logger Form Card */}
      <form
        onSubmit={handleSubmit}
        className="vault-panel rounded-xl p-5 border border-white/[0.08] space-y-4"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <h3 className="text-xs font-semibold text-white tracking-wider uppercase">
            Record Daily Wear
          </h3>
          <span className="text-[10px] text-neutral-400 font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700">
            {new Date().toISOString().split('T')[0]}
          </span>
        </div>

        {/* Perfume Selector */}
        <div>
          <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1.5">
            Select Perfume
          </label>
          <LuxuryDropdown
            value={selectedPerfumeId}
            onChange={setSelectedPerfumeId}
            options={perfumes.map((p) => ({
              value: p.id,
              label: `${p.brand} - ${p.name}`
            }))}
            searchable={true}
            placeholder="Select a perfume..."
          />
        </div>

        {/* Selected Perfume Quick Preview */}
        {selectedPerfume && (
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#141414] border border-white/[0.06]">
            <img
              src={selectedPerfume.image}
              alt={selectedPerfume.name}
              className="w-10 h-10 object-contain rounded bg-[#0c0c0c] p-0.5"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 block truncate">
                {selectedPerfume.brand}
              </span>
              <h4 className="text-xs font-medium text-white truncate font-sans">
                {selectedPerfume.name}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onSelectPerfume(selectedPerfume)}
              className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider px-2 py-1 bg-neutral-800 rounded"
            >
              DETAILS
            </button>
          </div>
        )}

        {/* Sprays Counter */}
        <div>
          <div className="flex justify-between items-center mb-1.5 text-xs">
            <span className="text-[10px] tracking-widest text-neutral-400 uppercase">
              Sprays Count
            </span>
            <span className="font-semibold text-white font-mono">
              {sprays} SPRAYS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSprays(Math.max(1, sprays - 1))}
              className="w-9 h-9 rounded-lg bg-[#181818] text-white hover:bg-neutral-700 active:scale-95 transition flex items-center justify-center font-bold"
            >
              -
            </button>
            <div className="flex-1 flex gap-1.5">
              {[3, 5, 8, 10].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSprays(preset)}
                  className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition ${
                    sprays === preset
                      ? 'bg-white text-black font-semibold'
                      : 'bg-[#181818] text-neutral-400 hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSprays(sprays + 1)}
              className="w-9 h-9 rounded-lg bg-[#181818] text-white hover:bg-neutral-700 active:scale-95 transition flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Occasion & Weather */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
              Occasion
            </label>
            <LuxuryDropdown
              value={occasion}
              onChange={setOccasion}
              options={occasions}
              placeholder="Select occasion..."
            />
          </div>

          <div>
            <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
              Atmosphere / Setting
            </label>
            <LuxuryDropdown
              value={weather}
              onChange={setWeather}
              options={weatherOptions}
              placeholder="Select atmosphere..."
            />
          </div>
        </div>

        {/* Notes Input */}
        <div>
          <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
            Notes & Thoughts
          </label>
          <input
            type="text"
            placeholder="How does it smell today? Longevity, compliments, feelings..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 font-sans focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-semibold rounded-lg active:scale-98 transition tracking-wide"
        >
          Save to Journal
        </button>

        {savedToast && (
          <div className="flex items-center justify-center gap-1.5 text-neutral-300 text-xs pt-1">
            <CheckIcon size={14} animateOnHover={false} />
            <span>Saved to your journal</span>
          </div>
        )}
      </form>

      {/* History */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white tracking-wider uppercase">
            Wear Log History
          </h3>
          <span className="text-[10px] text-neutral-400 font-mono">
            {logs.length} ENTRIES
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="vault-panel rounded-xl p-6 text-center text-xs text-neutral-500">
            No entries recorded yet.
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => {
              const matchingPerfume =
                perfumes.find((p) => p.id === log.perfumeId) || {
                  name: log.perfumeName || 'Perfume',
                  brand: log.perfumeBrand || 'Brand',
                  image: log.perfumeImage || ''
                };

              return (
                <div
                  key={log.id}
                  onClick={() => onSelectPerfume(matchingPerfume)}
                  className="vault-panel rounded-xl p-3 flex items-center justify-between gap-3 border border-white/[0.06] hover:border-white/20 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={matchingPerfume.image}
                      alt={matchingPerfume.name}
                      className="w-10 h-10 object-contain rounded bg-[#0d0d0d] p-0.5 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 truncate font-mono">
                          {matchingPerfume.brand}
                        </span>
                        <span className="text-[9px] text-neutral-500 font-mono">• {log.date}</span>
                      </div>
                      <h4 className="text-xs font-medium text-white truncate font-sans group-hover:underline">
                        {matchingPerfume.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5 font-mono">
                        <span className="text-neutral-200">{log.sprays} SPRAYS</span>
                        <span>•</span>
                        <span className="truncate">{log.occasion}</span>
                      </div>
                      {log.note && (
                        <p className="text-[10px] text-neutral-400 italic truncate mt-0.5 font-sans">
                          "{log.note}"
                        </p>
                      )}
                    </div>
                  </div>

                  <ChevronRightIcon size={14} animateOnHover={true} className="text-neutral-500 group-hover:text-white flex-shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SOTDView;
