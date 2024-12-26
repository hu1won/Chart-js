export interface RegionalData {
    region: string;
    fruitCount: {
      min: number;
      q1: number;
      median: number;
      q3: number;
      max: number;
    };
    leafRatio: {
      min: number;
      q1: number;
      median: number;
      q3: number;
      max: number;
    };
  }
  
  export interface ScatterData {
    oldLeaves: number;
    flowers: number;
  }
  
  export interface HistogramData {
    bin: string;
    count: number;
  }
  
  export const regions: RegionalData[] = [
    {
      region: "한림",
      fruitCount: { min: 200, q1: 400, median: 500, q3: 600, max: 800 },
      leafRatio: { min: 0.2, q1: 0.4, median: 0.6, q3: 0.8, max: 1.0 }
    },
    {
      region: "애월",
      fruitCount: { min: 300, q1: 500, median: 600, q3: 800, max: 1200 },
      leafRatio: { min: 0.3, q1: 0.5, median: 0.7, q3: 0.9, max: 1.6 }
    },
    {
      region: "대정",
      fruitCount: { min: 200, q1: 400, median: 500, q3: 700, max: 900 },
      leafRatio: { min: 0.2, q1: 0.4, median: 0.6, q3: 0.8, max: 1.4 }
    },
    {
      region: "한경",
      fruitCount: { min: 400, q1: 800, median: 1000, q3: 1200, max: 1600 },
      leafRatio: { min: 0.3, q1: 0.5, median: 0.7, q3: 0.9, max: 1.2 }
    },
    {
      region: "제주",
      fruitCount: { min: 600, q1: 900, median: 1100, q3: 1300, max: 1800 },
      leafRatio: { min: 0.4, q1: 0.6, median: 0.8, q3: 1.0, max: 1.8 }
    },
    {
      region: "조천",
      fruitCount: { min: 500, q1: 800, median: 1000, q3: 1200, max: 1600 },
      leafRatio: { min: 0.5, q1: 0.7, median: 0.9, q3: 1.1, max: 1.6 }
    },
    {
      region: "구좌",
      fruitCount: { min: 400, q1: 700, median: 900, q3: 1100, max: 1500 },
      leafRatio: { min: 0.4, q1: 0.6, median: 0.8, q3: 1.0, max: 1.4 }
    },
    {
      region: "성산",
      fruitCount: { min: 300, q1: 600, median: 800, q3: 1000, max: 1400 },
      leafRatio: { min: 0.3, q1: 0.5, median: 0.7, q3: 0.9, max: 1.2 }
    },
    {
      region: "표선",
      fruitCount: { min: 500, q1: 800, median: 1000, q3: 1200, max: 1600 },
      leafRatio: { min: 0.5, q1: 0.7, median: 0.9, q3: 1.1, max: 1.6 }
    },
    {
      region: "남원",
      fruitCount: { min: 600, q1: 900, median: 1100, q3: 1300, max: 1800 },
      leafRatio: { min: 0.6, q1: 0.8, median: 1.0, q3: 1.2, max: 1.8 }
    },
    {
      region: "서귀",
      fruitCount: { min: 700, q1: 1000, median: 1200, q3: 1400, max: 1900 },
      leafRatio: { min: 0.7, q1: 0.9, median: 1.1, q3: 1.3, max: 1.6 }
    },
    {
      region: "안덕",
      fruitCount: { min: 400, q1: 700, median: 900, q3: 1100, max: 1500 },
      leafRatio: { min: 0.4, q1: 0.6, median: 0.8, q3: 1.0, max: 1.4 }
    }
  ];
  
  // Generate scatter plot data
  export const scatterData: ScatterData[] = Array.from({ length: 200 }, () => ({
    oldLeaves: Math.floor(Math.random() * 1000) + 200,
    flowers: Math.floor(Math.random() * 2000) + 400
  }));
  
  // Generate histogram data for fruit count
  export const fruitCountHistogram: HistogramData[] = [
    { bin: "0-500", count: 80 },
    { bin: "501-1000", count: 60 },
    { bin: "1001-1500", count: 40 },
    { bin: "1501-2000", count: 30 },
    { bin: "2001-2500", count: 20 },
    { bin: "2501-3000", count: 10 },
    { bin: "3001-3500", count: 5 },
    { bin: "3501-4000", count: 3 },
    { bin: "4001-4500", count: 2 }
  ];
  
  // Generate histogram data for planting distance
  export const plantingDistanceHistogram: HistogramData[] = [
    { bin: "2.0", count: 2 },
    { bin: "2.5", count: 5 },
    { bin: "3.0", count: 15 },
    { bin: "3.5", count: 25 },
    { bin: "4.0", count: 28 },
    { bin: "4.5", count: 18 },
    { bin: "5.0", count: 8 },
    { bin: "5.5", count: 3 },
    { bin: "6.0", count: 1 }
  ];
  