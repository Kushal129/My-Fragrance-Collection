import { motion } from 'framer-motion';
import { ExternalLink, Tag, IndianRupee, Sparkles, Eye, FlaskConical, Package } from 'lucide-react';

const ItemCard = ({ item, index, category }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const isPerfume = category?.toLowerCase() === "perfume";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative"
    >
      <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 
                    hover:border-slate-600/50 transition-all duration-500 card-hover">
        
        {/* Image Section (for perfumes) */}
        {item.image && (
          <div className={`relative overflow-hidden ${isPerfume ? "h-72" : "h-48"} bg-slate-900/50 flex items-center justify-center`}>
            <img
              src={item.image}
              alt={item.name}
              className={`object-cover transition-transform duration-700 ${isPerfume ? "w-full h-full group-hover:scale-100" : "w-full h-full group-hover:scale-105"}`}
              style={isPerfume ? { objectFit: "cover" } : {}}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm text-cyan-400 text-xs font-medium 
                             rounded-full border border-slate-700/50">
                {category}
              </span>
            </div>

            {/* Price Badge */}
            {item.price && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center space-x-1 px-3 py-1 bg-slate-800/80 backdrop-blur-sm 
                              text-slate-200 text-sm font-semibold rounded-full border border-slate-700/50">
                  <IndianRupee className="w-3 h-3" />
                  <span>{item.price}</span>
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 
                          group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
        
        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <h3 className="text-xl font-display font-semibold text-slate-100 group-hover:text-cyan-400 
                       transition-colors duration-300 leading-tight">
            {item.name}
          </h3>
          
          {/* Price (for items without image) */}
          {item.price && !item.image && (
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <IndianRupee className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-xl font-bold text-slate-200">₹{item.price}</span>
            </div>
          )}

          {/* Quantity (for attars) */}
          {item.quantity && (
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <Package className="w-4 h-4" />
              <span>{item.quantity}</span>
            </div>
          )}

          {/* Source (for attars) */}
          {item.source && (
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <FlaskConical className="w-4 h-4" />
              <span>{item.source}</span>
            </div>
          )}
          
          {/* Notes */}
          {item.notes && (
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-700/50 rounded-lg mt-0.5 flex-shrink-0">
                <Tag className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{item.notes}</p>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <div className="flex items-center space-x-2 text-slate-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Premium Quality</span>
            </div>
            
            {item.buyLink && (
              <motion.a
                href={item.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 
                         text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 
                         transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </motion.a>
            )}
          </div>
          {/* Mini note about price date */}
          {item.price && (
            <div className="pt-3">
              <span className="block text-xs text-slate-400 italic">
                * This price is as of 15-07-2025 and may change.
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;