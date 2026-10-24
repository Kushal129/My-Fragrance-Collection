import React, { useState, useEffect } from 'react';
import { XIcon, CheckIcon, DeleteIcon } from 'lucide-animated';
import { ACCORD_COLORS } from '../data/perfumes.js';
import LuxuryDropdown from './LuxuryDropdown.jsx';

const PerfumeFormSheet = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  onDelete = null
}) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    volume: '100ml',
    concentration: 'EDP',
    category: 'Arabian / Middle Eastern',
    price: '',
    originalPrice: '',
    inspiredBy: '',
    image: '',
    topNotes: '',
    middleNotes: '',
    baseNotes: '',
    accords: '',
    seasonsList: 'All Weather',
    occasions: 'Office / Work, Casual / Daily',
    buyLinkUrl: '',
    buyLinkName: 'Amazon',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        brand: initialData.brand || '',
        volume: initialData.volume || '100ml',
        concentration: initialData.concentration || 'EDP',
        category: initialData.category || 'Arabian / Middle Eastern',
        price: initialData.price || '',
        originalPrice: initialData.originalPrice || '',
        inspiredBy: initialData.inspiredBy || '',
        image: initialData.image || '',
        topNotes: (initialData.notes?.topNotes || initialData.notes?.top || []).join(', '),
        middleNotes: (initialData.notes?.middleNotes || initialData.notes?.middle || []).join(', '),
        baseNotes: (initialData.notes?.baseNotes || initialData.notes?.base || []).join(', '),
        accords: (initialData.accords || []).map((a) => a.name).join(', '),
        seasonsList: (initialData.seasonsList || []).join(', ') || 'All Weather',
        occasions: (initialData.occasions || []).join(', ') || 'Casual / Daily',
        buyLinkUrl: initialData.buyLinks?.[0]?.url || initialData.buyLink || '',
        buyLinkName: initialData.buyLinks?.[0]?.name || 'Retailer',
        description: initialData.description || ''
      });
    } else {
      setFormData({
        name: '',
        brand: '',
        volume: '100ml',
        concentration: 'EDP',
        category: 'Arabian / Middle Eastern',
        price: '',
        originalPrice: '',
        inspiredBy: '',
        image: '',
        topNotes: '',
        middleNotes: '',
        baseNotes: '',
        accords: 'woody, citrus, amber',
        seasonsList: 'Summer, Monsoon',
        occasions: 'Office / Work, Casual / Daily',
        buyLinkUrl: '',
        buyLinkName: 'Amazon',
        description: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const splitAndTrim = (str) =>
      str
        ? str
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const accordsArray = splitAndTrim(formData.accords).map((accName, idx) => {
      const lower = accName.toLowerCase();
      return {
        name: accName,
        percent: Math.max(50, 95 - idx * 10),
        color: ACCORD_COLORS[lower] || '#8D6E63'
      };
    });

    const savedPerfume = {
      id: initialData ? initialData.id : 'custom-' + Date.now(),
      name: formData.name,
      brand: formData.brand,
      volume: formData.volume,
      concentration: formData.concentration,
      category: formData.category,
      price: formData.price,
      originalPrice: formData.originalPrice || formData.price,
      inspiredBy: formData.inspiredBy,
      image:
        formData.image ||
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
      notes: {
        topNotes: splitAndTrim(formData.topNotes),
        middleNotes: splitAndTrim(formData.middleNotes),
        baseNotes: splitAndTrim(formData.baseNotes)
      },
      accords: accordsArray.length > 0 ? accordsArray : [
        { name: 'woody', percent: 85, color: '#8D6E63' },
        { name: 'amber', percent: 75, color: '#FFA000' }
      ],
      seasonsList: splitAndTrim(formData.seasonsList),
      occasions: splitAndTrim(formData.occasions),
      seasons: initialData?.seasons || {
        spring: 30,
        summer: 35,
        fall: 20,
        winter: 15,
        day: 65,
        night: 35
      },
      performance: initialData?.performance || {
        longevity: 'Long Lasting (8 hrs)',
        sillage: 'Strong'
      },
      buyLinks: formData.buyLinkUrl
        ? [{ name: formData.buyLinkName, url: formData.buyLinkUrl }]
        : initialData?.buyLinks || [],
      description: formData.description
    };

    onSave(savedPerfume);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#0e0e0e] border-t sm:border border-white/10 sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden z-10 animate-slide-up font-mono">
        {/* Mobile Swipe Handle */}
        <div className="w-full flex justify-center pt-2 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-neutral-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 border-b border-white/[0.08] flex items-center justify-between bg-[#0a0a0a]">
          <h3 className="text-xs font-semibold text-white tracking-widest uppercase">
            {initialData ? 'EDIT PERFUME' : 'ADD NEW PERFUME'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#181818] text-neutral-400 hover:text-white"
          >
            <XIcon size={16} animateOnHover={true} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
                Perfume Name *
              </label>
              <input
                type="text"
                required
                placeholder="Lattafa Khamrah"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
                House / Brand *
              </label>
              <input
                type="text"
                required
                placeholder="Lattafa, Afnan, Creed"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">Price (₹) *</label>
              <input
                type="number"
                required
                placeholder="2499"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">Volume</label>
              <input
                type="text"
                placeholder="100ml"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">Concentration</label>
              <LuxuryDropdown
                value={formData.concentration}
                onChange={(val) => setFormData({ ...formData, concentration: val })}
                options={[
                  'EDP',
                  'EDT',
                  'Extrait',
                  'PP',
                  'Attar'
                ]}
                placeholder="Concentration..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
                Category
              </label>
              <LuxuryDropdown
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
                options={[
                  'Arabian / Middle Eastern',
                  'Designer',
                  'Niche',
                  'Budget Beast'
                ]}
                placeholder="Category..."
              />
            </div>

            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
                Inspired By / Smells Like
              </label>
              <input
                type="text"
                placeholder="Parfums de Marly Althaïr"
                value={formData.inspiredBy}
                onChange={(e) => setFormData({ ...formData, inspiredBy: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
              Perfume Image URL
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Seasonal & Occasions Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
                Seasons (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="Summer, Monsoon, Winter"
                value={formData.seasonsList}
                onChange={(e) => setFormData({ ...formData, seasonsList: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
                Occasions (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="Office / Work, Party / Clubbing"
                value={formData.occasions}
                onChange={(e) => setFormData({ ...formData, occasions: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* Fragrantica Pyramid Notes */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            <h4 className="text-[10px] tracking-widest uppercase text-neutral-400 font-semibold">
              Fragrance Notes (Comma Separated)
            </h4>

            <div>
              <label className="text-[9px] text-neutral-500 uppercase block mb-0.5">Top Notes (Opening)</label>
              <input
                type="text"
                placeholder="Bergamot, Lemon, Apple, Mint"
                value={formData.topNotes}
                onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="text-[9px] text-neutral-500 uppercase block mb-0.5">Heart Notes (Core)</label>
              <input
                type="text"
                placeholder="Lavender, Cinnamon, Cardamom"
                value={formData.middleNotes}
                onChange={(e) => setFormData({ ...formData, middleNotes: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="text-[9px] text-neutral-500 uppercase block mb-0.5">Base Notes (Drydown)</label>
              <input
                type="text"
                placeholder="Vanilla, Amber, Cedarwood, Musk"
                value={formData.baseNotes}
                onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Describe how this perfume smells, projection, and performance..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-2 text-white font-sans focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/[0.06]">
            {initialData && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete ${initialData.name}?`)) {
                    onDelete(initialData.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-neutral-400 hover:text-rose-400 rounded-lg transition"
              >
                <DeleteIcon size={14} animateOnHover={true} />
                <span className="text-[10px] tracking-wider uppercase">Delete</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 bg-[#181818] hover:bg-neutral-800 text-neutral-300 rounded-lg text-xs"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black hover:bg-neutral-200 font-semibold rounded-lg text-xs tracking-wider uppercase"
              >
                <CheckIcon size={14} animateOnHover={true} />
                <span>SAVE</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfumeFormSheet;
