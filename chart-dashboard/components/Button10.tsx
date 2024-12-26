'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import {
  jejuLandUse,
  seogwipoLandUse,
  jejuCropData,
  seogwipoCropData
} from '@/data/landUseData'
import { Payload } from 'recharts/types/component/DefaultTooltipContent';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const COLORS = {
  type1: "#d32f2f",
  type2: "#f57c00",
  type3: "#ffd54f",
  type4: "#aed581",
  type5: "#81c784",
  crop1: "#2196f3",
  crop2: "#f44336",
  crop3: "#ff9800",
  crop4: "#4caf50",
  crop5: "#9c27b0"
};

interface TooltipEntry extends Payload<ValueType, NameType> {
  color?: string;
}

export default function Button10() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>토지지목별 변화 [제주]</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={jejuLandUse}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                          <p className="font-semibold">{`${label}년`}</p>
                          {payload.reverse().map((entry: TooltipEntry) => (
                            <p
                              key={entry.name}
                              style={{ color: entry.color }}
                            >{`${entry.name}: ${Number(entry.value).toFixed(3)}`}</p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="type5"
                  stackId="1"
                  stroke={COLORS.type5}
                  fill={COLORS.type5}
                  name="유형5"
                />
                <Area
                  type="monotone"
                  dataKey="type4"
                  stackId="1"
                  stroke={COLORS.type4}
                  fill={COLORS.type4}
                  name="유형4"
                />
                <Area
                  type="monotone"
                  dataKey="type3"
                  stackId="1"
                  stroke={COLORS.type3}
                  fill={COLORS.type3}
                  name="유형3"
                />
                <Area
                  type="monotone"
                  dataKey="type2"
                  stackId="1"
                  stroke={COLORS.type2}
                  fill={COLORS.type2}
                  name="유형2"
                />
                <Area
                  type="monotone"
                  dataKey="type1"
                  stackId="1"
                  stroke={COLORS.type1}
                  fill={COLORS.type1}
                  name="유형1"
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>토지지목별 변화 [서귀포]</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={seogwipoLandUse}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                          <p className="font-semibold">{`${label}년`}</p>
                          {payload.reverse().map((entry: TooltipEntry) => (
                            <p
                              key={entry.name}
                              style={{ color: entry.color }}
                            >{`${entry.name}: ${Number(entry.value).toFixed(3)}`}</p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="type5"
                  stackId="1"
                  stroke={COLORS.type5}
                  fill={COLORS.type5}
                  name="유형5"
                />
                <Area
                  type="monotone"
                  dataKey="type4"
                  stackId="1"
                  stroke={COLORS.type4}
                  fill={COLORS.type4}
                  name="유형4"
                />
                <Area
                  type="monotone"
                  dataKey="type3"
                  stackId="1"
                  stroke={COLORS.type3}
                  fill={COLORS.type3}
                  name="유형3"
                />
                <Area
                  type="monotone"
                  dataKey="type2"
                  stackId="1"
                  stroke={COLORS.type2}
                  fill={COLORS.type2}
                  name="유형2"
                />
                <Area
                  type="monotone"
                  dataKey="type1"
                  stackId="1"
                  stroke={COLORS.type1}
                  fill={COLORS.type1}
                  name="유형1"
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>작물별 변화 [제주]</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={jejuCropData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                          <p className="font-semibold">{`${label}년`}</p>
                          {payload.reverse().map((entry: TooltipEntry) => (
                            <p
                              key={entry.name}
                              style={{ color: entry.color }}
                            >{`${entry.name}: ${Number(entry.value).toFixed(0)}`}</p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="crop5" stackId="a" fill={COLORS.crop5} name="작물5" />
                <Bar dataKey="crop4" stackId="a" fill={COLORS.crop4} name="작물4" />
                <Bar dataKey="crop3" stackId="a" fill={COLORS.crop3} name="작물3" />
                <Bar dataKey="crop2" stackId="a" fill={COLORS.crop2} name="작물2" />
                <Bar dataKey="crop1" stackId="a" fill={COLORS.crop1} name="작물1" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>작물별 변화 [서귀포]</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={seogwipoCropData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                          <p className="font-semibold">{`${label}년`}</p>
                          {payload.reverse().map((entry: TooltipEntry) => (
                            <p
                              key={entry.name}
                              style={{ color: entry.color }}
                            >{`${entry.name}: ${Number(entry.value).toFixed(0)}`}</p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="crop5" stackId="a" fill={COLORS.crop5} name="작물5" />
                <Bar dataKey="crop4" stackId="a" fill={COLORS.crop4} name="작물4" />
                <Bar dataKey="crop3" stackId="a" fill={COLORS.crop3} name="작물3" />
                <Bar dataKey="crop2" stackId="a" fill={COLORS.crop2} name="작물2" />
                <Bar dataKey="crop1" stackId="a" fill={COLORS.crop1} name="작물1" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

