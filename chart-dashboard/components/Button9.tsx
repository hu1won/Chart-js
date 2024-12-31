'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'

// 나무 수령 데이터 타입 정의
interface TreeAgeData {
  region: string;
  ages: {
    range: string;
    count: number;
    year: number;
  }[];
}

// 색상 정의
const AGE_COLORS = {
  '<10': '#E3F2FD',
  '10-19': '#90CAF9',
  '20-29': '#42A5F5',
  '30-39': '#1E88E5',
  '40-49': '#1565C0',
  '50+': '#0D47A1'
};

const REGIONS = ['서귀동', '월평동', '강정동', '법환동', '색달동', '도순동', '대포동'];
const AGE_RANGES = ['<10', '10-19', '20-29', '30-39', '40-49', '50+'];

// 샘플 데이터 생성
const generateTreeData = (): TreeAgeData[] => {
  return REGIONS.map(region => ({
    region,
    ages: AGE_RANGES.map(range => ({
      range,
      count: Math.floor(Math.random() * 50) + 1,
      year: parseInt(range.replace('+', '').split('-')[0]) + 5
    }))
  }));
};

const treeData = generateTreeData();

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      region: string;
      range: string;
      count: number;
      year: number;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-bold">{data.region}</p>
        <p className="text-sm">수령: {data.range}</p>
        <p className="text-sm">수량: {data.count}그루</p>
      </div>
    );
  }
  return null;
};

export default function Button9() {
  const flattenedData = treeData.flatMap(region =>
    region.ages.map(age => ({
      region: region.region,
      ...age
    }))
  );

  // 각 지역별 데이터를 분리
  const regionData = REGIONS.map(region => ({
    name: region,
    data: flattenedData.filter(d => d.region === region)
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">세부지역별 나무 수령 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scatter">
          <TabsList>
            <TabsTrigger value="scatter">산점도</TabsTrigger>
            <TabsTrigger value="separate">지역별 차트</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scatter">
            <div className="h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis 
                    dataKey="year" 
                    type="number" 
                    name="수령" 
                    domain={[0, 55]}
                    label={{ value: '수령 (년)', position: 'bottom' }}
                  />
                  <YAxis 
                    dataKey="region" 
                    type="category" 
                    name="지역"
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {AGE_RANGES.map((range) => (
                    <Scatter
                      key={range}
                      name={`${range}년`}
                      data={flattenedData.filter(d => d.range === range)}
                      fill={AGE_COLORS[range as keyof typeof AGE_COLORS]}
                    >
                      {flattenedData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={AGE_COLORS[entry.range as keyof typeof AGE_COLORS]}
                        />
                      ))}
                    </Scatter>
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="separate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionData.map((region) => (
                <Card key={region.name} className="p-4">
                  <CardTitle className="text-lg mb-4">{region.name}</CardTitle>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{
                          top: 10,
                          right: 10,
                          bottom: 20,
                          left: 10,
                        }}
                      >
                        <CartesianGrid />
                        <XAxis 
                          dataKey="year" 
                          type="number" 
                          domain={[0, 55]}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          dataKey="count"
                          type="number"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        {AGE_RANGES.map((range) => (
                          <Scatter
                            key={range}
                            name={range}
                            data={region.data.filter(d => d.range === range)}
                            fill={AGE_COLORS[range as keyof typeof AGE_COLORS]}
                          />
                        ))}
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

