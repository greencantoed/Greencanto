'use client'

import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1Ijoia2FheWFyZG8iLCJhIjoiY20wenBmanZnMDkwbDJ5cXluOTgxejBpeCJ9.95Yaxn2orjxXZis4kvOQaw'

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

const POLYGON_DATA: GeoJSON.FeatureCollection = {
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
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [14.8, 37.48],
      zoom: 10,
    })

    map.current.on('load', () => {
      setMapLoaded(true)
      if (!map.current) return

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

      map.current.on('click', 'polygon-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const polygonId = e.features[0].properties?.id as number | undefined
          setSelectedPolygon(polygonId !== undefined ? polygonId : null)
        }
      })
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  return (
    <div className="h-screen w-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-2xl font-semibold text