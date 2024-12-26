'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import LineChart from "@/components/LineChart"
import BarChart from "@/components/BarChart"
import PieChart from "@/components/PieChart"
import Button13 from "@/components/Button13"
import Button15 from "@/components/Button15"
import Button17 from "@/components/Button17"
export default function Home() {
  const [activeChart, setActiveChart] = useState<number | null>(null)

  const renderChart = () => {
    switch(activeChart) {
      case 1:
        return <LineChart />
      case 2:
        return <BarChart />
      case 3:
        return <PieChart />
      case 13:
        return <Button13 />
      case 15:
        return <Button15 />
      case 17:
        return <Button17 />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-12">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Chart Dashboard</h1>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 24 }, (_, i) => (
            <Button key={i} onClick={() => setActiveChart(i + 1)}>
              {i + 1}
            </Button>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg min-h-[600px]">
          {renderChart()}
        </div>
      </div>
    </div>
  )
}

