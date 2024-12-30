'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'
import React from 'react'

interface MonthlyData {
  month: string;
  research: number;
  development: number;
  average: number;
}

interface CenterData {
  title: string;
  color: string;
  data: MonthlyData[];
}

const jejuData: MonthlyData[] = [
  { month: "7월", research: 5, development: 5, average: 5 },
  { month: "8월", research: 6, development: 6, average: 7 },
  { month: "9월", research: 7, development: 8, average: 8 },
  { month: "10월", research: 8, development: 8, average: 8 },
  { month: "11월", research: 10, development: 9, average: 9 },
  { month: "12월", research: 11, development: 10, average: 11 },
  { month: "익년1월", research: 14, development: 0, average: 0 },
];

const dongbuData: MonthlyData[] = [
  { month: "7월", research: 6, development: 6, average: 6 },
  { month: "8월", research: 6, development: 7, average: 7 },
  { month: "9월", research: 7, development: 7, average: 7 },
  { month: "10월", research: 8, development: 8, average: 8 },
  { month: "11월", research: 10, development: 9, average: 9 },
  { month: "12월", research: 11, development: 10, average: 8 },
  { month: "익년1월", research: 14, development: 0, average: 0 },
];

const seobuData: MonthlyData[] = [
  { month: "7월", research: 5, development: 5, average: 5 },
  { month: "8월", research: 6, development: 6, average: 7 },
  { month: "9월", research: 7, development: 7, average: 8 },
  { month: "10월", research: 8, development: 8, average: 8 },
  { month: "11월", research: 10, development: 9, average: 9 },
  { month: "12월", research: 11, development: 10, average: 11 },
  { month: "익년1월", research: 14, development: 0, average: 0 },
];

const centers: CenterData[] = [
  {
    title: "제주농업기술센터",
    color: "#FF8B66",
    data: jejuData
  },
  {
    title: "동부농업기술센터",
    color: "#66B3FF",
    data: dongbuData
  },
  {
    title: "서부농업기술센터",
    color: "#66CC99",
    data: seobuData
  }
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
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartComponent: React.FC<{ centerData: CenterData }> = ({ centerData }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold" style={{ color: centerData.color }}>
        {centerData.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={centerData.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 15]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="research" 
            name="연구" 
            fill={centerData.color} 
          />
          <Bar 
            dataKey="development" 
            name="개발" 
            fill={`${centerData.color}99`}
          />
          <Bar 
            dataKey="average" 
            name="평균" 
            fill={`${centerData.color}44`}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default function Button20() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {centers.map((center, index) => (
        <ChartComponent key={index} centerData={center} />
      ))}
    </div>
  );
}

