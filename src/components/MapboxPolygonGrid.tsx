'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import type { Map as MapboxMap, MapboxGeoJSONFeature } from 'mapbox-gl'

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
if (!MAPBOX_ACCESS_TOKEN) {
  console.error('Mapbox access token is not defined in environment variables')
}

const POLYGON_DATA: GeoJSON.FeatureCollection<GeoJSON.Polygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 1 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [14.908150559846465, 37.503217061923806],
          [14.909234, 37.502578],
          [14.913461162971762, 37.50185500731567],
          [14.915404, 37.503990],
          [14.913262, 37.504272],
          [14.912478, 37.504563],
          [14.91118664972715, 37.5039488183456],
          [14.908150559846465, 37.503217061923806]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { id: 2 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [14.911509, 37.500961],
          [14.9138164, 37.500375],
          [14.9109129, 37.5000603],
          [14.916455, 37.501727],
          [14.91684296960928, 37.503105905104434],
          [14.915512593937905, 37.50364212161175],
          [14.913702, 37.501844],
          [14.911509, 37.500961]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { id: 3 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [14.719277, 37.454194],
          [14.721626, 37.453570],
          [14.723139, 37.448083],
          [14.726673, 37.442245],
          [14.7263289, 37.4416815],
          [14.722852, 37.447178],
          [14.719277, 37.454194]
        ]]
      }
    }
  ]
}

const MapboxPolygonGrid: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<MapboxMap | null>(null)
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePolygonClick = useCallback((e: { features?: MapboxGeoJSONFeature[] }) => {
    if (e.features && e.features.length > 0 && map.current) {
      const clickedId = e.features[0].properties?.id as number

      if (selectedPolygon !== null) {
        map.current.setFeatureState(
          { source: 'polygons', id: selectedPolygon },
          { selected: false }
        )
      }

      if (selectedPolygon !== clickedId) {
        map.current.setFeatureState(
          { source: 'polygons', id: clickedId },
          { selected: true }
        )
        setSelectedPolygon(clickedId)
      } else {
        setSelectedPolygon(null)
      }
    }
  }, [selectedPolygon])

  useEffect(() => {
    if (typeof window === 'undefined' || map.current || !mapContainer.current) return

    const initializeMap = async () => {
      try {
        const mapboxgl = (await import('mapbox-gl')).default
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN || ''

        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-v9',
          center: [14.8, 37.48],
          zoom: 10
        })

        newMap.on('load', () => {
          if (!newMap) return

          newMap.addSource('polygons', {
            type: 'geojson',
            data: POLYGON_DATA
          })

          newMap.addLayer({
            id: 'polygon-fills',
            type: 'fill',
            source: 'polygons',
            paint: {
              'fill-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                '#4CAF50',
                '#3388ff'
              ],
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                0.8,
                0.4
              ]
            }
          })

          newMap.addLayer({
            id: 'polygon-borders',
            type: 'line',
            source: 'polygons',
            paint: {
              'line-color': '#ffffff',
              'line-width': 2
            }
          })

          newMap.on('click', 'polygon-fills', handlePolygonClick)
          newMap.on('mouseenter', 'polygon-fills', () => {
            if (newMap) newMap.getCanvas().style.cursor = 'pointer'
          })
          newMap.on('mouseleave', 'polygon-fills', () => {
            if (newMap) newMap.getCanvas().style.cursor = ''
          })

          map.current = newMap
          setMapLoaded(true)
        })

        newMap.on('error', (e) => {
          console.error('Mapbox error:', e)
          setError(`Mapbox error: ${e.error.message}`)
        })

      } catch (err) {
        console.error('Error creating map instance:', err)
        setError(`Failed to create map instance: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    initializeMap()

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [handlePolygonClick])

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-red-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Map</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-2xl font-semibold text-gray-700">Loading map...</div>
        </div>
      )}
      {selectedPolygon !== null && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Selected Polygon</h2>
          <p>ID: {selectedPolygon}</p>
        </div>
      )}
    </div>
  )
}

export default MapboxPolygonGrid