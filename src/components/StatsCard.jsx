import { motion } from 'framer-motion';

const StatsCard = ({ value, label, icon, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="group relative"
    >
      <div className="glass-dark rounded-3xl p-8 text-center border border-white/10 
                    hover:border-white/20 transition-all duration-500 h-full
                    hover:shadow-2xl hover:shadow-blue-500/10">
        
        {/* Background Glow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 
                   group-hover:opacity-100 transition-opacity duration-500"
          whileHover={{ scale: 1.02 }}
        />
        
        <div className="relative z-10">
          {/* Icon */}
          <motion.div 
            className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-6 
                     border border-white/20 group-hover:border-blue-400/50 transition-all duration-500"
            whileHover={{ 
              rotate: 360,
              scale: 1.1
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
          </motion.div>
          
          {/* Value */}
          <motion.div 
            className="text-3xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-500"
            whileHover={{ scale: 1.05 }}
          >
            {value}
          </motion.div>
          
          {/* Label */}
          <motion.div 
            className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-500"
            whileHover={{ scale: 1.02 }}
          >
            {label}
          </motion.div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
};

export default StatsCard;