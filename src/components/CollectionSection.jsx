import { motion } from 'framer-motion';
import { Package, Sparkles } from 'lucide-react';
import ItemCard from './ItemCard';

const CollectionSection = ({ title, items, category }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-400" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        
        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mb-4" />
        
        <p className="text-gray-400 max-w-2xl mx-auto">
          {category === 'Perfume' 
            ? "Premium fragrances from renowned houses around the world" 
            : "Traditional oil-based fragrances with timeless elegance"
          }
        </p>
      </div>
      
      {/* Items Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <ItemCard 
              key={`${category}-${index}`}
              item={item} 
              index={index}
              category={category}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="card max-w-md mx-auto">
            <div className="w-16 h-16 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No {category.toLowerCase()} found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search criteria
            </p>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default CollectionSection;