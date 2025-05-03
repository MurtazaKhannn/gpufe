import React from 'react';
import { motion } from 'framer-motion';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  const increment = () => {
    if (max === undefined || value < max) {
      onChange(value + step);
    }
  };

  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-2">{label}</label>
      <div className="flex">
        <motion.button
          type="button"
          className="px-3 py-2 bg-dark-800 rounded-l-lg border border-dark-700 text-gray-400 hover:text-white focus:outline-none"
          onClick={decrement}
          whileTap={{ scale: 0.95 }}
          disabled={value <= min}
        >
          -
        </motion.button>
        <div className="relative flex-1">
          <input
            type="number"
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            className="block w-full px-4 py-2 bg-dark-800 border-y border-dark-700 text-white focus:outline-none text-center"
          />
          {suffix && (
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <span className="text-gray-400">{suffix}</span>
            </div>
          )}
        </div>
        <motion.button
          type="button"
          className="px-3 py-2 bg-dark-800 rounded-r-lg border border-dark-700 text-gray-400 hover:text-white focus:outline-none"
          onClick={increment}
          whileTap={{ scale: 0.95 }}
          disabled={max !== undefined && value >= max}
        >
          +
        </motion.button>
      </div>
    </div>
  );
};

export default NumberInput;