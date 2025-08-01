import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative pt-16 pb-12 px-4 text-center"
    >
      <div className="max-w-6xl mx-auto">   
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            My Fragrance
            <span className="block text-3xl md:text-5xl gradient-text font-light">
              Collection
            </span>
          </h1>
        </motion.div>
          
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          A curated collection of luxury fragrances and traditional attars, each telling its own unique story.
        </motion.p>

        {/* Decorative line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mt-8"
        />
      </div>
    </motion.header>
  );
};

export default Header;