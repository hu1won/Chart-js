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
  TooltipProps
} from 'recharts'
import React from 'react'

interface YearlyData {
  year: number;
  강릉: number;
  홍천: number;
  춘천: number;
  태백: number;
  청수: number;
  산청: number;
  목천: number;
  함파: number;
  기타: number;
  대실: number;
  우박: number;
  일조량부족: number;
}

const data: YearlyData[] = [
  { year: 2006, 강릉: 0, 홍천: 0, 춘천: 0, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2007, 강릉: 0, 홍천: 0, 춘천: 32, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2008, 강릉: 0, 홍천: 0, 춘천: 0, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2009, 강릉: 0, 홍천: 1, 춘천: 2, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 1, 우박: 0.5, 일조량부족: 0.5 },
  { year: 2010, 강릉: 0, 홍천: 0, 춘천: 3, 태백: 0, 청수: 2, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2011, 강릉: 0, 홍천: 0, 춘천: 1, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 1, 일조량부족: 0 },
  { year: 2012, 강릉: 0, 홍천: 0, 춘천: 12, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2013, 강릉: 0, 홍천: 0, 춘천: 0, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2014, 강릉: 0, 홍천: 0, 춘천: 0, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2015, 강릉: 0, 홍천: 0, 춘천: 0, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2016, 강릉: 0, 홍천: 0, 춘천: 17, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 10, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2017, 강릉: 0, 홍천: 0, 춘천: 0, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2018, 강릉: 0, 홍천: 0, 춘천: 5, 태백: 0, 청수: 3, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2019, 강릉: 0, 홍천: 0, 춘천: 3, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2020, 강릉: 0, 홍천: 0, 춘천: 5, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2021, 강릉: 0, 홍천: 0, 춘천: 0, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2022, 강릉: 0, 홍천: 0, 춘천: 0, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 0, 우박: 0, 일조량부족: 0 },
  { year: 2023, 강릉: 0, 홍천: 1, 춘천: 2, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 1, 우박: 1, 일조량부족: 1 },
  { year: 2024, 강릉: 0, 홍천: 1, 춘천: 2, 태백: 0, 청수: 0, 산청: 0, 목천: 0, 함파: 0, 기타: 0, 대실: 1, 우박: 1, 일조량부족: 0 },
];

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800 mb-2">{`${label}년`}</p>
        {payload.map((entry, index) => (
          entry.value > 0 && (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          )
        ))}
      </div>
    );
  }
  return null;
};

export default function Button8() {
  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">연도별 지역 데이터 (2006-2024)</CardTitle>
      </CardHeader>
      <CardContent className="h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ 
                value: '수량', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
              }}
            />
            <Bar dataKey="강릉" stackId="a" fill="#4A90E2" />
            <Bar dataKey="홍천" stackId="a" fill="#F5A623" />
            <Bar dataKey="춘천" stackId="a" fill="#7ED321" />
            <Bar dataKey="태백" stackId="a" fill="#3F4C6B" />
            <Bar dataKey="청수" stackId="a" fill="#FFD93D" />
            <Bar dataKey="산청" stackId="a" fill="#8B572A" />
            <Bar dataKey="목천" stackId="a" fill="#B8B8B8" />
            <Bar dataKey="함파" stackId="a" fill="#4A90E2" />
            <Bar dataKey="기타" stackId="a" fill="#9013FE" />
            <Bar dataKey="대실" stackId="a" fill="#417505" />
            <Bar dataKey="우박" stackId="a" fill="#FF9500" />
            <Bar dataKey="일조량부족" stackId="a" fill="#FF7B7B" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
