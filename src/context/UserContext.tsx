import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { UserContext as UserContextType, UserPreferences, GPUInstance } from '../types';

const initialPreferences: UserPreferences = {
  country: 'india',
  operatingSystem: 'windows',
  price_per_spot: 10,
  price_per_hour: 10,
  price_per_month: 100,
  Scalable: 3,
  activeUsers: 500,
  region: 'mumbai',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [recommendedGPUs, setRecommendedGPUs] = useState<GPUInstance[]>([]);
  const [selectedGPUs, setSelectedGPUs] = useState<GPUInstance[]>([]);

  const hasFetchedData = useRef(false);

  const userInput = {
    country: "india",
    operating_system: "windows",
    resource_class: "a100",
    resource_name: "W.N.A100.96",
    vcpus: 16,
    ram: 96,
    price_per_hour: 3.42,
    price_per_month: 1563,
    price_per_spot: 2.394,
    currency: "USD",
    is_gpu: 1,
    is_spot: 0,
    resource: "instances",
    resource_type: "gpu",
    region: "mumbai",
    flavor_id: "773b990d-6c7e-41e7-a40d-601bbbcc6373",
    gpu_description: "1x A100-80GB",
    is_public: 1
  };

  // Fetch the GPU data
  const fetchGPUData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      // console.log(response);
      

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        
        setRecommendedGPUs(data);
        // console.log(recommendedGPUs);
        
        setSelectedGPUs(data);  // Assuming you want to set the selected GPUs to the fetched data
        // console.log(selectedGPUs);
        
        // console.log(data);  // This logs the recommended GPUs to the console
      } else {
        console.error('Failed to fetch GPU data');
      }
    } catch (error) {
      console.error('Error fetching GPU data:', error);
    }
  };

  useEffect(() => {
    console.log('Updated recommendedGPUs:', recommendedGPUs);
  }, [recommendedGPUs]);
  
  useEffect(() => {
    console.log('Updated selectedGPUs:', selectedGPUs);
  }, [selectedGPUs]);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  const selectGPU = (gpuId: string) => {
    const gpu = recommendedGPUs.find((g) => g.flavor_id === gpuId);
    if (gpu && !selectedGPUs.some((g) => g.flavor_id === gpuId)) {
      setSelectedGPUs((prev) => [...prev, gpu]);
    }
  };

  const deselectGPU = (gpuId: string) => {
    setSelectedGPUs((prev) => prev.filter((gpu) => gpu.flavor_id !== gpuId));
  };

  const clearSelectedGPUs = () => {
    setSelectedGPUs([]);
  };

  const value: UserContextType = {
    preferences,
    recommendedGPUs,
    selectedGPUs,
    updatePreferences,
    selectGPU,
    deselectGPU,
    clearSelectedGPUs,
    fetchGPUData  // Ensure this is available to trigger from UserInputForm
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
