import React from 'react';
import { motion } from 'framer-motion';
import { Minimize2, Maximize2, X } from 'lucide-react';

const TitleBar: React.FC = () => {
  const handleMinimize = () => {
    if (window.lazyAPI) {
      window.lazyAPI.window.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.lazyAPI) {
      window.lazyAPI.window.maximize();
    }
  };

  const handleClose = () => {
    if (window.lazyAPI) {
      window.lazyAPI.window.close();
    }
  };

  return (
    <div className="flex items-center justify-between h-8 bg-dark-card glass border-b border-white/10 drag-region">
      <div className="flex items-center px-4">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-blue mr-2"></div>
        <span className="text-sm font-semibold gradient-text">Lazy Optimizer</span>
      </div>
      
      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMinimize}
          className="p-2 hover:bg-white/10 transition-colors no-drag"
        >
          <Minimize2 size={14} className="text-gray-300" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMaximize}
          className="p-2 hover:bg-white/10 transition-colors no-drag"
        >
          <Maximize2 size={14} className="text-gray-300" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 45, 146, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClose}
          className="p-2 hover:bg-red-500/20 transition-colors no-drag"
        >
          <X size={14} className="text-gray-300" />
        </motion.button>
      </div>
    </div>
  );
};

export default TitleBar;
