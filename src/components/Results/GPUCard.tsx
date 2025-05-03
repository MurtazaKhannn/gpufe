import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Cpu, MemoryStick as Memory, Server, DollarSign } from 'lucide-react';
import { GPUInstance } from '../../types';
import { useUserContext } from '../../context/UserContext';

interface GPUCardProps {
  gpu: GPUInstance;
  highlight?: boolean;
}

const GPUCard: React.FC<GPUCardProps> = ({ gpu, highlight = false }) => {
  const { selectedGPUs, selectGPU, deselectGPU } = useUserContext();
  const isSelected = selectedGPUs.some((g) => g.flavor_id === gpu.flavor_id);

  // console.log("gpu" , gpu);
  

  const toggleSelection = () => {
    if (isSelected) {
      deselectGPU(gpu.flavor_id);
    } else {
      selectGPU(gpu.flavor_id);
    }
  };

  return (
    <motion.div
      className={`bg-dark-800 rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow ${
        highlight ? 'ring-2 ring-primary-500' : ''
      }`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{gpu?.resource_name}</h3>            
            <p className="text-sm text-gray-400">{gpu?.gpu_description}</p>
          </div>
          <motion.button
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              isSelected ? 'bg-primary-500 text-white' : 'bg-dark-700 text-gray-400'
            }`}
            onClick={toggleSelection}
            whileTap={{ scale: 0.9 }}
          >
            {isSelected ? <Check size={18} /> : <Plus size={18} />}
          </motion.button>
        </div>
        
        {/* <p className="text-gray-300 text-sm mb-4">{gpu?.gpu_description}</p> */}
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <DollarSign size={16} className="text-primary-400 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Hourly Price:</span>
                <span className="text-white font-medium">${gpu.price_per_hour.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <DollarSign size={16} className="text-primary-400 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Spot Price:</span>
                <span className="text-white font-medium">${gpu?.price_per_spot.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Cpu size={16} className="text-primary-400 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">vCPUs:</span>
                <span className="text-white font-medium">{gpu?.vcpus}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Memory size={16} className="text-primary-400 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">RAM:</span>
                <span className="text-white font-medium">{gpu?.ram} GB</span>
              </div>
            </div>
          </div>
          
          {/* <div className="flex items-center">
            <Memory size={16} className="text-primary-400 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">VRAM:</span>
                <span className="text-white font-medium">{gpu?.vram} GB</span>
              </div>
            </div>
          </div> */}
          
          <div className="flex items-center">
            <Server size={16} className="text-primary-400 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Region:</span>
                <span className="text-white font-medium">{gpu?.region}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="mt-4">
          <div className="w-full bg-dark-700 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full"
              style={{ width: `${gpu?.performanceScore}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">Performance Score</span>
            <span className="text-xs font-medium text-primary-400">{gpu?.performanceScore}/100</span>
          </div>
        </div> */}
      </div>
      
      <div className="px-6 py-4 bg-dark-700 flex justify-between items-center">
        <div>
          {/* <p className="text-xl font-bold text-white"> */}
            {/* ${gpu?.pricePerMonth.toFixed(2)} */}
            {/* <span className="text-xs text-gray-400 ml-1">/month</span>
          </p> */}
        </div>
        <motion.button
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSelection}
        >
          {isSelected ? 'Selected' : 'Select'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GPUCard;