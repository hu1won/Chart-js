'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 데이터 타입 정의
interface EconomicData {
  year: number;
  totalIncome: number;
  operatingCost: number;
  income: number;
  incomeRate: number;
}

interface DetailItem {
  name: string;
  data: EconomicData[];
}

interface CategoryData {
  name: string;
  data: EconomicData[];
  details: DetailItem[];
}

// 샘플 데이터 생성 함수
const generateSampleData = (): CategoryData[] => {
  const categories = ['과수전체', '노지채소', '시설과수', '일반작물', '화훼'];
  const years = [2018, 2019, 2020, 2021, 2022];

  return categories.map(category => ({
    name: category,
    data: years.map(year => ({
      year,
      totalIncome: Math.round(Math.random() * 10000000),
      operatingCost: Math.round(Math.random() * 5000000),
      income: Math.round(Math.random() * 5000000),
      incomeRate: Math.round(Math.random() * 100),
    })),
    details: ['품종A', '품종B', '품종C'].map(detail => ({
      name: detail,
      data: years.map(year => ({
        year,
        totalIncome: Math.round(Math.random() * 5000000),
        operatingCost: Math.round(Math.random() * 2500000),
        income: Math.round(Math.random() * 2500000),
        incomeRate: Math.round(Math.random() * 100),
      })),
    })),
  }));
};

const sampleData = generateSampleData();

const Button19: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(sampleData[0].name);
  const [selectedMetric, setSelectedMetric] = useState<keyof EconomicData>('totalIncome');

  const categoryData = useMemo(() => sampleData.find(c => c.name === selectedCategory), [selectedCategory]);

  const metricLabels: Record<keyof EconomicData, string> = {
      totalIncome: '총수입',
      operatingCost: '경영비',
      income: '소득',
      incomeRate: '소득률',
      year: '연도',
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">제주 주요 품목별 경영성과 분석</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="품목 선택" />
            </SelectTrigger>
            <SelectContent>
              {sampleData.map(category => (
                <SelectItem key={category.name} value={category.name}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedMetric(value as keyof EconomicData)} defaultValue={selectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="지표 선택" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(metricLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="main">
          <TabsList>
            <TabsTrigger value="main">메인 차트</TabsTrigger>
            <TabsTrigger value="details">세부 품목 차트</TabsTrigger>
          </TabsList>

          <TabsContent value="main">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={categoryData?.data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={selectedMetric} name={metricLabels[selectedMetric]} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" allowDuplicatedCategory={false} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {categoryData?.details.map((detail) => (
                    <Line 
                      key={detail.name} 
                      data={detail.data} 
                      type="monotone" 
                      dataKey={selectedMetric} 
                      name={detail.name} 
                      stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} 
                      activeDot={{ r: 8 }} 
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4">
          <h3 className="font-bold mb-2">경영 성과 요약 (10a 기준)</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">연도</th>
                <th className="border border-gray-300 px-4 py-2">총수입</th>
                <th className="border border-gray-300 px-4 py-2">경영비</th>
                <th className="border border-gray-300 px-4 py-2">소득</th>
                <th className="border border-gray-300 px-4 py-2">소득률</th>
              </tr>
            </thead>
            <tbody>
              {categoryData?.data.map((item) => (
                <tr key={item.year}>
                  <td className="border border-gray-300 px-4 py-2">{item.year}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.totalIncome.toLocaleString()}원</td>
                  <td className="border border-gray-300 px-4 py-2">{item.operatingCost.toLocaleString()}원</td>
                  <td className="border border-gray-300 px-4 py-2">{item.income.toLocaleString()}원</td>
                  <td className="border border-gray-300 px-4 py-2">{item.incomeRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Button19;
