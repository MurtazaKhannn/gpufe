import React from 'react';
import { motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';
import SelectInput from './SelectInput';
import RangeSlider from './RangeSlider';
import ToggleSwitch from './ToggleSwitch';
import NumberInput from './NumberInput';
import { 
  COUNTRIES, 
  OPERATING_SYSTEMS, 
  GPU_CLASSES, 
  REGIONS 
} from '../../data/mockData';

const UserInputForm: React.FC = () => {
  const { 
    preferences, 
    updatePreferences, 
    fetchGPUData 
  } = useUserContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending preferences to backend:", preferences);
    fetchGPUData();  // Sends to backend
  };
  

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatUsers = (price: number) => `${price.toFixed(2)}`;


  return (
    <motion.div
      className="bg-dark-800 rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Find Your Ideal GPU</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput
            label="Country"
            value={preferences.country}
            onChange={(value) => updatePreferences({ country: value })}
            options={COUNTRIES}
            placeholder="Select your country"
          />
          
          <SelectInput
            label="Operating System"
            value={preferences.operatingSystem}
            onChange={(value) => updatePreferences({ operatingSystem: value })}
            options={OPERATING_SYSTEMS}
            placeholder="Select an OS"
          />
          
          {/* <SelectInput
            label="GPU Class"
            value={preferences.gpuClass}
            onChange={(value) => updatePreferences({ gpuClass: value })}
            options={GPU_CLASSES}
            placeholder="Select GPU class"
          /> */}
          
          <SelectInput
            label="Region"
            value={preferences.region || ''}
            onChange={(value) => updatePreferences({ region: value })}
            options={REGIONS}
            placeholder="Select a region"
          />
          
          {/* <NumberInput
            label="Minimum vCPUs"
            value={preferences.vCPUs}
            onChange={(value) => updatePreferences({ vCPUs: value })}
            min={0}
            max={256}
            step={4}
          /> */}
          
          {/* <NumberInput
            label="Minimum RAM (GB)"
            value={preferences.ram}
            onChange={(value) => updatePreferences({ ram: value })}
            min={0}
            max={2048}
            step={16}
            suffix="GB"
          /> */}
          
          {/* <NumberInput
            label="Minimum VRAM (GB)"
            value={preferences.vram || 0}
            onChange={(value) => updatePreferences({ vram: value })}
            min={0}
            max={128}
            step={4}
            suffix="GB"
          /> */}
          
          <div className="md:col-span-2">
            <RangeSlider
              label="Price Per Hour ($)"
              min={0}
              max={100}
              step={0.5}
              value={preferences.price_per_hour}
              onChange={(value) => updatePreferences({ price_per_hour: value })}
              formatValue={formatPrice}
            />
          </div>

          <div className="md:col-span-2">
            <RangeSlider
              label="Price Per Month($)"
              min={0}
              max={100}
              step={0.5}
              value={preferences.price_per_month}
              onChange={(value) => updatePreferences({ price_per_month: value })}
              formatValue={formatPrice}
            />
          </div>

          <div className="md:col-span-2">
            <RangeSlider
              label="Price Per Spot ($)"
              min={0}
              max={100}
              step={0.5}
              value={preferences.price_per_spot}
              onChange={(value) => updatePreferences({ price_per_spot: value })}
              formatValue={formatPrice}
            />
          </div>

          <div className="md:col-span-2">
            <RangeSlider
              label="Active Users"
              min={0}
              max={1000000}
              step={50}
              value={preferences.activeUsers}
              onChange={(value) => updatePreferences({ activeUsers: value })}
              formatValue={formatUsers}
            />
          </div>

          <div className="md:col-span-2">
            <RangeSlider
              label="Scalablity"
              min={1}
              max={5}
              step={1}
              value={preferences.Scalable}
              onChange={(value) => updatePreferences({ Scalable: value })}
              formatValue={formatUsers}
            />
          </div>
          
          {/* <div className="md:col-span-2">
            <ToggleSwitch
              label="Use Spot Instances"
              checked={preferences.spotInstance}
              onChange={(checked) => updatePreferences({ spotInstance: checked })}
              description="Spot instances can be up to 70% cheaper but may be interrupted"
            />
          </div> */}
        </div>
        
        <motion.button
          type="submit"
          className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Find Recommendations
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UserInputForm;
