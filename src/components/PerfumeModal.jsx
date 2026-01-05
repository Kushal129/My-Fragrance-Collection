import React, { useState, useEffect } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  CreditCard as Edit3,
  Trash2,
  Settings,
  ExternalLink
} from 'lucide-react';

const PerfumeModal = ({ perfume, isOpen, onClose, onEdit, onDelete }) => {
  const [currentPrice, setCurrentPrice] = useState('');
  const [priceComparison, setPriceComparison] = useState(null);
  const [showAdminControls, setShowAdminControls] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);

  useEffect(() => {
    if (!perfume || !currentPrice) {
      setPriceComparison(null);
      return;
    }

    const original = parseInt(perfume.originalPrice || perfume.price);
    const current = parseInt(currentPrice);
    const diff = current - original;

    setPriceComparison({
      difference: Math.abs(diff),
      direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same'
    });
  }, [currentPrice, perfume]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

  if (!isOpen || !perfume) return null;

  const handleAdminAccess = () => {
    setAdminClickCount((c) => {
      if (c + 1 >= 5) {
        setShowAdminControls(true);
        return 0;
      }
      return c + 1;
    });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this perfume permanently?')) {
      onDelete(perfume.id);
      onClose();
    }
  };

  const buyLinks = perfume.buyLink
    ? perfume.buyLink.split(',').map((link) => {
        const url = link.trim();
        let name = 'Buy Now';

        if (url.includes('amazon')) name = 'Amazon';
        else if (url.includes('flipkart')) name = 'Flipkart';
        else if (url.includes('nykaa')) name = 'Nykaa';

        return { url, name };
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">

        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button onClick={handleAdminAccess} className="opacity-0">
              <Settings size={16} />
            </button>
            <h2 className="text-lg sm:text-xl font-semibold">
              Fragrance Details
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {showAdminControls && (
              <>
                <button onClick={() => onEdit(perfume)} className="icon-btn">
                  <Edit3 size={18} />
                </button>
                <button onClick={handleDelete} className="icon-btn text-red-600">
                  <Trash2 size={18} />
                </button>
              </>
            )}
            <button onClick={onClose} className="icon-btn">
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Image */}
          <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {perfume.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge">{perfume.brand}</span>
                <span className="badge">{perfume.volume}</span>
              </div>

              <p className="text-3xl font-bold">
                ₹{parseInt(perfume.price).toLocaleString()}
              </p>

              {perfume.description && (
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {perfume.description}
                </p>
              )}
            </div>

            {/* Buy Links */}
            {buyLinks.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Buy From</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {buyLinks.map((b, i) => (
                    <a
                      key={i}
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-black"
                    >
                      <ExternalLink size={16} />
                      {b.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          <hr />
            {/* Price Tracker */}
            <div className="bg-gray-50 rounded-xl ">
              <h2 className="font-semibold text-xl mb-4">Price Tracker</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Original Price</label>
                  <p className="font-bold text-lg">
                    ₹{parseInt(perfume.originalPrice || perfume.price).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="label">Current Price</label>
                  <input
                    type="number"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    className="input"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              {priceComparison && (
                <div className="mt-4 flex items-center gap-3">
                  {priceComparison.direction === 'up' && <TrendingUp className="text-red-600" />}
                  {priceComparison.direction === 'down' && <TrendingDown className="text-green-600" />}
                  {priceComparison.direction === 'same' && <Minus className="text-gray-600" />}
                  <span className="font-medium">
                    ₹{priceComparison.difference.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeModal;
