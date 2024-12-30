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
  ResponsiveContainer
} from 'recharts'

// Mock data for flower count by elevation from 2014 to 2024
const flowerData = [
  { year: 2014, under100m: 1000, under200m: 1500, above200m: 2000 },
  { year: 2015, under100m: 1200, under200m: 1300, above200m: 2200 },
  { year: 2016, under100m: 900, under200m: 1600, above200m: 1800 },
  { year: 2017, under100m: 1400, under200m: 1400, above200m: 2100 },
  { year: 2018, under100m: 1100, under200m: 1800, above200m: 1700 },
  { year: 2019, under100m: 1600, under200m: 1500, above200m: 2300 },
  { year: 2020, under100m: 1300, under200m: 1900, above200m: 1600 },
  { year: 2021, under100m: 1700, under200m: 1600, above200m: 2400 },
  { year: 2022, under100m: 1500, under200m: 2000, above200m: 1900 },
  { year: 2023, under100m: 1800, under200m: 1700, above200m: 2500 },
  { year: 2024, under100m: 1400, under200m: 2100, above200m: 2000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800">{`${label}년`}</p>
        {payload.map((entry: any, index: number) => (
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
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">고도별 꽃수 변화 (2014-2024)</CardTitle>
      </CardHeader>
      <CardContent className="h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={flowerData}
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
              dataKey="under100m" 
              name="100m 미만" 
              stroke="#FF6B6B" 
              strokeWidth={3} 
              dot={{ fill: '#FF6B6B', r: 6 }}
              activeDot={{ r: 8 }}
              animationDuration={2000}
            />
            <Line 
              type="monotone" 
              dataKey="under200m" 
              name="200m 미만" 
              stroke="#4ECDC4" 
              strokeWidth={3} 
              dot={{ fill: '#4ECDC4', r: 6 }}
              activeDot={{ r: 8 }}
              animationDuration={2000}
            />
            <Line 
              type="monotone" 
              dataKey="above200m" 
              name="200m 이상" 
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
  )
}

