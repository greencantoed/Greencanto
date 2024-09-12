'use client'

import dynamic from 'next/dynamic';

const MapboxPolygonGrid = dynamic(() => import('../components/MapboxPolygonGrid'), { ssr: false });

const HomePage = () => {
  return (
    <div>
      <h1>Mapbox with Polygon Grid</h1>
      <MapboxPolygonGrid />
    </div>
  );
};

export default HomePage;
