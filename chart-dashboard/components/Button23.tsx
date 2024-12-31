'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 데이터 타입 정의
interface CitrusData {
  year: number;
  variety: string;
  area: number;
  production: number;
  farmers: number;
}

// 샘플 데이터 생성 함수
const generateSampleData = (): CitrusData[] => {
  const years = [2019, 2020, 2021, 2022, 2023];
  const varieties = ['온주밀감', '한라봉', '천혜향', '레드향', '기타'];
  
  return years.flatMap(year => 
    varieties.map(variety => ({
      year,
      variety,
      area: Math.round(Math.random() * 1000 + 500), // 500-1500 ha
      production: Math.round(Math.random() * 50000 + 10000), // 10000-60000 톤
      farmers: Math.round(Math.random() * 1000 + 500), // 500-1500 호
    }))
  );
};

const sampleData = generateSampleData();

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c'];

const Button23: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedVariety, setSelectedVariety] = useState<string>('전체');

  const years = useMemo(() => [...new Set(sampleData.map(d => d.year))], []);
  const varieties = useMemo(() => ['전체', ...new Set(sampleData.map(d => d.variety))], []);

  const totalData = useMemo(() => 
    years.map(year => {
      const yearData = sampleData.filter(d => d.year === year);
      return {
        year,
        area: yearData.reduce((sum, d) => sum + d.area, 0),
        production: yearData.reduce((sum, d) => sum + d.production, 0),
        farmers: yearData.reduce((sum, d) => sum + d.farmers, 0),
      };
    }),
    [years]
  );

  const filteredData = useMemo(() => 
    sampleData.filter(d => d.year === selectedYear),
    [selectedYear]
  );

  const selectedData = useMemo(() => 
    selectedVariety === '전체' ? totalData : filteredData.filter(d => d.variety === selectedVariety),
    [selectedVariety, totalData, filteredData]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">제주 감귤류 세부 품종별 재배현황</CardTitle>
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
          <Select onValueChange={setSelectedVariety} defaultValue={selectedVariety}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="품종 선택" />
            </SelectTrigger>
            <SelectContent>
              {varieties.map(variety => (
                <SelectItem key={variety} value={variety}>{variety}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">재배면적 (ha)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedVariety === '전체' ? totalData : selectedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={selectedVariety === '전체' ? 'year' : 'variety'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedVariety === '전체' ? (
                      varieties.slice(1).map((variety, index) => (
                        <Bar key={variety} dataKey="area" name={variety} stackId="a" fill={COLORS[index]} />
                      ))
                    ) : (
                      <Bar dataKey="area" fill="#8884d8" />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">생산량 (톤)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={selectedVariety === '전체' ? 'year' : 'variety'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="production" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">농가수 (호)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={selectedVariety === '전체' ? 'year' : 'variety'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="farmers" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">상세 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{selectedYear}년 {selectedVariety} 재배 현황</p>
              <ul className="list-disc pl-5 mt-2">
                <li>재배면적: {selectedData.find(d => d.year === selectedYear)?.area.toLocaleString()} ha</li>
                <li>생산량: {selectedData.find(d => d.year === selectedYear)?.production.toLocaleString()} 톤</li>
                <li>농가수: {selectedData.find(d => d.year === selectedYear)?.farmers.toLocaleString()} 호</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default Button23;

