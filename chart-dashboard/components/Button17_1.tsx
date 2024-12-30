'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'
import React from 'react';

interface CityData {
  year: number;
  jejuCity: number;
  seogwipoCity: number;
  hallimEup: number;
  hangyeongMyeon: number;
}

const sweetnessData: CityData[] = [
  { year: 2020, jejuCity: 7.2, seogwipoCity: 7.5, hallimEup: 7.0, hangyeongMyeon: 6.8 },
  { year: 2021, jejuCity: 7.4, seogwipoCity: 7.6, hallimEup: 7.2, hangyeongMyeon: 7.0 },
  { year: 2022, jejuCity: 7.3, seogwipoCity: 7.8, hallimEup: 7.1, hangyeongMyeon: 6.9 },
  { year: 2023, jejuCity: 7.5, seogwipoCity: 7.7, hallimEup: 7.3, hangyeongMyeon: 7.1 },
  { year: 2024, jejuCity: 7.6, seogwipoCity: 7.9, hallimEup: 7.4, hangyeongMyeon: 7.2 },
];

const acidityData: CityData[] = [
  { year: 2020, jejuCity: 1.2, seogwipoCity: 1.1, hallimEup: 1.3, hangyeongMyeon: 1.4 },
  { year: 2021, jejuCity: 1.1, seogwipoCity: 1.0, hallimEup: 1.2, hangyeongMyeon: 1.3 },
  { year: 2022, jejuCity: 1.3, seogwipoCity: 1.2, hallimEup: 1.4, hangyeongMyeon: 1.5 },
  { year: 2023, jejuCity: 1.2, seogwipoCity: 1.1, hallimEup: 1.3, hangyeongMyeon: 1.4 },
  { year: 2024, jejuCity: 1.1, seogwipoCity: 1.0, hallimEup: 1.2, hangyeongMyeon: 1.3 },
];

const sugarAcidRatioData: CityData[] = sweetnessData.map((sweetness, index) => ({
  year: sweetness.year,
  jejuCity: Number((sweetness.jejuCity / acidityData[index].jejuCity).toFixed(2)),
  seogwipoCity: Number((sweetness.seogwipoCity / acidityData[index].seogwipoCity).toFixed(2)),
  hallimEup: Number((sweetness.hallimEup / acidityData[index].hallimEup).toFixed(2)),
  hangyeongMyeon: Number((sweetness.hangyeongMyeon / acidityData[index].hangyeongMyeon).toFixed(2)),
}));

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800">{`${label}년`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LineChartComponent: React.FC<{ data: CityData[], title: string, yAxisDomain: [number, number] }> = ({ data, title, yAxisDomain }) => (
  <Card className="w-full h-[400px]">
    <CardHeader>
      <CardTitle className="text-xl font-bold text-center text-gray-800">{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis 
            dataKey="year" 
            stroke="#666" 
            tick={{ fill: '#666' }}
          />
          <YAxis 
            stroke="#666" 
            tick={{ fill: '#666' }}
            domain={yAxisDomain}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '10px',
              fontWeight: 'bold'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="jejuCity" 
            name="제주시" 
            stroke="#FF6B6B" 
            strokeWidth={2} 
            dot={{ fill: '#FF6B6B', r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line 
            type="monotone" 
            dataKey="seogwipoCity" 
            name="서귀포시" 
            stroke="#4ECDC4" 
            strokeWidth={2} 
            dot={{ fill: '#4ECDC4', r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line 
            type="monotone" 
            dataKey="hallimEup" 
            name="한림읍" 
            stroke="#45B7D1" 
            strokeWidth={2} 
            dot={{ fill: '#45B7D1', r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line 
            type="monotone" 
            dataKey="hangyeongMyeon" 
            name="한경면" 
            stroke="#FFA07A" 
            strokeWidth={2} 
            dot={{ fill: '#FFA07A', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default function Button17_1() {
  return (
    <div className="space-y-8">
      <LineChartComponent data={sweetnessData} title="당도 변화 (2020-2024)" yAxisDomain={[6, 8]} />
      <LineChartComponent data={acidityData} title="산도 변화 (2020-2024)" yAxisDomain={[0.5, 2]} />
      <LineChartComponent data={sugarAcidRatioData} title="당산비 변화 (2020-2024)" yAxisDomain={[4, 9]} />
    </div>
  )
}
