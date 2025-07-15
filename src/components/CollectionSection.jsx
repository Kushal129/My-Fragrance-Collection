import { motion } from 'framer-motion';
import ItemCard from './ItemCard';

const CollectionSection = ({ title, items, category }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
      id={category.toLowerCase()}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
          {title}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
      </motion.div>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12"
        >
          <p className="text-slate-400 text-lg">
            No {category.toLowerCase()} found matching your criteria
          </p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default CollectionSection;