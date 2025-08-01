import { motion } from 'framer-motion';

const StatsCard = ({ value, label, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card text-center group hover:scale-105"
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="p-3 bg-primary-500/20 rounded-full group-hover:bg-primary-500/30 transition-colors">
          {icon}
        </div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-gray-400 text-sm font-medium">{label}</div>
      </div>
    </motion.div>
  );
};

export default StatsCard;