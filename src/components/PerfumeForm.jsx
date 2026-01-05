import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Upload, AlertCircle } from 'lucide-react';

const PerfumeForm = ({ perfume, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    originalPrice: '',
    currentPrice: '',
    priceDate: new Date().toISOString().split('T')[0],
    image: '',
    buyLink: '',
    brand: '',
    volume: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (perfume) {
      setFormData({
        ...perfume,
        priceDate: perfume.priceDate || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        id: Date.now().toString(),
        name: '',
        price: '',
        originalPrice: '',
        currentPrice: '',
        priceDate: new Date().toISOString().split('T')[0],
        image: '',
        buyLink: '',
        brand: '',
        volume: '',
        description: ''
      });
    }
    setErrors({});
  }, [perfume, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.volume.trim()) newErrors.volume = 'Volume is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.buyLink.trim()) newErrors.buyLink = 'Buy link is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const dataToSave = {
      ...formData,
      originalPrice: formData.originalPrice || formData.price,
    };
    onSave(dataToSave);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {perfume ? 'Edit Fragrance' : 'Add New Fragrance'}
              {!perfume && <Plus className="w-6 h-6 text-gray-600" />}
            </h2>
            <button
              onClick={onClose}
              className="bg-gray-100 rounded-full p-3 hover:bg-gray-200 transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Perfume Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-black transition-colors duration-300 ${
                      errors.name ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="Enter perfume name"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-black transition-colors duration-300 ${
                      errors.brand ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="e.g., RASASI"
                  />
                  {errors.brand && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.brand}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume *
                  </label>
                  <input
                    type="text"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-black transition-colors duration-300 ${
                      errors.volume ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="e.g., 100ml"
                  />
                  {errors.volume && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.volume}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Pricing Information
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-black transition-colors duration-300 ${
                      errors.price ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="e.g., 1547"
                  />
                  {errors.price && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.price}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Added
                  </label>
                  <input
                    type="date"
                    name="priceDate"
                    value={formData.priceDate}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Media & Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Media & Links
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className={`w-full p-4 pl-12 border rounded-xl focus:outline-none focus:border-black transition-colors duration-300 ${
                        errors.image ? 'border-red-400' : 'border-gray-200'
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  {errors.image && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.image}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buy Link *
                  </label>
                  <input
                    type="url"
                    name="buyLink"
                    value={formData.buyLink}
                    onChange={handleChange}
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-black transition-colors duration-300 ${
                      errors.buyLink ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="https://amazon.in/..."
                  />
                  {errors.buyLink && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.buyLink}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-black resize-none transition-colors duration-300"
                    placeholder="Brief description of the perfume..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 mt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-medium text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-colors duration-300 font-medium text-lg flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              {perfume ? 'Update' : 'Add'} Fragrance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfumeForm;