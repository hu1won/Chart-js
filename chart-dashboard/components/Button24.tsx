'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 데이터 타입 정의
interface CropData {
  year: number;
  crop: string;
  category: 'citrus' | 'vegetable';
  area: number;
  production: number;
  nationalRank: number;
  nationalShare: number;
}

// 샘플 데이터 생성 함수
const generateSampleData = (): CropData[] => {
  const years = [2019, 2020, 2021, 2022, 2023];
  const crops = {
    citrus: ['전체', '온주밀감', '만감류'],
    vegetable: ['월동배추', '월동무', '당근', '마늘', '양배추', '브로콜리']
  };

  return years.flatMap(year =>
    Object.entries(crops).flatMap(([category, cropList]) =>
      cropList.map(crop => ({
        year,
        crop,
        category: category as 'citrus' | 'vegetable',
        area: Math.round(Math.random() * 5000 + 1000),
        production: Math.round(Math.random() * 100000 + 10000),
        nationalRank: Math.floor(Math.random() * 10) + 1,
        nationalShare: Math.random() * 30 + 5
      }))
    )
  );
};

const sampleData = generateSampleData();

const Button24: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedCategory, setSelectedCategory] = useState<'citrus' | 'vegetable'>('citrus');

  const years = useMemo(() => [...new Set(sampleData.map(d => d.year))], []);

  const filteredData = useMemo(() => 
    sampleData.filter(d => d.year === selectedYear && d.category === selectedCategory),
    [selectedYear, selectedCategory]
  );

  const trendData = useMemo(() => 
    years.map(year => {
      const yearData = sampleData.filter(d => d.year === year && d.category === selectedCategory);
      return {
        year,
        area: yearData.reduce((sum, d) => sum + d.area, 0),
        production: yearData.reduce((sum, d) => sum + d.production, 0),
        averageShare: yearData.reduce((sum, d) => sum + d.nationalShare, 0) / yearData.length
      };
    }),
    [selectedCategory, years]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">제주도 주요 농산물 재배 현황</CardTitle>
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
          <Select onValueChange={(value) => setSelectedCategory(value as 'citrus' | 'vegetable')} defaultValue={selectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="품목 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="citrus">감귤류</SelectItem>
              <SelectItem value="vegetable">채소류</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">재배면적 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="area" stroke="#8884d8" name="재배면적 (ha)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">생산량 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="production" stroke="#82ca9d" name="생산량 (톤)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">전국 대비 재배 비율</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="averageShare" stroke="#ffc658" name="전국 대비 비율 (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">품목별 상세 정보 ({selectedYear}년)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>품목</TableHead>
                  <TableHead>재배면적 (ha)</TableHead>
                  <TableHead>생산량 (톤)</TableHead>
                  <TableHead>전국 순위</TableHead>
                  <TableHead>전국 대비 비율 (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.crop}</TableCell>
                    <TableCell>{item.area.toLocaleString()}</TableCell>
                    <TableCell>{item.production.toLocaleString()}</TableCell>
                    <TableCell>{item.nationalRank}</TableCell>
                    <TableCell>{item.nationalShare.toFixed(2)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Button24;

