export interface UserPreferences {
  country: string;
  operatingSystem: string;
  // gpuClass: string;
  // vCPUs: number;
  // ram: number;
  price_per_hour: number;
  price_per_month: number;
  price_per_spot: number;
  Scalable: number;
  // spotInstance: boolean;
  // vram?: number;
  region?: string;
  activeUsers: number;
}

export interface GPUInstance {
  country: string;
  // flavour_id: string;
  name: string;
  gpu_description: string;
  resource_name: string;
  price_per_hour: number;
  price_per_month: number;
  price_per_spot: number;
  ram: number;
  vcpus: number;
  // vram: number;
  gpuType: string;
  flavor_id : string;
  gpuClass: string;
  region: string;
  operatingSystem: string;
  performanceScore: number;
}

export interface UserContext {
  preferences: UserPreferences;
  recommendedGPUs: GPUInstance[];
  selectedGPUs: GPUInstance[];
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  // getRecommendations: () => void;
  selectGPU: (gpuId: string) => void;
  deselectGPU: (gpuId: string) => void;
  clearSelectedGPUs: () => void;
  fetchGPUData: () => void;
}