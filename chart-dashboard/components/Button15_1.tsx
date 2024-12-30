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

interface FlowerLeafData {
  year: number;
  under100m_flower: number;
  under200m_flower: number;
  above200m_flower: number;
  under100m_leaf: number;
  under200m_leaf: number;
  above200m_leaf: number;
}

const combinedData: FlowerLeafData[] = [
  { year: 2014, under100m_flower: 1000, under200m_flower: 1500, above200m_flower: 2000, under100m_leaf: 5000, under200m_leaf: 7500, above200m_leaf: 10000 },
  { year: 2015, under100m_flower: 1200, under200m_flower: 1300, above200m_flower: 2200, under100m_leaf: 6000, under200m_leaf: 6500, above200m_leaf: 11000 },
  { year: 2016, under100m_flower: 900, under200m_flower: 1600, above200m_flower: 1800, under100m_leaf: 4500, under200m_leaf: 8000, above200m_leaf: 9000 },
  { year: 2017, under100m_flower: 1400, under200m_flower: 1400, above200m_flower: 2100, under100m_leaf: 7000, under200m_leaf: 7000, above200m_leaf: 10500 },
  { year: 2018, under100m_flower: 1100, under200m_flower: 1800, above200m_flower: 1700, under100m_leaf: 5500, under200m_leaf: 9000, above200m_leaf: 8500 },
  { year: 2019, under100m_flower: 1600, under200m_flower: 1500, above200m_flower: 2300, under100m_leaf: 8000, under200m_leaf: 7500, above200m_leaf: 11500 },
  { year: 2020, under100m_flower: 1300, under200m_flower: 1900, above200m_flower: 1600, under100m_leaf: 6500, under200m_leaf: 9500, above200m_leaf: 8000 },
  { year: 2021, under100m_flower: 1700, under200m_flower: 1600, above200m_flower: 2400, under100m_leaf: 8500, under200m_leaf: 8000, above200m_leaf: 12000 },
  { year: 2022, under100m_flower: 1500, under200m_flower: 2000, above200m_flower: 1900, under100m_leaf: 7500, under200m_leaf: 10000, above200m_leaf: 9500 },
  { year: 2023, under100m_flower: 1800, under200m_flower: 1700, above200m_flower: 2500, under100m_leaf: 9000, under200m_leaf: 8500, above200m_leaf: 12500 },
  { year: 2024, under100m_flower: 1400, under200m_flower: 2100, above200m_flower: 2000, under100m_leaf: 7000, under200m_leaf: 10500, above200m_leaf: 10000 },
];

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

export default function Button15_1() {
  return (
    <div className="space-y-8">
      <Card className="w-full h-[600px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">고도별 꽃수 변화 (2014-2024)</CardTitle>
        </CardHeader>
        <CardContent className="h-[520px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={combinedData}
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
                domain={[0, 'dataMax + 500']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  fontWeight: 'bold'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="under100m_flower" 
                name="100m 미만 꽃수" 
                stroke="#FF6B6B" 
                strokeWidth={3} 
                dot={{ fill: '#FF6B6B', r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="under200m_flower" 
                name="200m 미만 꽃수" 
                stroke="#4ECDC4" 
                strokeWidth={3} 
                dot={{ fill: '#4ECDC4', r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="above200m_flower" 
                name="200m 이상 꽃수" 
                stroke="#45B7D1" 
                strokeWidth={3} 
                dot={{ fill: '#45B7D1', r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="w-full h-[600px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">고도별 엽수 변화 (2014-2024)</CardTitle>
        </CardHeader>
        <CardContent className="h-[520px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={combinedData}
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
                domain={[0, 'dataMax + 1000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  fontWeight: 'bold'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="under100m_leaf" 
                name="100m 미만 엽수" 
                stroke="#FFA07A" 
                strokeWidth={3} 
                dot={{ fill: '#FFA07A', r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="under200m_leaf" 
                name="200m 미만 엽수" 
                stroke="#98D8C8" 
                strokeWidth={3} 
                dot={{ fill: '#98D8C8', r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="above200m_leaf" 
                name="200m 이상 엽수" 
                stroke="#F06292" 
                strokeWidth={3} 
                dot={{ fill: '#F06292', r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

