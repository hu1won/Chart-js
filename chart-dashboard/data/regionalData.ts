export interface RegionalData {
    region: string;
    average: number;
    growth: number;
  }
  
  export interface HistoricalData {
    year: number;
    value: number;
    trend: number;
  }
  
  export const regionalData: RegionalData[] = [
    { region: "제주시", average: 60, growth: 50 },
    { region: "서귀포시", average: 45, growth: 35 },
    { region: "애월읍", average: 35, growth: 20 },
    { region: "한림읍", average: 40, growth: 15 },
    { region: "조천읍", average: 55, growth: 25 },
    { region: "구좌읍", average: 30, growth: 20 },
    { region: "성산읍", average: 25, growth: 15 },
    { region: "표선면", average: 20, growth: 10 },
    { region: "남원읍", average: 15, growth: 10 },
    { region: "안덕면", average: 30, growth: 25 },
    { region: "대정읍", average: 35, growth: 30 },
  ];
  
  export const historicalData: HistoricalData[] = [
    { year: 2003, value: 1902, trend: 700 },
    { year: 2004, value: 3341, trend: 1400 },
    { year: 2005, value: 1935, trend: 800 },
    { year: 2006, value: 3008, trend: 1500 },
    { year: 2007, value: 1743, trend: 1000 },
    { year: 2008, value: 1271, trend: 600 },
    { year: 2009, value: 626, trend: 200 },
    { year: 2010, value: 1064, trend: 400 },
    { year: 2011, value: 1443, trend: 700 },
    { year: 2012, value: 630, trend: 300 },
    { year: 2013, value: 2556, trend: 900 },
    { year: 2014, value: 880, trend: 250 },
    { year: 2015, value: 589, trend: 250 },
    { year: 2016, value: 1497, trend: 400 },
    { year: 2017, value: 749, trend: 300 },
    { year: 2018, value: 720, trend: 300 },
    { year: 2019, value: 522, trend: 200 },
    { year: 2020, value: 1391, trend: 400 },
    { year: 2021, value: 613, trend: 250 },
    { year: 2022, value: 932, trend: 400 },
    { year: 2023, value: 612, trend: 250 },
    { year: 2024, value: 855, trend: 300 },
  ];
  