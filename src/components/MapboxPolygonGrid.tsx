'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import mapboxgl, { Map as MapboxMap, MapboxGeoJSONFeature } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1Ijoia2FheWFyZG8iLCJhIjoiY20wenBmanZnMDkwbDJ5cXluOTgxejBpeCJ9.95Yaxn2orjxXZis4kvOQaw'

if (!MAPBOX_ACCESS_TOKEN) {
  console.error('Mapbox access token is not defined')
}
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

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
    }
  ]
}

const MapboxPolygonGrid: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<MapboxMap | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePolygonClick = useCallback((e: mapboxgl.MapMouseEvent & { features?: MapboxGeoJSONFeature[] }) => {
    const features = e.features
    if (features && features.length > 0) {
      const polygonId = features[0].properties?.id as number | undefined
      setSelectedPolygon(polygonId !== undefined ? polygonId : null)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let isMounted = true
    const initializeMap = async () => {
      if (!mapContainer.current) {
        console.error('Map container not found')
        return
      }

      try {
        if (!map.current) {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [14.8, 37.48],
            zoom: 10,
          })
        }

        map.current.on('load', () => {
          if (!isMounted || !map.current) return
          console.log('Map loaded successfully')
          setMapLoaded(true)

          map.current.addSource('polygons', {
            type: 'geojson',
            data: POLYGON_DATA,
          })

          map.current.addLayer({
            id: 'polygon-fill',
            type: 'fill',
            source: 'polygons',
            paint: {
              'fill-color': '#888',
              'fill-opacity': 0.4,
            }
          })

          map.current.addLayer({
            id: 'polygon-outline',
            type: 'line',
            source: 'polygons',
            paint: {
              'line-color': '#000',
              'line-width': 2,
            }
          })

          map.current.on('click', 'polygon-fill', handlePolygonClick)
        })

        map.current.on('error', (e) => {
          console.error('Mapbox error:', e)
          if (isMounted) {
            setError(`Mapbox error: ${e.error.message}`)
          }
        })

      } catch (err) {
        console.error('Error creating map instance:', err)
        if (isMounted) {
          setError(`Failed to create map instance: ${err instanceof Error ? err.message : JSON.stringify(err)}`)
        }
      }
    }

    initializeMap()

    return () => {
      isMounted = false
      if (map.current) {
        map.current.remove()
      }
    }
  }, [handlePolygonClick])

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-red-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Map</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-left mb-4">
            <p className="font-semibold">Troubleshooting steps:</p>
            <ul className="list-disc list-inside">
              <li>Check if the Mapbox access token is correctly set.</li>
              <li>Ensure you have an active internet connection.</li>
              <li>Verify that the Mapbox API is not experiencing any outages.</li>
              <li>Check your browser console for any additional error messages.</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Access Token: {MAPBOX_ACCESS_TOKEN ? `${MAPBOX_ACCESS_TOKEN.slice(0, 10)}...` : 'Not set'}
          </p>
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