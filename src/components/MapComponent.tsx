'use client'

import { useState, useCallback } from 'react'
import { GoogleMap, Polygon, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 37.502578,
  lng: 14.909234
}

interface LandPlot {
  id: number
  coordinates: { lat: number; lng: number }[]
}

interface MapComponentProps {
  landPlots: LandPlot[]
  onPlotSelect: (plotId: number) => void
}

export default function MapComponent({ landPlots, onPlotSelect }: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA0yxR88acE9_otHAjrdLCscETZlSDgx6I'
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds()
    landPlots.forEach(plot => {
      plot.coordinates.forEach(coord => {
        bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng))
      })
    })
    map.fitBounds(bounds)
    setMap(map)
  }, [landPlots])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handlePolygonClick = (plotId: number) => {
    setSelectedPlot(plotId)
    onPlotSelect(plotId)
  }

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {landPlots.map((plot) => (
        <Polygon
          key={plot.id}
          paths={plot.coordinates}
          options={{
            fillColor: selectedPlot === plot.id ? '#4CAF50' : '#FF9800',
            fillOpacity: 0.35,
            strokeColor: '#FF5722',
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
          onClick={() => handlePolygonClick(plot.id)}
        />
      ))}
    </GoogleMap>
  )
}