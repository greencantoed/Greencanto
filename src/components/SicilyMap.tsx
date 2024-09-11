'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FheWFyZG8iLCJhIjoiY2xmd3J0dDcyMGZmeTNmbzBvcGt4bWhpZCJ9.YVXSKaOOTcQNwqYXhfRH0Q'

interface Cell {
  id: string
  coordinates: number[][]
}

const landParcels = [
  {
    id: 'land1',
    coordinates: [
      [14.908150559846465, 37.503217061923806],
      [14.909234, 37.502578],
      [14.913461162971762, 37.50185500731567],
      [14.915404, 37.503990],
      [14.913262, 37.504272],
      [14.912478, 37.504563],
      [14.91118664972715, 37.5039488183456]
    ]
  },
  {
    id: 'land2',
    coordinates: [
      [14.911509, 37.500961],
      [14.9138164, 37.500375],
      [14.9109129, 37.5000603],
      [14.916455, 37.501727],
      [14.91684296960928, 37.503105905104434],
      [14.915512593937905, 37.50364212161175],
      [14.913702, 37.501844]
    ]
  },
  {
    id: 'land3',
    coordinates: [
      [14.719277, 37.454194],
      [14.721626, 37.453570],
      [14.723139, 37.448083],
      [14.726673, 37.442245],
      [14.7263289, 37.4416815],
      [14.722852, 37.447178]
    ]
  }
]

export default function SicilyMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())

  const handleCellClick = useCallback((e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
    if (e.features && e.features.length > 0 && map.current) {
      const clickedId = e.features[0].properties!.id as string
      const newSelectedCells = new Set(selectedCells)

      if (newSelectedCells.has(clickedId)) {
        newSelectedCells.delete(clickedId)
        map.current.setFeatureState(
          { source: 'grid', id: clickedId },
          { selected: false }
        )
      } else {
        newSelectedCells.add(clickedId)
        map.current.setFeatureState(
          { source: 'grid', id: clickedId },
          { selected: true }
        )
      }

      setSelectedCells(newSelectedCells)
    }
  }, [selectedCells])

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [14.9134, 37.5018],
      zoom: 14
    })

    map.current.on('load', () => {
      const allCells: Cell[] = []

      landParcels.forEach((parcel, index) => {
        const polygon = turf.polygon([parcel.coordinates])
        const bbox = turf.bbox(polygon)
        const cellSide = 0.001 // Approximately 100m
        const options = { units: 'kilometers' as const }
        const grid = turf.squareGrid(bbox, cellSide, options)

        grid.features.forEach((cell, cellIndex) => {
          const cellPolygon = turf.polygon(cell.geometry.coordinates as turf.Position[][])
          const intersection = turf.intersect(cellPolygon, polygon)
          if (intersection) {
            allCells.push({
              id: `${parcel.id}-${cellIndex}`,
              coordinates: cell.geometry.coordinates[0] as number[][]
            })
          }
        })

        map.current!.addSource(`land-${index}`, {
          type: 'geojson',
          data: polygon
        })

        map.current!.addLayer({
          id: `land-${index}-outline`,
          type: 'line',
          source: `land-${index}`,
          paint: {
            'line-color': '#ffffff',
            'line-width': 2
          }
        })
      })

      map.current!.addSource('grid', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: allCells.map(cell => ({
            type: 'Feature',
            properties: { id: cell.id },
            geometry: {
              type: 'Polygon',
              coordinates: [cell.coordinates]
            }
          }))
        }
      })

      map.current!.addLayer({
        id: 'grid-fill',
        type: 'fill',
        source: 'grid',
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

      map.current!.addLayer({
        id: 'grid-outline',
        type: 'line',
        source: 'grid',
        paint: {
          'line-color': '#ffffff',
          'line-width': 1
        }
      })

      map.current!.on('click', 'grid-fill', handleCellClick)

      map.current!.on('mouseenter', 'grid-fill', () => {
        map.current!.getCanvas().style.cursor = 'pointer'
      })

      map.current!.on('mouseleave', 'grid-fill', () => {
        map.current!.getCanvas().style.cursor = ''
      })
    })

    return () => {
      map.current?.remove()
    }
  }, [handleCellClick])

  return (
    <div className="h-screen w-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Selected Cells</h2>
        <p>{selectedCells.size} cells selected</p>
      </div>
    </div>
  )
}