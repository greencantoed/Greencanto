'use client'

import { useState } from 'react'
import MapComponent from '@/components/MapComponent'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import CommunityBlog from '@/components/CommunityBlog'

const landPlots = [
  {
    id: 1,
    coordinates: [
      { lat: 37.503217061923806, lng: 14.908150559846465 },
      { lat: 37.502578, lng: 14.909234 },
      { lat: 37.50185500731567, lng: 14.913461162971762 },
      { lat: 37.503990, lng: 14.915404 },
      { lat: 37.504272, lng: 14.913262 },
      { lat: 37.504563, lng: 14.912478 },
      { lat: 37.5039488183456, lng: 14.91118664972715 },
      { lat: 37.503217061923806, lng: 14.908150559846465 }
    ]
  },
  {
    id: 2,
    coordinates: [
      { lat: 37.500961, lng: 14.911509 },
      { lat: 37.500375, lng: 14.9138164 },
      { lat: 37.5000603, lng: 14.9109129 },
      { lat: 37.501727, lng: 14.916455 },
      { lat: 37.503105905104434, lng: 14.91684296960928 },
      { lat: 37.50364212161175, lng: 14.915512593937905 },
      { lat: 37.501844, lng: 14.913702 },
      { lat: 37.500961, lng: 14.911509 }
    ]
  }
]

export default function PrivatePage() {
  const [showBlog, setShowBlog] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null)

  const handleLogin = () => {
    // Implement actual login logic here
    setIsLoggedIn(true)
  }

  const handlePlotSelect = (plotId: number) => {
    setSelectedPlot(plotId)
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-[#2d677d] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Greencanto - Area Privata</h1>
          <div className="flex space-x-4">
            {!isLoggedIn && (
              <Button onClick={handleLogin} variant="outline">Accedi</Button>
            )}
            <Link href="/" passHref>
              <Button variant="outline">Torna alla Home</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow relative">
        <MapComponent landPlots={landPlots} onPlotSelect={handlePlotSelect} />
        {isLoggedIn && (
          <div className="absolute top-4 left-4 z-20">
            <Button onClick={() => setShowBlog(!showBlog)}>
              {showBlog ? 'Nascondi Blog' : 'Mostra Blog'}
            </Button>
          </div>
        )}
        {showBlog && isLoggedIn && (
          <div className="absolute inset-0 bg-white bg-opacity-90 overflow-auto z-30">
            <CommunityBlog />
          </div>
        )}
        {selectedPlot && (
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow z-20">
            <h3 className="text-lg font-semibold">Plot {selectedPlot}</h3>
            <p>Additional information about the plot can be displayed here.</p>
            <Button 
              className="mt-2"
              onClick={() => console.log(`Commit to purchase plot ${selectedPlot}`)}
            >
              Commit to Purchase
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}