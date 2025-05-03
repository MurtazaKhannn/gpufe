import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
  description,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-200">{label}</label>
          {description && (
            <p className="text-xs text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <motion.button
          type="button"
          className={`${
            checked ? 'bg-primary-600' : 'bg-dark-700'
          } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition-colors`}
          onClick={() => onChange(!checked)}
          whileTap={{ scale: 0.95 }}
        >
          <span className="sr-only">Toggle {label}</span>
          <motion.span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            animate={{ x: checked ? 24 : 4 }}
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default ToggleSwitch;