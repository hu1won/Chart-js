'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 지역별 데이터 타입 정의
interface RegionData {
  name: string;
  position: [number, number];
  boxPlot: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
  };
  color: string;
}

// 품종별 당도 데이터 타입 정의
interface SugarContentData {
  variety: string;
  min: number;
  max: number;
}

// 지역별 데이터
const regionData: RegionData[] = [
  { name: "차귀도", position: [33.3, 126.15], boxPlot: { min: 8, q1: 10, median: 11, q3: 13, max: 15 }, color: "#4CAF50" },
  { name: "한경면", position: [33.35, 126.25], boxPlot: { min: 9, q1: 11, median: 12, q3: 14, max: 16 }, color: "#673AB7" },
  { name: "애월읍", position: [33.46, 126.31], boxPlot: { min: 10, q1: 12, median: 13, q3: 15, max: 17 }, color: "#F44336" },
  { name: "제주시", position: [33.5, 126.5], boxPlot: { min: 11, q1: 13, median: 14, q3: 16, max: 18 }, color: "#FF9800" },
  { name: "조천읍", position: [33.53, 126.63], boxPlot: { min: 12, q1: 14, median: 15, q3: 17, max: 19 }, color: "#FFEB3B" },
  { name: "구좌읍", position: [33.52, 126.85], boxPlot: { min: 10, q1: 12, median: 13, q3: 15, max: 17 }, color: "#8BC34A" },
  { name: "성산읍", position: [33.43, 126.91], boxPlot: { min: 9, q1: 11, median: 12, q3: 14, max: 16 }, color: "#2196F3" },
  { name: "표선면", position: [33.32, 126.82], boxPlot: { min: 11, q1: 13, median: 14, q3: 16, max: 18 }, color: "#3F51B5" },
  { name: "남원읍", position: [33.27, 126.7], boxPlot: { min: 10, q1: 12, median: 13, q3: 15, max: 17 }, color: "#9C27B0" },
  { name: "서귀포시", position: [33.25, 126.56], boxPlot: { min: 12, q1: 14, median: 15, q3: 17, max: 19 }, color: "#E91E63" },
  { name: "중문", position: [33.25, 126.41], boxPlot: { min: 9, q1: 11, median: 12, q3: 14, max: 16 }, color: "#795548" },
  { name: "안덕면", position: [33.25, 126.32], boxPlot: { min: 8, q1: 10, median: 11, q3: 13, max: 15 }, color: "#607D8B" },
  { name: "대정읍", position: [33.22, 126.25], boxPlot: { min: 10, q1: 12, median: 13, q3: 15, max: 17 }, color: "#00BCD4" },
  { name: "한림읍", position: [33.39, 126.27], boxPlot: { min: 11, q1: 13, median: 14, q3: 16, max: 18 }, color: "#FFC107" }
];

// 품종별 당도 데이터
const sugarContentData: SugarContentData[] = [
  { variety: "일반", min: 8, max: 15 },
  { variety: "조생", min: 7, max: 16 },
  { variety: "극조생", min: 6, max: 14 }
];

// 박스플롯 아이콘 생성 함수
const createBoxPlotIcon = (data: RegionData['boxPlot'], color: string) => {
  const scale = 5; // 스케일 조정
  const width = 40;
  const height = 100;
  const boxWidth = 20;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <line x1="${width/2}" y1="${height - data.min * scale}" x2="${width/2}" y2="${height - data.max * scale}" stroke="${color}" stroke-width="2"/>
      <rect x="${(width-boxWidth)/2}" y="${height - data.q3 * scale}" width="${boxWidth}" height="${(data.q3 - data.q1) * scale}" fill="${color}" opacity="0.3"/>
      <line x1="${(width-boxWidth)/2}" y1="${height - data.median * scale}" x2="${(width+boxWidth)/2}" y2="${height - data.median * scale}" stroke="${color}" stroke-width="2"/>
      <line x1="${(width-boxWidth)/2}" y1="${height - data.min * scale}" x2="${(width+boxWidth)/2}" y2="${height - data.min * scale}" stroke="${color}" stroke-width="2"/>
      <line x1="${(width-boxWidth)/2}" y1="${height - data.max * scale}" x2="${(width+boxWidth)/2}" y2="${height - data.max * scale}" stroke="${color}" stroke-width="2"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'boxplot-icon',
    iconSize: [width, height],
    iconAnchor: [width/2, height/2],
  });
};

export default function Button17() {
  const [, setSelectedRegion] = useState<RegionData | null>(null);

  return (
    <div className="flex flex-col space-y-4">
      <div className="h-[600px] w-full relative">
        <div className="absolute top-4 left-4 z-[1000] flex space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021년</SelectItem>
              <SelectItem value="2022">2022년</SelectItem>
              <SelectItem value="2023">2023년</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="조사회차 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1차</SelectItem>
              <SelectItem value="2">2차</SelectItem>
              <SelectItem value="3">3차</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <MapContainer 
          center={[33.4, 126.5]} 
          zoom={10} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {regionData.map((region) => (
            <Marker
              key={region.name}
              position={region.position}
              icon={createBoxPlotIcon(region.boxPlot, region.color)}
              eventHandlers={{
                click: () => setSelectedRegion(region),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{region.name}</h3>
                  <p>최소값: {region.boxPlot.min}</p>
                  <p>1사분위: {region.boxPlot.q1}</p>
                  <p>중앙값: {region.boxPlot.median}</p>
                  <p>3사분위: {region.boxPlot.q3}</p>
                  <p>최대값: {region.boxPlot.max}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg w-[300px] z-[1000]">
          <h3 className="text-lg font-bold mb-2">품종별 당산도</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={sugarContentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="variety" />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Bar dataKey="max" fill="#FF4081" />
              <Bar dataKey="min" fill="#FF4081" fillOpacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

