import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ScalingSection: React.FC = () => {
  const { selectedGPUs } = useUserContext();
  const [scalingFactor, setScalingFactor] = useState(1.5);
  
  if (selectedGPUs.length === 0) {
    return null;
  }

  const handleScalingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScalingFactor(parseFloat(e.target.value));
  };

  const getScalingChartData = () => {
    const timeLabels = ['Current', '3 Months', '6 Months', '1 Year'];
    
    // Create datasets for each selected GPU
    const datasets = selectedGPUs.map((gpu, index) => {
      // Calculate future performance needs based on scaling factor
      const scalingValues = [
        gpu.performanceScore,
        gpu.performanceScore * (1 + (scalingFactor * 0.2)),
        gpu.performanceScore * (1 + (scalingFactor * 0.5)),
        gpu.performanceScore * (1 + scalingFactor),
      ];
      
      // Determine if this GPU can meet future needs
      const canMeetFutureNeeds = Math.max(...scalingValues) <= 100;
      
      const colors = [
        ['rgba(59, 130, 246, 0.7)', 'rgba(59, 130, 246, 1)'],  // primary
        ['rgba(139, 92, 246, 0.7)', 'rgba(139, 92, 246, 1)'],  // secondary
        ['rgba(20, 184, 166, 0.7)', 'rgba(20, 184, 166, 1)'],  // accent
        ['rgba(16, 185, 129, 0.7)', 'rgba(16, 185, 129, 1)'],  // success
      ];
      
      return {
        label: gpu.name,
        data: scalingValues,
        borderColor: colors[index % colors.length][1],
        backgroundColor: colors[index % colors.length][0],
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
        fill: false,
      };
    });
    
    // Create a "Required Performance" line that grows with scaling factor
    const baselinePerformance = Math.max(...selectedGPUs.map(gpu => gpu.performanceScore));
    const requiredPerformanceData = [
      baselinePerformance,
      baselinePerformance * (1 + (scalingFactor * 0.2)),
      baselinePerformance * (1 + (scalingFactor * 0.5)),
      baselinePerformance * (1 + scalingFactor),
    ];
    
    datasets.push({
      label: 'Required Performance',
      data: requiredPerformanceData,
      borderColor: 'rgba(239, 68, 68, 1)',  // error-500
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.2,
      borderDash: [5, 5],
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
      fill: false,
    });
    
    return {
      labels: timeLabels,
      datasets,
    };
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#cbd5e1',
          boxWidth: 12,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Performance Scaling Projection',
        color: '#f1f5f9',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#f1f5f9',
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 110,
        title: {
          display: true,
          text: 'Performance Score',
          color: '#cbd5e1',
        },
        grid: {
          color: 'rgba(71, 85, 105, 0.2)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      x: {
        grid: {
          color: 'rgba(71, 85, 105, 0.2)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  const chartData = getScalingChartData();

  return (
    <motion.div
      className="mt-12 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Future-Proofing Analysis</h2>
      
      <div className="bg-dark-800 rounded-lg p-6 mb-6">
        <p className="text-gray-300 mb-4">
          This analysis helps you understand how well your selected GPUs will handle increased workload requirements over time. 
          Adjust the scaling factor to see how performance needs might change with growth.
        </p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Workload Scaling Factor: {scalingFactor.toFixed(1)}x
          </label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={scalingFactor}
            onChange={handleScalingChange}
            className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${(scalingFactor - 1) * 50}%, rgb(55, 65, 81) ${(scalingFactor - 1) * 50}%, rgb(55, 65, 81) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Minimal Growth (1x)</span>
            <span>Moderate (2x)</span>
            <span>Aggressive (3x)</span>
          </div>
        </div>
        
        <div className="h-80">
          <Line data={chartData} options={chartOptions as any} />
        </div>
      </div>
      
      <div className="bg-dark-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Scaling Insights</h3>
        
        <div className="space-y-6">
          {selectedGPUs.map((gpu) => {
            const maxRequiredPerformance = Math.max(...chartData.datasets[chartData.datasets.length - 1].data as number[]);
            const canHandleFutureNeeds = gpu.performanceScore >= maxRequiredPerformance;
            
            return (
              <div key={gpu.id} className="border-b border-dark-700 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-medium text-white">{gpu.name}</h4>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    canHandleFutureNeeds ? 'bg-success-900 text-success-300' : 'bg-error-900 text-error-300'
                  }`}>
                    {canHandleFutureNeeds ? 'Future-Proof' : 'May Need Upgrade'}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-3">
                  {canHandleFutureNeeds
                    ? `The ${gpu.name} can handle your projected workload growth over the next year, even with a ${scalingFactor}x scaling factor.`
                    : `At a ${scalingFactor}x scaling factor, the ${gpu.name} may struggle to meet your performance requirements in the future. Consider a more powerful GPU for long-term needs.`
                  }
                </p>
                
                <div className="mt-4">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div>
                      <div className="font-medium text-gray-300 mb-1">Current</div>
                      <div className={`py-1 px-2 rounded ${
                        gpu.performanceScore >= chartData.datasets[chartData.datasets.length - 1].data[0]
                          ? 'bg-success-900 text-success-300'
                          : 'bg-error-900 text-error-300'
                      }`}>
                        {gpu.performanceScore >= chartData.datasets[chartData.datasets.length - 1].data[0] ? 'Sufficient' : 'Insufficient'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-300 mb-1">3 Months</div>
                      <div className={`py-1 px-2 rounded ${
                        gpu.performanceScore >= chartData.datasets[chartData.datasets.length - 1].data[1]
                          ? 'bg-success-900 text-success-300'
                          : 'bg-error-900 text-error-300'
                      }`}>
                        {gpu.performanceScore >= chartData.datasets[chartData.datasets.length - 1].data[1] ? 'Sufficient' : 'Insufficient'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-300 mb-1">6 Months</div>
                      <div className={`py-1 px-2 rounded ${
                        gpu.performanceScore >= chartData.datasets[chartData.datasets.length - 1].data[2]
                          ? 'bg-success-900 text-success-300'
                          : 'bg-error-900 text-error-300'
                      }`}>
                        {gpu.performanceScore >= chartData.datasets[chartData.datasets.length - 1].data[2] ? 'Sufficient' : 'Insufficient'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-300 mb-1">1 Year</div>
                      <div className={`py-1 px-2 rounded ${
                        gpu.performanceScore >= chartData.datasets[chartData.datasets.length - 1].data[3]
                          ? 'bg-success-900 text-success-300'
                          : 'bg-error-900 text-error-300'
                      }`}>
                        {gpu.performanceScore >= chartData.datasets[chartData.datasets.length - 1].data[3] ? 'Sufficient' : 'Insufficient'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ScalingSection;