import React, { useState, useEffect } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Tag,
  Droplets,
  Clock
} from 'lucide-react';
import ImageMagnifier from './ImageMagnifier';


const PerfumeModal = ({ perfume, isOpen, onClose }) => {
  const [currentPrice, setCurrentPrice] = useState('');
  const [priceComparison, setPriceComparison] = useState(null);

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
      direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same',
      percentage:
        original > 0
          ? ((Math.abs(diff) / original) * 100).toFixed(1)
          : 0
    });
  }, [currentPrice, perfume]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

  if (!isOpen || !perfume) return null;

  const buyLinks = perfume.buyLink
    ? perfume.buyLink.split(',').map((link) => {
      const url = link.trim();
      let name = 'Buy Now';
      const urlLower = url.toLowerCase();
      if (urlLower.includes('amazon') || urlLower.includes('amzn')) name = 'Amazon';
      else if (urlLower.includes('flipkart')) name = 'Flipkart';
      else if (urlLower.includes('nykaa')) name = 'Nykaa';
      else if (urlLower.includes('beardo')) name = 'Beardo';
      else if (urlLower.includes('elixbloom')) name = 'elixbloom';
      else if (urlLower.includes('fragstalk')) name = 'FragStalk';
      else if (urlLower.includes('belvish')) name = 'Belvish';
      else if (urlLower.includes('chanel')) name = 'Chanel';
      else if (urlLower.includes('fridaycharm')) name = 'Friday Charm';
      else if (urlLower.includes('versace')) name = 'Versace';
      else if (urlLower.includes('lattafaindia')) name = 'Lattafa India';
      else if (urlLower.includes('scentoria')) name = 'Scentoria';
      else if (urlLower.includes('perfumenetwork')) name = 'Perfume Network';
      else if (urlLower.includes('sephora')) name = 'Sephora';
      else if (urlLower.includes('ahmedalmaghribi')) name = 'Ahmed Al Maghribi';
      return { url, name };
    })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden cursor-default">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-black text-white">
          <div className="flex items-center gap-3">
            <Droplets size={20} />
            <h2 className="text-lg font-semibold">Fragrance Overview</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] max-h-[85vh] overflow-y-auto">
          {/* Left – Image / Sticky Info */}
          <div className="bg-gray-50 border-r p-6 space-y-6">
            <div className="aspect-square rounded-xl bg-white border flex items-center justify-center overflow-hidden">
              <ImageMagnifier
                src={perfume.image}
                alt={perfume.name}
                zoom={2}
                lensSize={140}
              />
            </div>

            <div className="space-y-4">
              <InfoRow icon={<Tag size={16} />} label="Brand" value={perfume.brand} />
              <InfoRow icon={<Droplets size={16} />} label="Volume" value={perfume.volume} />
              <InfoRow
                icon={<Clock size={16} />}
                label="Base Price"
                value={`₹${parseInt(perfume.originalPrice || perfume.price).toLocaleString()}`}
              />
            </div>
          </div>

          {/* Right – Details */}
          <div className="p-8 space-y-10">
            {/* Name & Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {perfume.name}
              </h1>
              <div className="flex items-end gap-4">
                <p className="text-4xl font-extrabold text-gray-900">
                  ₹{parseInt(perfume.price).toLocaleString()}
                </p>
                {perfume.originalPrice && (
                  <p className="text-xl text-black/30 line-through">
                    ₹{parseInt(perfume.originalPrice - 100).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            {/* Notes */}
            {perfume.notes && (
              <section>
                <h3 className="text-xl font-semibold mb-4">Fragrance Notes</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Notes title="Top" items={perfume.notes.topNotes} />
                  <Notes title="Middle" items={perfume.notes.middleNotes} />
                  <Notes title="Base" items={perfume.notes.baseNotes} />
                </div>
              </section>
            )}

            {/* Description */}
            {perfume.description && (
              <section className="bg-gray-50 border rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-black/60 leading-relaxed">
                  {perfume.description}
                </p>
              </section>
            )}

            {/* Price Tracker */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Price Tracker</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <p className="text-sm text-black/80">Original</p>
                  <p className="text-2xl font-bold">
                    ₹{parseInt(perfume.originalPrice || perfume.price).toLocaleString()}
                  </p>
                </div>
                <input
                  type="number"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  placeholder="Enter latest price"
                  className="border rounded-lg p-4 text-lg focus:ring-2 focus:ring-gray-800"
                />
              </div>

              {priceComparison && (
                <div
                  className={`mt-4 p-4 rounded-lg flex items-center justify-between border ${priceComparison.direction === 'up'
                      ? 'bg-red-50 border-red-200'
                      : priceComparison.direction === 'down'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {priceComparison.direction === 'up' && (
                      <TrendingUp className="text-red-600" />
                    )}
                    {priceComparison.direction === 'down' && (
                      <TrendingDown className="text-green-600" />
                    )}
                    {priceComparison.direction === 'same' && (
                      <Minus className="text-gray-600" />
                    )}
                    <div>
                      <p className="font-semibold">
                        {priceComparison.direction === 'up'
                          ? 'Price Increased'
                          : priceComparison.direction === 'down'
                            ? 'Price Decreased'
                            : 'No Change'}
                      </p>
                      <p className="text-sm text-black/70">
                        ₹{priceComparison.difference.toLocaleString()} •{' '}
                        {priceComparison.percentage}%
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">
                    ₹{priceComparison.difference.toLocaleString()}
                  </span>
                </div>
              )}
            </section>

            {/* Buy Links */}
            {buyLinks.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-4">Where to Buy</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {buyLinks.map((b, i) => (
                    <a
                      key={i}
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-black text-white py-4 font-medium hover:bg-black/90 transition"
                    >
                      <ExternalLink size={18} /> Buy on {b.name}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between bg-white border rounded-lg p-4">
    <div className="flex items-center gap-2 text-gray-600 text-sm">
      {icon}
      {label}
    </div>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

const Notes = ({ title, items }) => (
  <div className="bg-gray-50 border rounded-lg p-4">
    <h4 className="font-semibold mb-2">{title} Notes</h4>
    <ul className="space-y-1 text-black/60">
      {items.map((n, i) => (
        <li key={i}>• {n}</li>
      ))}
    </ul>
  </div>
);

export default PerfumeModal;