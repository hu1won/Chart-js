'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Define types
interface WellData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  suitability: 'agricultural' | 'drinking' | 'unsuitable';
  measurements: {
    date: string;
    nitrogen: number;
    chlorine: number;
    pH: number;
  }[];
}

// Generate sample data
const generateSampleData = (): WellData[] => {
  const wells: WellData[] = [];
  const wellNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const suitabilities: ('agricultural' | 'drinking' | 'unsuitable')[] = ['agricultural', 'drinking', 'unsuitable'];

  for (let i = 0; i < 10; i++) {
    const measurements = [];
    for (let j = 0; j < 12; j++) {
      measurements.push({
        date: `2023-${(j + 1).toString().padStart(2, '0')}-01`,
        nitrogen: Math.random() * 10,
        chlorine: Math.random() * 5,
        pH: Math.random() * 3 + 5,
      });
    }

    wells.push({
      id: `well_${i + 1}`,
      name: `Well ${wellNames[i]}`,
      lat: 33.3 + Math.random() * 0.4,
      lng: 126.3 + Math.random() * 0.7,
      suitability: suitabilities[Math.floor(Math.random() * 3)],
      measurements,
    });
  }

  return wells;
};

const wellsData = generateSampleData();

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const Button11: React.FC = () => {
  const [selectedWell, setSelectedWell] = useState<string>(wellsData[0].id);
  const [selectedMetric, setSelectedMetric] = useState<'nitrogen' | 'chlorine' | 'pH'>('nitrogen');

  const selectedWellData = useMemo(() => wellsData.find(well => well.id === selectedWell), [selectedWell]);

  const boxPlotData = useMemo(() => {
    return wellsData.map(well => {
      const values = well.measurements.map(m => m[selectedMetric]).sort((a, b) => a - b);
      const q1 = values[Math.floor(values.length / 4)];
      const median = values[Math.floor(values.length / 2)];
      const q3 = values[Math.floor(values.length * 3 / 4)];
      const min = values[0];
      const max = values[values.length - 1];

      return {
        name: well.name,
        min,
        q1,
        median,
        q3,
        max,
      };
    });
  }, [selectedMetric]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">지하수 수질 관리 대시보드</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map">
          <TabsList>
            <TabsTrigger value="map">지도</TabsTrigger>
            <TabsTrigger value="boxplot">박스 플롯</TabsTrigger>
            <TabsTrigger value="timeseries">시계열 그래프</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <div className="h-[500px] relative">
              <MapContainer center={[33.5, 126.5]} zoom={10} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {wellsData.map((well) => (
                  <Marker 
                    key={well.id} 
                    position={[well.lat, well.lng]} 
                    icon={customIcon}
                    eventHandlers={{
                      click: () => setSelectedWell(well.id),
                    }}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{well.name}</h3>
                        <p>적합성: {well.suitability === 'agricultural' ? '농업용수' : well.suitability === 'drinking' ? '음용수' : '부적합'}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </TabsContent>

          <TabsContent value="boxplot">
            <div className="h-[500px]">
              <Select onValueChange={(value) => setSelectedMetric(value as 'nitrogen' | 'chlorine' | 'pH')} defaultValue={selectedMetric}>
                <SelectTrigger className="w-[180px] mb-4">
                  <SelectValue placeholder="측정 항목 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nitrogen">질소</SelectItem>
                  <SelectItem value="chlorine">염소</SelectItem>
                  <SelectItem value="pH">pH</SelectItem>
                </SelectContent>
              </Select>
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
                  <XAxis dataKey="name" type="category" name="관정" />
                  <YAxis type="number" name={selectedMetric} />
                  <ZAxis type="number" range={[100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="최소-최대" data={boxPlotData} fill="#8884d8">
                    {boxPlotData.map((entry, index) => (
                      <rect key={`rect-${index}`} x={index * 60 + 20} y={entry.min} width={20} height={entry.max - entry.min} fill="#8884d8" fillOpacity={0.3} />
                    ))}
                  </Scatter>
                  <Scatter name="Q1-Q3" data={boxPlotData} fill="#82ca9d">
                    {boxPlotData.map((entry, index) => (
                      <rect key={`rect-${index}`} x={index * 60 + 20} y={entry.q1} width={20} height={entry.q3 - entry.q1} fill="#82ca9d" fillOpacity={0.8} />
                    ))}
                  </Scatter>
                  <Scatter name="중앙값" data={boxPlotData} fill="#ffc658">
                    {boxPlotData.map((entry, index) => (
                      <line key={`line-${index}`} x1={index * 60 + 20} y1={entry.median} x2={index * 60 + 40} y2={entry.median} stroke="#ffc658" strokeWidth={2} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="timeseries">
            <div className="h-[500px]">
              <Select onValueChange={setSelectedWell} defaultValue={selectedWell}>
                <SelectTrigger className="w-[180px] mb-4">
                  <SelectValue placeholder="관정 선택" />
                </SelectTrigger>
                <SelectContent>
                  {wellsData.map((well) => (
                    <SelectItem key={well.id} value={well.id}>{well.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedWellData?.measurements}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="nitrogen" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="chlorine" stroke="#82ca9d" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="pH" stroke="#ffc658" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4">
          <h3 className="font-bold mb-2">관정 개선 계획</h3>
          {selectedWellData?.suitability === 'unsuitable' ? (
            <div>
              <p className="mb-2">선택된 관정 ({selectedWellData.name})은 현재 부적합 상태입니다. 다음과 같은 개선 계획을 제안합니다:</p>
              <ul className="list-disc pl-5">
                <li>수질 개선을 위한 정기적인 모니터링 강화</li>
                <li>오염원 조사 및 제거</li>
                <li>필요시 정수 처리 시설 설치</li>
              </ul>
            </div>
          ) : (
            <p>선택된 관정 ({selectedWellData?.name})은 현재 {selectedWellData?.suitability === 'agricultural' ? '농업용수' : '음용수'}로 적합합니다.</p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-bold mb-2">정책 제안</h3>
          <ul className="list-disc pl-5">
            <li>지역별 수질 상태에 따른 차별화된 관리 정책 수립</li>
            <li>부적합 관정의 개선을 위한 예산 할당 및 전문가 지원</li>
            <li>농업 및 생활용수 공급을 위한 신규 관정 개발 계획 수립</li>
            <li>수질 개선을 위한 주민 참여 프로그램 운영</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Button11;
