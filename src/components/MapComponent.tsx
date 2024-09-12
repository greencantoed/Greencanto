'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, Polygon, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '80vh'  // Increased map size
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

const GRID_SIZE = 10 // Number of cells in each direction

export default function MapComponent({ landPlots, onPlotSelect }: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA0yxR88acE9_otHAjrdLCscETZlSDgx6I'
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null)
  const [gridCells, setGridCells] = useState<google.maps.Polygon[]>([])

  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds()
    landPlots.forEach(plot => {
      plot.coordinates.forEach(coord => {
        bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng))
      })
    })
    map.fitBounds(bounds)
    setMap(map)
    mapRef.current = map
  }, [landPlots])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handlePolygonClick = useCallback((plotId: number) => {
    setSelectedPlot(plotId)
    onPlotSelect(plotId)
    
    // Clear existing grid cells
    gridCells.forEach(cell => cell.setMap(null))
    setGridCells([])

    // Create grid for the selected plot
    const plot = landPlots.find(p => p.id === plotId)
    if (plot && mapRef.current) {
      const bounds = new google.maps.LatLngBounds()
      plot.coordinates.forEach(coord => bounds.extend(new google.maps.LatLng(coord.lat, coord.lng)))

      const ne = bounds.getNorthEast()
      const sw = bounds.getSouthWest()
      const latSpan = ne.lat() - sw.lat()
      const lngSpan = ne.lng() - sw.lng()

      const newCells: google.maps.Polygon[] = []

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const cellCoords = [
            { lat: sw.lat() + latSpan * (i / GRID_SIZE), lng: sw.lng() + lngSpan * (j / GRID_SIZE) },
            { lat: sw.lat() + latSpan * ((i + 1) / GRID_SIZE), lng: sw.lng() + lngSpan * (j / GRID_SIZE) },
            { lat: sw.lat() + latSpan * ((i + 1) / GRID_SIZE), lng: sw.lng() + lngSpan * ((j + 1) / GRID_SIZE) },
            { lat: sw.lat() + latSpan * (i / GRID_SIZE), lng: sw.lng() + lngSpan * ((j + 1) / GRID_SIZE) },
          ]

          const cell = new google.maps.Polygon({
            paths: cellCoords,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#00FF00',
            fillOpacity: 0.35,
            map: mapRef.current,
          })

          cell.addListener('click', () => {
            console.log(`Clicked cell: row ${i}, col ${j}`)
            // Here you can implement logic for selecting individual cells
          })

          newCells.push(cell)
        }
      }

      setGridCells(newCells)
    }
  }, [landPlots, onPlotSelect, gridCells])

  // Adjusted trapezoid-like coordinates
  const adjustedLandPlots: LandPlot[] = [
    {
      id: 1,
      coordinates: [
        { lat: 37.503217, lng: 14.908150 },
        { lat: 37.502578, lng: 14.909234 },
        { lat: 37.501855, lng: 14.913461 },
        { lat: 37.503990, lng: 14.915404 },
        { lat: 37.504272, lng: 14.913262 },
      ]
    },
    {
      id: 2,
      coordinates: [
        { lat: 37.500961, lng: 14.911509 },
        { lat: 37.500375, lng: 14.913816 },
        { lat: 37.501727, lng: 14.916455 },
        { lat: 37.503105, lng: 14.916842 },
        { lat: 37.503642, lng: 14.915512 },
      ]
    }
  ]

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {adjustedLandPlots.map((plot) => (
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
  ) : <></>
}