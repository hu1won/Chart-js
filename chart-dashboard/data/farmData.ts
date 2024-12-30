export interface FarmData {
    year: number;
    plannedFarms: number;
    actualFarms: number;
    plannedArea: number;
    actualArea: number;
    leafFlowerRatio: number;
    plantingDistance: number;
    visualInspection: number;
    fruitCount: number;
    fruitSize: number;
  }
  
  export const farmData: FarmData[] = [
    { year: 2018, plannedFarms: 100, actualFarms: 80, plannedArea: 500, actualArea: 450, leafFlowerRatio: 0.8, plantingDistance: 3.5, visualInspection: 7, fruitCount: 150, fruitSize: 6.5 },
    { year: 2019, plannedFarms: 120, actualFarms: 110, plannedArea: 600, actualArea: 580, leafFlowerRatio: 0.85, plantingDistance: 3.6, visualInspection: 8, fruitCount: 180, fruitSize: 7 },
    { year: 2020, plannedFarms: 150, actualFarms: 140, plannedArea: 750, actualArea: 720, leafFlowerRatio: 0.9, plantingDistance: 3.7, visualInspection: 8.5, fruitCount: 200, fruitSize: 7.2 },
    { year: 2021, plannedFarms: 180, actualFarms: 175, plannedArea: 900, actualArea: 880, leafFlowerRatio: 0.95, plantingDistance: 3.8, visualInspection: 9, fruitCount: 220, fruitSize: 7.5 },
    { year: 2022, plannedFarms: 200, actualFarms: 195, plannedArea: 1000, actualArea: 980, leafFlowerRatio: 1, plantingDistance: 4, visualInspection: 9.5, fruitCount: 250, fruitSize: 8 },
  ];
  