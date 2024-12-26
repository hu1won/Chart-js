'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import { jejuData, seogwipoData } from '../data/weatherData'

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
        <p className="text-sm">{`${label}월`}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-sm" style={{ color: pld.color }}>
            {`${pld.name}: ${pld.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Button16() {
  const [year, setYear] = useState('2024')
  const [region, setRegion] = useState('전체')
  const [type, setType] = useState('꽃수')

  return (
    <div className="w-full space-y-4">
      <div className="flex space-x-2">
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="연도 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024년</SelectItem>
            <SelectItem value="2023">2023년</SelectItem>
            <SelectItem value="2022">2022년</SelectItem>
          </SelectContent>
        </Select>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="권역별" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            <SelectItem value="동부">동부</SelectItem>
            <SelectItem value="서부">서부</SelectItem>
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="꽃수" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="꽃수">꽃수</SelectItem>
            <SelectItem value="열매수">열매수</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 제주시 차트들 */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-center mb-4">제주시(온도)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={jejuData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => `${value}월`} />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 35]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 3500]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="left" type="monotone" dataKey="temperature" name="온도" stroke="#ff7300" />
                  <Bar yAxisId="right" dataKey="flowers" name="꽃수" fill="#8884d8" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-center mb-4">제주시(강수량)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={jejuData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => `${value}월`} />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 300]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 120]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="left" type="monotone" dataKey="rainfall" name="강수량" stroke="#82ca9d" />
                  <Bar yAxisId="right" dataKey="fruits" name="열매수" fill="#ffc658" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-center mb-4">제주시(일조량)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={jejuData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => `${value}월`} />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 120]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 120]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="left" type="monotone" dataKey="lightIntensity" name="일조량" stroke="#8884d8" />
                  <Bar yAxisId="right" dataKey="sugarContent" name="당산도" fill="#82ca9d" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 서귀포시 차트들 */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-center mb-4">서귀포(온도)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={seogwipoData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => `${value}월`} />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 35]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 3500]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="left" type="monotone" dataKey="temperature" name="온도" stroke="#ff7300" />
                  <Bar yAxisId="right" dataKey="flowers" name="꽃수" fill="#8884d8" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-center mb-4">서귀포(강수량)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={seogwipoData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => `${value}월`} />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 300]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 120]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="left" type="monotone" dataKey="rainfall" name="강수량" stroke="#82ca9d" />
                  <Bar yAxisId="right" dataKey="fruits" name="열매수" fill="#ffc658" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-center mb-4">서귀포(일조량)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={seogwipoData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => `${value}월`} />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 120]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 120]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="left" type="monotone" dataKey="lightIntensity" name="일조량" stroke="#8884d8" />
                  <Bar yAxisId="right" dataKey="sugarContent" name="당산도" fill="#82ca9d" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

