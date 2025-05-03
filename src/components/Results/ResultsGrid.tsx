import React from 'react';
import { motion } from 'framer-motion';
import GPUCard from './GPUCard';
import { useUserContext } from '../../context/UserContext';

const ResultsGrid: React.FC = () => {
  const { recommendedGPUs } = useUserContext();
  console.log(recommendedGPUs);
  

  if (recommendedGPUs.length === 0) {
    return (
      <motion.div
        className="bg-dark-800 rounded-lg p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-medium text-white mb-2">No Results Yet</h3>
        <p className="text-gray-400">
          Fill out the form above and hit "Find Recommendations" to see GPU options that match your requirements.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.h2
        className="text-2xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Recommended GPUs
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedGPUs.map((gpu, index) => (
          <GPUCard key={gpu.flavor_id} gpu={gpu} highlight={index === 0} />
        ))}
      </div>

      {recommendedGPUs.length === 0 && (
        <motion.div
          className="bg-dark-800 rounded-lg p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-400">
            No GPUs match your current requirements. Try adjusting your filters.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ResultsGrid;