'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { landUseData, cropData, productivityData } from "@/data/agricultureData"

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const Button6: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<'제주시' | '서귀포시'>('제주시');
  const [selectedCrop, setSelectedCrop] = useState<string>('감귤');

  const filteredLandUseData = landUseData.filter(d => d.region === selectedRegion);
  const filteredCropData = cropData.filter(d => d.crop === selectedCrop);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select onValueChange={(value: '제주시' | '서귀포시') => setSelectedRegion(value)} defaultValue={selectedRegion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="지역 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="제주시">제주시</SelectItem>
            <SelectItem value="서귀포시">서귀포시</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedCrop} defaultValue={selectedCrop}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="작물 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="감귤">감귤</SelectItem>
            <SelectItem value="당근">당근</SelectItem>
            <SelectItem value="양배추">양배추</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>농경지 지목별 면적 변화 ({selectedRegion})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredLandUseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="paddy" stackId="a" fill={COLORS[0]} name="논" />
                <Bar dataKey="field" stackId="a" fill={COLORS[1]} name="밭" />
                <Bar dataKey="orchard" stackId="a" fill={COLORS[2]} name="과수원" />
                <Bar dataKey="pasture" stackId="a" fill={COLORS[3]} name="목장" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{selectedCrop} 재배 면적 및 생산량 변화</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredCropData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="area" stroke={COLORS[0]} name="재배 면적 (ha)" />
                <Line yAxisId="right" type="monotone" dataKey="production" stroke={COLORS[1]} name="생산량 (톤)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2022년 작물별 생산성 (톤/ha)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData.filter(d => d.year === 2022)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productivity" fill={COLORS[0]} name="생산성" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Button6;

