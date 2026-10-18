import React, { useState } from 'react';
import { CompassIcon } from 'lucide-animated';
import PerfumeCard from './PerfumeCard.jsx';

const POPULAR_NOTES = [
  'Vanilla',
  'Bergamot',
  'Pineapple',
  'Lavender',
  'Cinnamon',
  'Amber',
  'Vetiver',
  'Oud',
  'Mint',
  'Apple',
  'Pepper',
  'Marine Note',
  'Coffee',
  'Iris',
  'Rose',
  'Tonka Bean',
  'Sandalwood',
  'Leather'
];

const NotesExplorer = ({
  perfumes,
  onSelectPerfume
}) => {
  const [selectedNote, setSelectedNote] = useState('Vanilla');

  // Filter perfumes that contain this note in topNotes, middleNotes, or baseNotes
  const matchingPerfumes = perfumes.filter((p) => {
    if (!selectedNote) return true;
    const search = selectedNote.toLowerCase();
    const allNotes = [
      ...(p.notes?.topNotes || p.notes?.top || []),
      ...(p.notes?.middleNotes || p.notes?.middle || []),
      ...(p.notes?.baseNotes || p.notes?.base || [])
    ].map((n) => n.toLowerCase());

    const inNotes = allNotes.some((n) => n.includes(search));
    const inAccords = (p.accords || []).some((a) =>
      a.name.toLowerCase().includes(search)
    );
    return inNotes || inAccords;
  });

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      {/* Header */}
      <div className="vault-panel rounded-2xl p-6 border border-white/[0.08]">
        <div className="flex items-center gap-3 mb-2">
          <CompassIcon size={22} className="text-white" animateOnHover={true} />
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Notes & Fragrances
            </h2>
            <p className="text-xs text-neutral-400">
              Find perfumes by notes and ingredients
            </p>
          </div>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          Select any note below to see every perfume in your collection that contains it.
        </p>
      </div>

      {/* Note Chips */}
      <div>
        <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-3">
          Select a Note:
        </h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR_NOTES.map((note) => {
            const isSelected = selectedNote.toLowerCase() === note.toLowerCase();
            return (
              <button
                key={note}
                onClick={() => setSelectedNote(note)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-white text-black font-semibold border-white shadow-sm'
                    : 'bg-[#141414] text-neutral-300 hover:text-white border-white/[0.08]'
                }`}
              >
                {note}
              </button>
            );
          })}
        </div>
      </div>

      {/* Matching Results Header */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
        <span className="text-white uppercase tracking-wider font-semibold">
          PERFUMES WITH {selectedNote.toUpperCase()}
        </span>
        <span className="text-neutral-400">
          {matchingPerfumes.length} {matchingPerfumes.length === 1 ? 'PERFUME' : 'PERFUMES'}
        </span>
      </div>

      {/* Matching Perfume Grid */}
      {matchingPerfumes.length === 0 ? (
        <div className="vault-panel rounded-xl p-8 text-center text-xs text-neutral-500">
          No perfumes found with note: {selectedNote}.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {matchingPerfumes.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              onSelect={onSelectPerfume}
              viewMode="grid"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesExplorer;
