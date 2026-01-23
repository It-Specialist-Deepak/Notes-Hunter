// src/app/self-component/Admin/StatsCard.jsx
import { motion } from 'framer-motion';
import { FiUsers, FiBook, FiFileText, FiDownload, FiThumbsUp, FiShield } from 'react-icons/fi';

const iconMap = {
  users: <FiUsers className="text-3xl" />,
  admins: <FiShield className="text-3xl" />,
  notes: <FiBook className="text-3xl" />,
  papers: <FiFileText className="text-3xl" />,
  downloads: <FiDownload className="text-3xl" />,
  likes: <FiThumbsUp className="text-3xl" />
};

const cardVariants = {
  offscreen: {
    y: 20,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8
    }
  },
  hover: {
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10
    }
  }
};

const StatsCard = ({ title, value = 0, icon, subItems = [], isCurrency = false }) => {
  const IconComponent = iconMap[icon] || iconMap.users;

  // Format number with thousands separator
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    return Number(num).toLocaleString();
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 border border-teal-500/20 overflow-hidden group"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      <div className="flex flex-col h-full relative z-10">
        <motion.div 
          className="flex justify-between items-start mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <motion.p 
              className="text-teal-300 text-sm font-medium mb-1"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.p>
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isCurrency ? `$${formatNumber(value)}` : formatNumber(value)}
            </motion.h3>
          </div>
          
          <motion.div 
            className="p-3 rounded-xl bg-gradient-to-br from-teal-600/20 to-emerald-600/20 text-teal-400 border border-teal-500/20"
            initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
            whileHover={{ 
              scale: 1.05,
              rotate: 2,
              background: ['linear-gradient(45deg, #0d9488, #10b981)'],
              transition: { duration: 0.3 }
            }}
          >
            {IconComponent}
          </motion.div>
        </motion.div>
        
        {subItems && subItems.length > 0 && (
          <motion.div 
            className="mt-6 pt-4 border-t border-teal-500/20 space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {subItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-sm"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  whileHover={{ x: 3 }}
                >
                  <span className="text-teal-200/80">{item.label}: </span>
                  <span className="font-medium bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    {formatNumber(item.value)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Decorative corner accent */}
      <motion.div 
        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-bl-2xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      />
    </motion.div>
  );
};

export default StatsCard;