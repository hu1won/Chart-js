'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'
import { Plane, type LucideIcon } from 'lucide-react'

// 수출 데이터 타입 정의
interface ExportData {
  year: string;
  러시아: number;
  미국: number;
  캐나다: number;
  홍콩: number;
  대만: number;
}

// 툴팁 페이로드 타입 정의
interface CustomTooltipPayload {
  name: string;
  value: number;
  color: string;
}

// 커스텀 툴팁 props 타입 정의
interface CustomTooltipProps extends Omit<TooltipProps<number, string>, 'payload'> {
  active?: boolean;
  payload?: CustomTooltipPayload[];
  label?: string;
}

// 연도별 수출 데이터
const exportData: ExportData[] = [
  { year: '2009년', 러시아: 2.5, 미국: 3.2, 캐나다: 2.8, 홍콩: 2.0, 대만: 1.5 },
  { year: '2010년', 러시아: 2.8, 미국: 3.5, 캐나다: 3.0, 홍콩: 2.3, 대만: 2.0 },
  { year: '2011년', 러시아: 3.0, 미국: 3.0, 캐나다: 3.5, 홍콩: 2.8, 대만: 2.5 },
  { year: '2012년', 러시아: 2.7, 미국: 3.8, 캐나다: 3.2, 홍콩: 3.0, 대만: 2.2 },
  { year: '2013년', 러시아: 3.2, 미국: 3.3, 캐나다: 2.8, 홍콩: 3.5, 대만: 2.8 },
  { year: '2014년', 러시아: 3.5, 미국: 3.0, 캐나다: 2.5, 홍콩: 3.2, 대만: 3.0 },
  { year: '2015년', 러시아: 3.0, 미국: 2.8, 캐나다: 2.7, 홍콩: 2.9, 대만: 3.2 },
  { year: '2016년', 러시아: 2.8, 미국: 3.2, 캐나다: 3.0, 홍콩: 2.7, 대만: 2.9 },
  { year: '2017년', 러시아: 3.3, 미국: 3.5, 캐나다: 3.3, 홍콩: 2.5, 대만: 2.7 },
  { year: '2018년', 러시아: 3.6, 미국: 3.7, 캐나다: 3.5, 홍콩: 2.8, 대만: 2.5 },
  { year: '2019년', 러시아: 3.4, 미국: 3.9, 캐나다: 3.7, 홍콩: 3.0, 대만: 2.8 },
  { year: '2020년', 러시아: 3.8, 미국: 4.2, 캐나다: 3.9, 홍콩: 3.2, 대만: 3.0 },
  { year: '2021년', 러시아: 4.2, 미국: 4.5, 캐나다: 4.2, 홍콩: 3.5, 대만: 3.3 },
  { year: '2022년', 러시아: 4.5, 미국: 4.8, 캐나다: 4.5, 홍콩: 3.8, 대만: 3.5 },
  { year: '2023년', 러시아: 4.8, 미국: 5.0, 캐나다: 4.8, 홍콩: 4.0, 대만: 3.8 },
];

// 커스텀 툴팁 컴포넌트
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-bold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface ExportChartProps {
  title: string;
  icon: LucideIcon;
}

// 차트 컴포넌트
const ExportChart: React.FC<ExportChartProps> = ({ title, icon: Icon }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xl font-bold">
        수출량({title})
      </CardTitle>
      <Icon className="h-6 w-6 text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={exportData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="러시아"
              stroke="#FF4B4B"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="미국"
              stroke="#2196F3"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="캐나다"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="홍콩"
              stroke="#FF9800"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="대만"
              stroke="#9C27B0"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default function Button21() {
  return (
    <div className="space-y-6">
      <ExportChart title="천달러" icon={Plane} />
      <ExportChart title="톤" icon={Plane} />
    </div>
  );
}

