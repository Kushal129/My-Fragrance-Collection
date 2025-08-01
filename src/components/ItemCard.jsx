import { motion } from 'framer-motion';
import { ExternalLink, Package2, IndianRupee, Tag } from 'lucide-react';

const ItemCard = ({ item, category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="card h-full flex flex-col hover:scale-105">
        
        {/* Image Section */}
        {item.image && (
          <div className="relative aspect-square bg-gradient-to-br from-dark-700 to-dark-800 rounded-lg overflow-hidden mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <div className="px-2 py-1 bg-primary-500/90 backdrop-blur-sm rounded-full">
                <span className="text-white text-xs font-medium">{category}</span>
              </div>
            </div>

            {/* Price Badge */}
            {item.price && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center space-x-1 px-2 py-1 bg-dark-900/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                  <IndianRupee className="w-3 h-3" />
                  <span>₹{item.price}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 flex flex-col space-y-3">
          {/* Name */}
          <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2 group-hover:text-primary-400 transition-colors">
            {item.name}
          </h3>
          
          {/* Brand & Volume */}
          {item.brand && (
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{item.brand}</span>
              {item.volume && <span>{item.volume}</span>}
            </div>
          )}
          
          {/* Price for non-image items */}
          {item.price && !item.image && (
            <div className="flex items-center space-x-2 text-primary-400 font-semibold">
              <IndianRupee className="w-4 h-4" />
              <span>₹{item.price}</span>
            </div>
          )}
          
          {/* Details */}
          <div className="space-y-2">
            {item.quantity && (
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Package2 className="w-4 h-4 text-primary-400" />
                <span>{item.quantity}</span>
              </div>
            )}
            
            {item.source && (
              <div className="text-gray-400 text-sm">
                {item.source}
              </div>
            )}
          </div>
          
          {/* Notes */}
          {item.notes && (
            <div className="p-3 bg-dark-700/30 rounded-lg">
              <p className="text-gray-300 text-sm leading-relaxed">{item.notes}</p>
            </div>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-dark-700/50">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Tag className="w-4 h-4" />
              <span>Collection</span>
            </div>
            
            {item.buyLink && (
              <a
                href={item.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;