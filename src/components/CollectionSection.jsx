import { motion } from 'framer-motion';
import { Package, Sparkles, Crown } from 'lucide-react';
import ItemCard from './ItemCard';

const CollectionSection = ({ title, items, category }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-20" 
      id={category.toLowerCase()}
    >
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-16"
      >
        <motion.div 
          className="flex items-center justify-center space-x-3 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/20 mx-auto"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Package className="w-6 h-6 text-blue-400" />
          </motion.div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold gradient-text mb-6"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h2>
        
        <motion.div 
          className="flex items-center justify-center space-x-4 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div 
            className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </motion.div>
        
        <motion.p 
          className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {category === 'Perfume' 
            ? "A curated selection of premium fragrances from renowned houses around the world" 
            : "Traditional oil-based fragrances that capture timeless elegance and sophistication"
          }
        </motion.p>
      </motion.div>
      
      {/* Items Grid */}
      {items.length > 0 ? (
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {items.map((item, index) => (
            <motion.div 
              key={`${category}-${index}`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ItemCard 
                item={item} 
                index={index}
                category={category}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-20"
        >
          <div className="glass-dark p-12 rounded-3xl border border-white/10 max-w-md mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20"
            >
              <Sparkles className="w-8 h-8 text-gray-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No {category.toLowerCase()} found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search criteria
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default CollectionSection;