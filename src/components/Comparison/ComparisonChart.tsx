import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useUserContext } from '../../context/UserContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComparisonChartProps {
  metric: 'price' | 'performance' | 'ram' | 'vcpu';
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ metric }) => {
  const { selectedGPUs, preferences } = useUserContext();

  if (selectedGPUs.length === 0) {
    return (
      <motion.div
        className="bg-dark-800 rounded-lg p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-400">
          Select at least one GPU to see comparison charts.
        </p>
      </motion.div>
    );
  }

  const getChartData = () => {
    const labels = selectedGPUs.map((gpu) => gpu.name);
    let dataValues: number[] = [];
    let title = '';
    let yAxisTitle = '';
    
    switch (metric) {
      case 'price':
        dataValues = selectedGPUs.map((gpu) => 
          preferences.spotInstance ? gpu.spotPrice : gpu.pricePerHour
        );
        title = 'Price Comparison';
        yAxisTitle = 'Price ($ per hour)';
        break;
      case 'performance':
        dataValues = selectedGPUs.map((gpu) => gpu.performanceScore);
        title = 'Performance Comparison';
        yAxisTitle = 'Performance Score';
        break;
      case 'ram':
        dataValues = selectedGPUs.map((gpu) => gpu.ram);
        title = 'RAM Comparison';
        yAxisTitle = 'RAM (GB)';
        break;
      case 'vcpu':
        dataValues = selectedGPUs.map((gpu) => gpu.vCPUs);
        title = 'vCPU Comparison';
        yAxisTitle = 'Number of vCPUs';
        break;
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
          color: '#f1f5f9',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#f1f5f9',
          bodyColor: '#f1f5f9',
          titleFont: {
            size: 14,
          },
          bodyFont: {
            size: 13,
          },
          padding: 10,
          cornerRadius: 4,
          displayColors: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(71, 85, 105, 0.2)',
          },
          ticks: {
            color: '#94a3b8',
          },
        },
        y: {
          title: {
            display: true,
            text: yAxisTitle,
            color: '#cbd5e1',
          },
          grid: {
            color: 'rgba(71, 85, 105, 0.2)',
          },
          ticks: {
            color: '#94a3b8',
            callback: function(value: any) {
              if (metric === 'price') {
                return '$' + value;
              }
              return value;
            },
          },
        },
      },
    };

    const chartColors = [
      'rgba(59, 130, 246, 0.8)',   // primary-500
      'rgba(139, 92, 246, 0.8)',   // secondary-500
      'rgba(20, 184, 166, 0.8)',   // accent-500
      'rgba(16, 185, 129, 0.8)',   // success-500
      'rgba(245, 158, 11, 0.8)',   // warning-500
      'rgba(239, 68, 68, 0.8)',    // error-500
    ];

    const hoverColors = [
      'rgba(59, 130, 246, 1)',
      'rgba(139, 92, 246, 1)',
      'rgba(20, 184, 166, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(239, 68, 68, 1)',
    ];

    const data = {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: selectedGPUs.map((_, i) => chartColors[i % chartColors.length]),
          hoverBackgroundColor: selectedGPUs.map((_, i) => hoverColors[i % hoverColors.length]),
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    };

    return { data, options };
  };

  const { data, options } = getChartData();

  return (
    <motion.div
      className="bg-dark-800 rounded-lg p-6 h-64 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Bar data={data} options={options as any} />
    </motion.div>
  );
};

export default ComparisonChart;