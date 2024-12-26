export interface YearlyData {
    year: number;
    type1: number;
    type2: number;
    type3: number;
    type4: number;
    type5: number;
  }
  
  export interface CropData {
    year: number;
    crop1: number;
    crop2: number;
    crop3: number;
    crop4: number;
    crop5: number;
  }
  
  export interface TooltipPayload {
    name: string;
    value: number;
    color: string;
    dataKey: string;
    payload: YearlyData | CropData;
  }
  
  // Generate yearly data from 2011 to 2022
  export const jejuLandUse: YearlyData[] = Array.from({ length: 12 }, (_, i) => ({
    year: 2011 + i,
    type1: 0.8 - i * 0.01,
    type2: 0.6 - i * 0.005,
    type3: 0.4 - i * 0.002,
    type4: 0.3 - i * 0.001,
    type5: 0.2
  }));
  
  export const seogwipoLandUse: YearlyData[] = Array.from({ length: 12 }, (_, i) => ({
    year: 2011 + i,
    type1: 0.9 - i * 0.015,
    type2: 0.7 - i * 0.008,
    type3: 0.5 - i * 0.003,
    type4: 0.4 - i * 0.002,
    type5: 0.3
  }));
  
  // Generate crop data from 1980 to 2022
  export const jejuCropData: CropData[] = Array.from({ length: 43 }, (_, i) => ({
    year: 1980 + i,
    crop1: Math.max(0, 1000 + Math.sin(i * 0.5) * 500 + (i < 20 ? 500 : 0)),
    crop2: Math.max(0, 800 + Math.cos(i * 0.3) * 300 + (i < 15 ? 400 : 0)),
    crop3: Math.max(0, 600 + Math.sin(i * 0.4) * 200),
    crop4: Math.max(0, 400 + Math.cos(i * 0.6) * 150),
    crop5: Math.max(0, 300 + Math.sin(i * 0.2) * 100)
  }));
  
  export const seogwipoCropData: CropData[] = Array.from({ length: 43 }, (_, i) => ({
    year: 1980 + i,
    crop1: Math.max(0, 1200 + Math.sin(i * 0.4) * 600 + (i < 20 ? 600 : 0)),
    crop2: Math.max(0, 900 + Math.cos(i * 0.35) * 400 + (i < 15 ? 500 : 0)),
    crop3: Math.max(0, 700 + Math.sin(i * 0.45) * 300),
    crop4: Math.max(0, 500 + Math.cos(i * 0.55) * 200),
    crop5: Math.max(0, 400 + Math.sin(i * 0.25) * 150)
  }));
  
  export const COLORS = {
    type1: "#d32f2f",
    type2: "#f57c00",
    type3: "#ffd54f",
    type4: "#aed581",
    type5: "#81c784",
    crop1: "#2196f3",
    crop2: "#f44336",
    crop3: "#ff9800",
    crop4: "#4caf50",
    crop5: "#9c27b0"
  } as const;
  
  