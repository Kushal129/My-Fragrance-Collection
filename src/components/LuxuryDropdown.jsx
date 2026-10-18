import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon, SearchIcon, XIcon } from 'lucide-animated';

const LuxuryDropdown = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  icon: Icon,
  searchable = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, searchable]);

  // Format options normalized: { value, label, count }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt, count: null };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value) || normalizedOptions[0];

  const filteredOptions = searchable && searchTerm.trim()
    ? normalizedOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    : normalizedOptions;

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border outline-none ${
          isOpen
            ? 'bg-[#181818] border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]'
            : 'bg-[#121212] hover:bg-[#161616] border-white/10 text-neutral-200 hover:border-white/20'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon size={13} className="text-neutral-400 flex-shrink-0" />}
          <span className="truncate tracking-wide text-neutral-200">
            {selectedOption?.label || placeholder}
          </span>
          {selectedOption?.count !== undefined && selectedOption?.count !== null && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-md bg-white/10 text-neutral-400 font-normal">
              {selectedOption.count}
            </span>
          )}
        </div>

        <ChevronDownIcon
          size={14}
          animateOnHover={true}
          className={`text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Luxury Glassmorphic Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 sm:right-auto sm:min-w-[220px] max-w-[320px] top-full mt-1.5 z-50 rounded-xl bg-[#141414]/95 backdrop-blur-xl border border-white/15 shadow-2xl p-1.5 space-y-1 animate-fade-in overflow-hidden">
          {/* Optional Quick Search in Dropdown */}
          {searchable && (
            <div className="px-1.5 pt-1 pb-1.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10">
                <SearchIcon size={12} animateOnHover={true} className="text-neutral-400 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter list..."
                  className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="text-neutral-400 hover:text-white"
                  >
                    <XIcon size={12} animateOnHover={true} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options Scroll Container */}
          <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-0.5 pr-0.5">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-3 text-center text-xs text-neutral-500 font-medium">
                No matches found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-all ${
                      isSelected
                        ? 'bg-white text-black font-semibold'
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="truncate">{opt.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {opt.count !== undefined && opt.count !== null && (
                        <span
                          className={`px-1.5 py-0.5 text-[9.5px] rounded-md font-normal ${
                            isSelected
                              ? 'bg-black/15 text-black'
                              : 'bg-white/5 text-neutral-400'
                          }`}
                        >
                          {opt.count}
                        </span>
                      )}
                      {isSelected && <CheckIcon size={13} animateOnHover={true} className="text-black" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LuxuryDropdown;
