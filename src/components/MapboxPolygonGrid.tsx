'use client'

import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
if (!MAPBOX_ACCESS_TOKEN) {
  console.error('Mapbox access token is not defined in environment variables')
}
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN || ''

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
  const map = useRef<mapboxgl.Map | null>(null)
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    console.log('Initializing map...')

    const initializeMap = async () => {
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-v9',
          center: [14.8, 37.48],
          zoom: 10
        })

        console.log('Map instance created successfully')

        map.current.on('load', () => {
          if (!map.current) {
            console.error('Map instance is null')
            setError('Failed to initialize map')
            return
          }

          console.log('Adding source and layers...')

          try {
            map.current.addSource('polygons', {
              type: 'geojson',
              data: POLYGON_DATA
            })

            map.current.addLayer({
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

            map.current.addLayer({
              id: 'polygon-borders',
              type: 'line',
              source: 'polygons',
              paint: {
                'line-color': '#ffffff',
                'line-width': 2
              }
            })

            console.log('Layers added successfully')

            map.current.on('click', 'polygon-fills', handlePolygonClick)
            map.current.on('mouseenter', 'polygon-fills', () => {
              if (map.current) map.current.getCanvas().style.cursor = 'pointer'
            })
            map.current.on('mouseleave', 'polygon-fills', () => {
              if (map.current) map.current.getCanvas().style.cursor = ''
            })

            setMapLoaded(true)
            console.log('Map fully initialized')
          } catch (err) {
            console.error('Error adding layers:', err)
            setError('Failed to add map layers')
          }
        })

        map.current.on('error', (e) => {
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
      console.log('Cleaning up map...')
      if (map.current) {
        map.current.off('click', 'polygon-fills', handlePolygonClick)
        map.current.remove()
      }
      setMapLoaded(false)
    }
  }, [])

  const handlePolygonClick = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
    console.log('Polygon clicked:', e.features)
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
        setSelectedPolygon(clickedI