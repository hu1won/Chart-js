'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import LineChart from "@/components/LineChart"
import BarChart from "@/components/BarChart"
import PieChart from "@/components/PieChart"

export default function Home() {
  const [activeChart, setActiveChart] = useState<string | null>(null)

  const renderChart = () => {
    switch(activeChart) {
      case 'line':
        return <LineChart />
      case 'bar':
        return <BarChart />
      case 'pie':
        return <PieChart />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-24">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Chart Dashboard</h1>
        <div className="flex justify-center space-x-4 mb-8">
          <Button onClick={() => setActiveChart('line')}>Line Chart</Button>
          <Button onClick={() => setActiveChart('bar')}>Bar Chart</Button>
          <Button onClick={() => setActiveChart('pie')}>Pie Chart</Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg min-h-[400px]">
          {renderChart()}
        </div>
      </div>
    </div>
  )
}

