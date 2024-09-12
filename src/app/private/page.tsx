'use client'

import dynamic from 'next/dynamic'

const MapboxPolygonGrid = dynamic(() => import('@/components/MapboxPolygonGrid'), { 
  ssr: false,
  loading: () => <div className="h-screen w-full flex items-center justify-center">Loading Map...</div>
})

const PrivatePage: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <h1 className="text-2xl font-bold p-4">Mapbox Polygon Grid</h1>
      <div className="h-[calc(100vh-4rem)]">
        <MapboxPolygonGrid />
      </div>
    </div>
  )
}

export default PrivatePage