import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-dark-900 text-white py-4 px-6 md:px-8 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <Cpu size={28} className="text-primary-500" />
          <h1 className="text-xl md:text-2xl font-bold">GPU Finder</h1>
        </motion.div>
        <div className="hidden md:flex space-x-6">
          <motion.a 
            href="#" 
            className="text-white hover:text-primary-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Home
          </motion.a>
          <motion.a 
            href="#" 
            className="text-white hover:text-primary-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Compare
          </motion.a>
          <motion.a 
            href="#" 
            className="text-white hover:text-primary-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Pricing
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;