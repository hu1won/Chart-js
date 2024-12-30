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
  LineChart,
  Line
} from 'recharts'
import { farmData } from '../data/farmData'

export default function Button24() {
  const latestData = farmData[farmData.length - 1];

  return (
    <div className="flex space-x-6">
      <Card className="w-1/3 bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-800">농업 현황</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">계획 농가수</h3>
            <div className="text-4xl font-bold text-indigo-600">{latestData.plannedFarms}</div>
            <div className="text-sm text-gray-500">농가</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">계획 면적</h3>
            <div className="text-4xl font-bold text-green-600">{latestData.plannedArea}</div>
            <div className="text-sm text-gray-500">헥타르</div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-1/3 bg-gradient-to-br from-orange-50 to-red-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-800">계획 vs 실제 농가수</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={farmData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="year" tick={{fill: '#666'}} />
                <YAxis tick={{fill: '#666'}} />
                <Tooltip 
                  contentStyle={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}
                  itemStyle={{color: '#333'}}
                />
                <Legend wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="plannedFarms" fill="#8884d8" name="계획 농가수" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actualFarms" fill="#82ca9d" name="실제 농가수" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-1/3 bg-gradient-to-br from-green-50 to-teal-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-teal-800">농업 지표</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={farmData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="year" tick={{fill: '#666'}} />
                <YAxis yAxisId="left" tick={{fill: '#666'}} />
                <YAxis yAxisId="right" orientation="right" tick={{fill: '#666'}} />
                <Tooltip 
                  contentStyle={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}
                  itemStyle={{color: '#333'}}
                />
                <Legend wrapperStyle={{paddingTop: '20px'}} />
                <Line yAxisId="left" type="monotone" dataKey="leafFlowerRatio" stroke="#8884d8" name="화엽비" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="plantingDistance" stroke="#82ca9d" name="재식거리" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="visualInspection" stroke="#ffc658" name="달관조사" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="fruitCount" stroke="#ff7300" name="열매수" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="fruitSize" stroke="#0088fe" name="열매크기" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

