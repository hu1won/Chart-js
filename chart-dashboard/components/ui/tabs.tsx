import React, { createContext, useContext, useState } from 'react'

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const Tabs: React.FC<{ children: React.ReactNode; defaultValue: string }> = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex space-x-2 mb-4">{children}</div>
}

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const { activeTab, setActiveTab } = context

  return (
    <button
      className={`px-4 py-2 rounded-md ${
        activeTab === value
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

export const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab } = context

  if (activeTab !== value) return null

  return <div>{children}</div>
}

