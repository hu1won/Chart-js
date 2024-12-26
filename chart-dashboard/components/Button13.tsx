'use client'

import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 과일 데이터 타입 정의
interface FruitData {
  year: number;
  sweetness: number;
  acidity: number;
}

// 마커 데이터 타입 정의
interface MarkerData {
  id: number;
  lat: number;
  lng: number;
  fruitData: FruitData[];
}

// Leaflet 아이콘 설정 (CDN 사용)
const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

// 제주도 내 랜덤 좌표 생성 함수
const generateRandomJejuCoordinate = (): [number, number] => {
  const minLat = 33.1;
  const maxLat = 33.6;
  const minLng = 126.1;
  const maxLng = 126.9;

  const lat = minLat + Math.random() * (maxLat - minLat);
  const lng = minLng + Math.random() * (maxLng - minLng);

  if (isPointInJeju(lat, lng)) {
    return [lat, lng];
  } else {
    return generateRandomJejuCoordinate();
  }
};

// 좌표가 제주도 내에 있는지 확인하는 함수
const isPointInJeju = (lat: number, lng: number): boolean => {
  const centerLat = 33.35;
  const centerLng = 126.5;
  const latRadius = 0.25;
  const lngRadius = 0.4;

  return (Math.pow((lat - centerLat) / latRadius, 2) + 
          Math.pow((lng - centerLng) / lngRadius, 2) <= 1);
};

// 20개의 마커 데이터 생성
const mockData: MarkerData[] = Array.from({ length: 20 }, (_, index) => {
  const [lat, lng] = generateRandomJejuCoordinate();
  const currentYear = new Date().getFullYear();
  return {
    id: index + 1,
    lat,
    lng,
    fruitData: Array.from({ length: 11 }, (_, i) => ({
      year: currentYear - 10 + i,
      sweetness: Math.floor(Math.random() * 10) + 1, // 1-10 스케일
      acidity: Math.floor(Math.random() * 10) + 1, // 1-10 스케일
    }))
  };
});

// 색상 배열 정의 (10년치)
const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
  '#98D8C8', '#F06292', '#AED581', '#7986CB', 
  '#9575CD', '#4DB6AC'
];

// 연도 추출
const years = [...new Set(mockData[0].fruitData.map(d => d.year))];

// 팝업 내 차트 컴포넌트
const PopupChart = ({ data }: { data: FruitData[] }) => {
  const chartData = data.map(d => ({
    year: d.year,
    당도: d.sweetness,
    산도: d.acidity,
    평균: (d.sweetness + d.acidity) / 2
  }));

  return (
    <div style={{ width: '300px', height: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="당도" fill={colors[0]} />
          <Bar dataKey="산도" fill={colors[1]} />
          <Line type="monotone" dataKey="평균" stroke="#8884d8" strokeWidth={2} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function Button13() {
  const [selectedYear, setSelectedYear] = useState<number>(years[years.length - 1]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const filteredData = useMemo(() => {
    return mockData.map(marker => ({
      ...marker,
      fruitData: marker.fruitData.filter(d => d.year <= selectedYear && d.year > selectedYear - 11)
    }));
  }, [selectedYear]);

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  }

  // 차트 데이터 준비
  const chartData = useMemo(() => {
    if (!selectedMarker) return [];
    return selectedMarker.fruitData
      .filter(d => d.year <= selectedYear && d.year > selectedYear - 11)
      .sort((a, b) => a.year - b.year)
      .map(data => ({
        year: data.year,
        당도: data.sweetness,
        산도: data.acidity,
        평균: (data.sweetness + data.acidity) / 2
      }));
  }, [selectedMarker, selectedYear]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="연도 선택" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>{year}년</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="조사회차" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2차조사">2차조사</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[400px] w-full">
        <MapContainer center={[33.35, 126.5]} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredData.map((item) => (
            <Marker 
              key={item.id} 
              position={[item.lat, item.lng]} 
              icon={icon}
              eventHandlers={{
                click: () => handleMarkerClick(item),
              }}
            >
              <Popup>
                <div>
                  <h3>마커 ID: {item.id}</h3>
                  <PopupChart data={item.fruitData} />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedMarker && (
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 10]} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border">
                        <p>{`${label}년`}</p>
                        {payload.map((pld) => (
                          <p key={pld.name}>{`${pld.name}: ${Number(pld.value).toFixed(2)}`}</p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="당도" fill={colors[0]} />
              <Bar dataKey="산도" fill={colors[1]} />
              <Line type="monotone" dataKey="평균" stroke="#8884d8" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

