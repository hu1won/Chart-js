'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts'
import { regions, scatterData, fruitCountHistogram, plantingDistanceHistogram } from '@/data/agriculturaData'

// Custom BoxPlot component
const BoxPlot = ({ data, dataKey, height }: { 
  data: typeof regions,
  dataKey: 'fruitCount' | 'leafRatio',
  height: number 
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="region" width={50} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload[dataKey];
              return (
                <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                  <p className="font-semibold">{label}</p>
                  <p>최소값: {data.min}</p>
                  <p>Q1: {data.q1}</p>
                  <p>중앙값: {data.median}</p>
                  <p>Q3: {data.q3}</p>
                  <p>최대값: {data.max}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey={`${dataKey}.median`}
          fill="#8884d8"
          stroke="#8884d8"
          strokeWidth={2}
        >
          {data.map((entry, index) => {
            const boxHeight = 20;
            
            return (
              <g key={`box-plot-${index}`}>
                {/* Whiskers */}
                <line
                  x1={entry[dataKey].min}
                  x2={entry[dataKey].max}
                  y1={index * 40 + 20}
                  y2={index * 40 + 20}
                  stroke="#8884d8"
                  strokeWidth={1}
                />
                {/* Box */}
                <rect
                  x={entry[dataKey].q1}
                  y={index * 40 + (20 - boxHeight/2)}
                  width={entry[dataKey].q3 - entry[dataKey].q1}
                  height={boxHeight}
                  fill="#8884d8"
                  fillOpacity={0.3}
                  stroke="#8884d8"
                />
                {/* Median line */}
                <line
                  x1={entry[dataKey].median}
                  x2={entry[dataKey].median}
                  y1={index * 40 + (20 - boxHeight/2)}
                  y2={index * 40 + (20 + boxHeight/2)}
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </g>
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function Button12() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="font-medium">기준 연도:</span>
        <Select defaultValue="2023">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="연도 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023년</SelectItem>
            <SelectItem value="2022">2022년</SelectItem>
            <SelectItem value="2021">2021년</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>지역별 8월 열매수</CardTitle>
          </CardHeader>
          <CardContent>
            <BoxPlot data={regions} dataKey="fruitCount" height={400} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>지역별 5월 화엽비</CardTitle>
          </CardHeader>
          <CardContent>
            <BoxPlot data={regions} dataKey="leafRatio" height={400} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>구엽수 vs 꽃수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis 
                    type="number" 
                    dataKey="oldLeaves" 
                    name="구엽수" 
                    domain={[0, 1200]}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="flowers" 
                    name="꽃수"
                    domain={[0, 2500]} 
                  />
                  <ZAxis range={[20]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                            <p>구엽수: {payload[0].value}</p>
                            <p>꽃수: {payload[1].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    name="데이터" 
                    data={scatterData} 
                    fill="#8884d8"
                    opacity={0.5}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8월 열매수 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fruitCountHistogram}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bin" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                            <p>구간: {label}</p>
                            <p>빈도: {payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>평균 재식거리 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={plantingDistanceHistogram}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bin" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                            <p>거리(m): {label}</p>
                            <p>빈도: {payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
