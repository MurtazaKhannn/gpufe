import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';
import ComparisonChart from './ComparisonChart';

const ComparisonSection: React.FC = () => {
  const { selectedGPUs, clearSelectedGPUs } = useUserContext();
  const [activeMetric, setActiveMetric] = useState<'price' | 'performance' | 'ram' | 'vcpu'>('price');

  if (selectedGPUs.length === 0) {
    return null;
  }

  const metrics = [
    { id: 'price', label: 'Price' },
    { id: 'performance', label: 'Performance' },
    { id: 'ram', label: 'RAM' },
    { id: 'vcpu', label: 'vCPUs' },
  ];

  return (
    <motion.div
      className="mt-12 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Compare Selected GPUs</h2>
        <motion.button
          className="text-sm text-red-400 hover:text-red-300"
          onClick={clearSelectedGPUs}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear Selection
        </motion.button>
      </div>

      <div className="bg-dark-800 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4 overflow-x-auto py-2">
          {metrics.map((metric) => (
            <motion.button
              key={metric.id}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeMetric === metric.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
              onClick={() => setActiveMetric(metric.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {metric.label}
            </motion.button>
          ))}
        </div>
      </div>

      <ComparisonChart metric={activeMetric} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Scaling Insights</h3>
        <div className="bg-dark-800 rounded-lg p-6">
          <p className="text-gray-300 mb-4">
            Based on your selected GPUs, here are insights for future scaling needs:
          </p>
          
          <div className="space-y-4">
            {selectedGPUs.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-white mb-2">
                  {selectedGPUs[0].name}
                </h4>
                <p className="text-gray-400">
                  Best for {selectedGPUs[0].performanceScore > 90 
                    ? 'high-performance workloads requiring maximum computational power' 
                    : selectedGPUs[0].performanceScore > 75 
                      ? 'balanced workloads with good performance/cost ratio'
                      : 'cost-effective workloads with moderate performance needs'
                  }.
                </p>
                <div className="mt-3">
                  <div className="w-full bg-dark-700 h-1">
                    <motion.div
                      className="bg-primary-500 h-1"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedGPUs[0].performanceScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Current Needs</span>
                    <span className="text-xs text-gray-500">Future Scaling</span>
                  </div>
                </div>
              </div>
            )}
            
            {selectedGPUs.length > 1 && (
              <div className="pt-4 border-t border-dark-700">
                <h4 className="text-lg font-medium text-white mb-2">Scaling Recommendation</h4>
                <p className="text-gray-400">
                  {selectedGPUs[0].performanceScore - selectedGPUs[1].performanceScore > 20 
                    ? `The ${selectedGPUs[0].name} offers significantly better scaling potential compared to ${selectedGPUs[1].name}, with ${selectedGPUs[0].vcpus - selectedGPUs[1].vcpus} more vCPUs and ${selectedGPUs[0].ram - selectedGPUs[1].ram}GB more RAM.`
                    : `Both ${selectedGPUs[0].name} and ${selectedGPUs[1].name} offer comparable scaling potential, but the ${selectedGPUs[0].price_per_hour < selectedGPUs[1].price_per_hour ? selectedGPUs[0].name : selectedGPUs[1].name} provides better value for money.`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonSection;