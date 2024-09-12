'use client'

import React from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import MapboxPolygonGrid from '@/components/MapboxPolygonGrid'

const PrivatePage: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="h-screen w-full">
        <MapboxPolygonGrid />
      </div>
    </ErrorBoundary>
  )
}

export default PrivatePage