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
  { year: 2015, under100m: 1100, under200m: 1600, above200m: 2100 },
  { year: 2016, under100m: 1050, under200m: 1550, above200m: 2050 },
  { year: 2017, under100m: 1200, under200m: 1700, above200m: 2200 },
  { year: 2018, under100m: 1150, under200m: 1650, above200m: 2150 },
  { year: 2019, under100m: 1300, under200m: 1800, above200m: 2300 },
  { year: 2020, under100m: 1250, under200m: 1750, above200m: 2250 },
  { year: 2021, under100m: 1400, under200m: 1900, above200m: 2400 },
  { year: 2022, under100m: 1350, under200m: 1850, above200m: 2350 },
  { year: 2023, under100m: 1500, under200m: 2000, above200m: 2500 },
  { year: 2024, under100m: 1450, under200m: 1950, above200m: 2450 },
];

export default function Button15_1() {
  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">고도별 꽃수 변화 (2014-2024)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={flowerData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="under100m" name="100m 미만" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="under200m" name="200m 미만" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="above200m" name="200m 이상" stroke="#ffc658" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
