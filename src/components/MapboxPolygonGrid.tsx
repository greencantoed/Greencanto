'use client'

import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FheWFyZG8iLCJhIjoiY2xmd3J0dDcyMGZmeTNmbzBvcGt4bWhpZCJ9.YVXSKaOOTcQNwqYXhfRH0Q'

// Define the type for the polygon properties
type PolygonFeature = {
  type: 'Feature'
  properties: {
    id: number
  }
  geometry: {
    type: 'Polygon'
    coordinates: number[][][]
  }
}

const POLYGON_DATA: {
  type: 'FeatureCollection'
  features: PolygonFeature[]
} = {
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
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null)

  useEffect(() => {
    if (map.current) return // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [14.8, 37.48],
      zoom: 10
    })

    map.current.on('load', () => {
      if (!map.current) return

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

      // Add click event
      map.current.on('click', 'polygon-fills', (e) => {
        if (e.features && e.features.length > 0) {
          const clickedId = e.features[0].properties?.id as number
          
          if (selectedPolygon !== null) {
            map.current!.setFeatureState(
              { source: 'polygons', id: selectedPolygon },
              { selected: false }
            )
          }

          if (selectedPolygon !== clickedId) {
            map.current!.setFeatureState(
              { source: 'polygons', id: clickedId },
              { selected: true }
            )
            setSelectedPolygon(clickedId)
          } else {
            setSelectedPolygon(null)
          }
        }
      })

      // Change cursor on hover
      map.current.on('mouseenter', 'polygon-fills', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer'
        }
      })
      map.current.on('mouseleave', 'polygon-fills', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = ''
        }
      })
    })

    return () => map.current?.remove()
  }, [])

  return (
    <div className="h-screen w-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
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
