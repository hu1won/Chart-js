'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// 데이터 타입 정의
interface DamageData {
  year: number;
  item: string;
  amount: number;
  causes: {
    [key: string]: number;
  };
}

// 샘플 데이터 생성
const generateSampleData = (): DamageData[] => {
  const years = [2019, 2020, 2021, 2022, 2023];
  const items = ['감귤', '당근', '양배추', '브로콜리', '마늘'];
  const causes = ['강풍', '대설', '매몰', '하천범람', '한파'];

  return years.flatMap(year =>
    items.map(item => ({
      year,
      item,
      amount: Math.round(Math.random() * 1000000000), // 최대 10억원
      causes: causes.reduce((acc, cause) => {
        acc[cause] = Math.round(Math.random() * 100);
        return acc;
      }, {} as { [key: string]: number })
    }))
  );
};

const sampleData = generateSampleData();

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Button22: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedItem, setSelectedItem] = useState<string>('감귤');

  const years = useMemo(() => [...new Set(sampleData.map(d => d.year))], []);
  const items = useMemo(() => [...new Set(sampleData.map(d => d.item))], []);

  const filteredData = useMemo(() => 
    sampleData.filter(d => d.year === selectedYear),
    [selectedYear]
  );

  const selectedItemData = useMemo(() => 
    sampleData.find(d => d.year === selectedYear && d.item === selectedItem),
    [selectedYear, selectedItem]
  );

  const pieChartData = useMemo(() => {
    if (!selectedItemData) return [];
    return Object.entries(selectedItemData.causes).map(([name, value]) => ({ name, value }));
  }, [selectedItemData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">제주 주요 품목별 피해액 및 원인 분석</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select onValueChange={(value) => setSelectedYear(Number(value))} defaultValue={selectedYear.toString()}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}년</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedItem} defaultValue={selectedItem}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="품목 선택" />
            </SelectTrigger>
            <SelectContent>
              {items.map(item => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">연도별 품목 피해액</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="item" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value)}
                    />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" name="피해액" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">피해 원인 비율</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">선택된 품목 상세 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">{selectedYear}년 {selectedItem} 피해 현황</p>
            <p>총 피해액: {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(selectedItemData?.amount || 0)}</p>
            <p>주요 피해 원인:</p>
            <ul className="list-disc pl-5">
              {selectedItemData && Object.entries(selectedItemData.causes).map(([cause, value]) => (
                <li key={cause}>{cause}: {value}%</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Button22;
