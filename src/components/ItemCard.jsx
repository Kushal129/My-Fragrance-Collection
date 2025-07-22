import { motion } from 'framer-motion';
import { ExternalLink, Package2, IndianRupee, Sparkles } from 'lucide-react';

const ItemCard = ({ item, category, index }) => {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative h-full"
    >
      <div className="glass-dark rounded-3xl overflow-hidden h-full flex flex-col 
                    border border-white/10 hover:border-white/20 transition-all duration-500
                    hover:shadow-2xl hover:shadow-blue-500/10">
        
        {/* Image Section */}
        {item.image && (
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
            <motion.img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute top-4 left-4"
            >
              <div className="px-3 py-1 glass rounded-full border border-white/20">
                <span className="text-white text-sm font-medium">{category}</span>
              </div>
            </motion.div>

            {/* Price Badge */}
            {item.price && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute top-4 right-4"
              >
                <div className="flex items-center space-x-1 px-3 py-1 glass-dark rounded-full 
                              border border-white/20 text-white font-semibold">
                  <IndianRupee className="w-4 h-4" />
                  <span>₹{item.price}</span>
                </div>
              </motion.div>
            )}

            {/* Hover Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="p-6 flex-1 flex flex-col space-y-4"
        >
          {/* Name */}
          <motion.h3 
            className="text-xl font-semibold text-white leading-tight line-clamp-3
                     group-hover:gradient-text transition-all duration-500"
            whileHover={{ scale: 1.02 }}
          >
            {item.name}
          </motion.h3>
          
          {/* Price for non-image items */}
          {item.price && !item.image && (
            <motion.div 
              className="flex items-center space-x-2 text-white font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
            >
              <IndianRupee className="w-5 h-5 text-blue-400" />
              <span>₹{item.price}</span>
            </motion.div>
          )}
          
          {/* Details */}
          <div className="space-y-3">
            {item.quantity && (
              <motion.div 
                className="flex items-center space-x-2 text-gray-300"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Package2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{item.quantity}</span>
              </motion.div>
            )}
            
            {item.source && (
              <motion.div 
                className="text-gray-400 text-sm"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.source}
              </motion.div>
            )}
          </div>
          
          {/* Notes */}
          {item.notes && (
            <motion.div 
              className="p-4 glass rounded-xl border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-gray-300 text-sm leading-relaxed">{item.notes}</p>
            </motion.div>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/10">
            <div className="flex items-center space-x-2 text-gray-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span className="text-sm">Personal Collection</span>
            </div>
            
            {item.buyLink && (
              <motion.a
                href={item.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 btn-primary
                         text-white text-sm font-medium rounded-xl"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View</span>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ItemCard;