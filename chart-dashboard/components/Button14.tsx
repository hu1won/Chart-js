'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
} from 'recharts'
import { regionalData, historicalData } from '../data/regionalData'

export default function Button14() {
  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>2024년 기준 최근 5년 지역별 평균,증감 데이터</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={regionalData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="region" />
                <PolarRadiusAxis angle={90} domain={[0, 60]} />
                <Radar
                  name="평균값"
                  dataKey="average"
                  stroke="#2196F3"
                  fill="#2196F3"
                  fillOpacity={0.6}
                />
                <Radar
                  name="증감율"
                  dataKey="growth"
                  stroke="#FF9800"
                  fill="#FF9800"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>연도별 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year"
                  tickFormatter={(value) => `${value}`}
                />
                <YAxis domain={[0, 3500]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                          <p className="font-semibold">{`${label}년`}</p>
                          {payload.map((entry) => (
                            <p key={entry.name} style={{ color: entry.color }}>
                              {`${entry.name}: ${entry.value}`}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  name="값"
                  fill="#90CAF9"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="trend"
                  name="추세"
                  stroke="#1976D2"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

