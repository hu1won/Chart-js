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
  LineChart,
  Line
} from 'recharts'
import { farmData } from '../data/farmData'

export default function Button24() {
//   const currentYear = new Date().getFullYear();
  const latestData = farmData[farmData.length - 1];

  return (
    <div className="flex space-x-4">
      <div className="w-1/3 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>계획 농가수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{latestData.plannedFarms}</div>
            <div className="text-sm text-gray-500">농가</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>계획 면적</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{latestData.plannedArea}</div>
            <div className="text-sm text-gray-500">헥타르</div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>계획 vs 실제 농가수</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={farmData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plannedFarms" fill="#8884d8" name="계획 농가수" />
                <Bar dataKey="actualFarms" fill="#82ca9d" name="실제 농가수" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>농업 지표</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={farmData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="leafFlowerRatio" stroke="#8884d8" name="화엽비" />
                <Line yAxisId="left" type="monotone" dataKey="plantingDistance" stroke="#82ca9d" name="재식거리" />
                <Line yAxisId="left" type="monotone" dataKey="visualInspection" stroke="#ffc658" name="달관조사" />
                <Line yAxisId="right" type="monotone" dataKey="fruitCount" stroke="#ff7300" name="열매수" />
                <Line yAxisId="right" type="monotone" dataKey="fruitSize" stroke="#0088fe" name="열매크기" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

