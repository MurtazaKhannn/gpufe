import React from 'react';
import { motion } from 'framer-motion';

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-2">{label}</label>
      <motion.div 
        className="relative"
        whileTap={{ scale: 0.98 }}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full px-4 py-2 text-base rounded-lg bg-dark-800 border border-dark-700 text-white focus:outline-none focus:border-primary-500 shadow-sm"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectInput;