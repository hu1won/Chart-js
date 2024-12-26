'use client'

import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Rectangle, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { generateGridData, elevationRanges, type ElevationPoint } from '../data/elevationData'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Button15() {
  const gridData = useMemo(() => generateGridData(), []);
  const mapRef = useRef<L.Map | null>(null);

  // 격자 크기 계산
  const gridSize = 0.005;

  // 범례 생성 함수
  const createLegend = () => {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.backgroundColor = 'white';
      div.style.padding = '10px';
      div.style.borderRadius = '5px';
      div.style.border = '2px solid rgba(0,0,0,0.2)';

      let legendContent = '<h4 style="margin:0 0 10px 0">고도 (m)</h4>';
      
      elevationRanges.forEach(range => {
        legendContent += `
          <div style="display:flex;align-items:center;margin-bottom:5px">
            <i style="background:${range.color};width:20px;height:20px;display:inline-block;margin-right:5px"></i>
            <span>${range.min} - ${range.max}</span>
          </div>
        `;
      });

      div.innerHTML = legendContent;
      return div;
    };

    return legend;
  };

  // 지도가 로드된 후 범례 추가
  useEffect(() => {
    if (mapRef.current) {
      const legend = createLegend();
      legend.addTo(mapRef.current);

      return () => {
        if (mapRef.current) {
          legend.remove();
        }
      };
    }
  }, []);

  // 고도에 따른 색상 결정
  const getColorForElevation = (elevation: number) => {
    const range = elevationRanges.find(
      range => elevation >= range.min && elevation <= range.max
    );
    return range ? range.color : '#FFFFFF';
  };

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
          center={[33.35, 126.5]} 
          zoom={11} 
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.3}
          />
          {gridData.map((point: ElevationPoint, index: number) => (
            <Rectangle
              key={index}
              bounds={[
                [point.lat, point.lng],
                [point.lat + gridSize, point.lng + gridSize]
              ]}
              pathOptions={{
                color: getColorForElevation(point.elevation),
                weight: 1,
                fillColor: getColorForElevation(point.elevation),
                fillOpacity: 0.7
              }}
            >
              <Tooltip permanent={false}>
                고도: {point.elevation}m
              </Tooltip>
            </Rectangle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

