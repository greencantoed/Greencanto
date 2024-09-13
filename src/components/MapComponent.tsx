'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, Polygon, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '80vh'
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

const GRID_SIZE = 20 // Increased for smaller cells

export default function MapComponent({ landPlots, onPlotSelect }: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:
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

  const isPointInPolygon = (point: google.maps.LatLng, polygon: google.maps.LatLng[]) => {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat(), yi = polygon[i].lng();
      const xj = polygon[j].lat(), yj = polygon[j].lng();
      
      const intersect = ((yi > point.lng()) !== (yj > point.lng())) &&
        (point.lat() < (xj - xi) * (point.lng() - yi) / (yj - yi) + xi);
      if (intersect) isInside = !isInside;
    }
    return isInside;
  }

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

      const polygonPath = plot.coordinates.map(coord => new google.maps.LatLng(coord.lat, coord.lng))

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const cellCoords = [
            { lat: sw.lat() + latSpan * (i / GRID_SIZE), lng: sw.lng() + lngSpan * (j / GRID_SIZE) },
            { lat: sw.lat() + latSpan * ((i + 1) / GRID_SIZE), lng: sw.lng() + lngSpan * (j / GRID_SIZE) },
            { lat: sw.lat() + latSpan * ((i + 1) / GRID_SIZE), lng: sw.lng() + lngSpan * ((j + 1) / GRID_SIZE) },
            { lat: sw.lat() + latSpan * (i / GRID_SIZE), lng: sw.lng() + lngSpan * ((j + 1) / GRID_SIZE) },
          ]

          const cellCenter = new google.maps.LatLng(
            sw.lat() + latSpan * ((i + 0.5) / GRID_SIZE),
            sw.lng() + lngSpan * ((j + 0.5) / GRID_SIZE)
          )

          if (isPointInPolygon(cellCenter, polygonPath)) {
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
              cell.setOptions({ fillColor: '#FF0000' })
              console.log(`Selected cell: row ${i}, col ${j}`)
            })

            newCells.push(cell)
          }
        }
      }

      setGridCells(newCells)
    }
  }, [landPlots, onPlotSelect, gridCells])

  // Adjusted coordinates for non-overlapping fields
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
        { lat: 37.502800, lng: 14.914000 },
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
