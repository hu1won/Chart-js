'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 데이터 타입 정의
interface GrowthData {
  week: number;
  height: number;
  leafCount: number;
  stemDiameter: number;
}

interface VegetableData {
  vegetable: string;
  region: string;
  variety: string;
  years: {
    year: number;
    data: GrowthData[];
  }[];
}

// 샘플 데이터 생성 함수
const generateSampleData = (): VegetableData[] => {
  const vegetables = ['양배추', '당근', '무', '마늘'];
  const regions = ['대정', '애월', '한림', '한경', '구좌', '성산', '안덕'];
  const varieties = {
    '양배추': ['마쓰모', '드림세븐'],
    '당근': ['후레쉬비', '당근품종2'],
    '무': ['오사리무', '무품종2'],
    '마늘': ['마늘품종1', '마늘품종2']
  };

  return vegetables.flatMap(vegetable => 
    regions.flatMap(region => 
      varieties[vegetable as keyof typeof varieties].map(variety => ({
        vegetable,
        region,
        variety,
        years: Array.from({ length: 3 }, (_, i) => ({
          year: 2021 + i,
          data: Array.from({ length: 12 }, (_, week) => ({
            week: week + 1,
            height: Math.random() * 50 + 10,
            leafCount: Math.floor(Math.random() * 10) + 5,
            stemDiameter: Math.random() * 5 + 1
          }))
        }))
      }))
    )
  );
};

const sampleData = generateSampleData();

const Button18: React.FC = () => {
  const [selectedVegetable, setSelectedVegetable] = useState<string>('양배추');
  const [selectedRegion, setSelectedRegion] = useState<string>('대정');
  const [selectedVariety, setSelectedVariety] = useState<string>('마쓰모');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedMetric, setSelectedMetric] = useState<string>('height');

  const filteredData = useMemo(() => {
    return sampleData.find(
      d => d.vegetable === selectedVegetable && 
           d.region === selectedRegion && 
           d.variety === selectedVariety
    )?.years.find(y => y.year === selectedYear)?.data || [];
  }, [selectedVegetable, selectedRegion, selectedVariety, selectedYear]);

  const metricLabels = {
    height: '초장 (cm)',
    leafCount: '엽수 (개)',
    stemDiameter: '줄기 직경 (cm)'
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">주요 월동채소 생육 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <Select onValueChange={(value) => setSelectedVegetable(value)} defaultValue={selectedVegetable}>
            <SelectTrigger>
              <SelectValue placeholder="채소 선택" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(sampleData.map(d => d.vegetable))).map(vegetable => (
                <SelectItem key={vegetable} value={vegetable}>{vegetable}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedRegion(value)} defaultValue={selectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="지역 선택" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(sampleData.filter(d => d.vegetable === selectedVegetable).map(d => d.region))).map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedVariety(value)} defaultValue={selectedVariety}>
            <SelectTrigger>
              <SelectValue placeholder="품종 선택" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(sampleData.filter(d => d.vegetable === selectedVegetable && d.region === selectedRegion).map(d => d.variety))).map(variety => (
                <SelectItem key={variety} value={variety}>{variety}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedYear(Number(value))} defaultValue={selectedYear.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent>
              {[2021, 2022, 2023].map(year => (
                <SelectItem key={year} value={year.toString()}>{year}년</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedMetric(value)} defaultValue={selectedMetric}>
            <SelectTrigger>
              <SelectValue placeholder="측정 항목 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="height">초장</SelectItem>
              <SelectItem value="leafCount">엽수</SelectItem>
              <SelectItem value="stemDiameter">줄기 직경</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" label={{ value: '주차', position: 'insideBottomRight', offset: -10 }} />
              <YAxis label={{ value: metricLabels[selectedMetric as keyof typeof metricLabels], angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Button18;

