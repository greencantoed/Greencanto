import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Define the type for our projects
type Project = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

// Sample data for agrivoltaics projects
const projects: Project[] = [
  { id: 1, name: "Progetto Agrivoltaico 1", latitude: 37.5994, longitude: 14.0154 },
  { id: 2, name: "Progetto Agrivoltaico 2", latitude: 37.0754, longitude: 14.2534 },
  // Add more projects as needed
];

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2FheWFyZG8iLCJhIjoiY2xmd3J0dDcyMGZmeTNmbzBvcGt4bWhpZCJ9.YVXSKaOOTcQNwqYXhfRH0Q'; // Replace with your actual Mapbox token

export default function SicilyMap() {
  const [popupInfo, setPopupInfo] = useState<Project | null>(null);

  return (
    <Map
      initialViewState={{
        latitude: 37.5994,
        longitude: 14.0154,
        zoom: 7
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {projects.map((project) => (
        <Marker
          key={project.id}
          latitude={project.latitude}
          longitude={project.longitude}
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(project);
          }}
        >
          <button className="marker-btn">
            <img src="/marker.png" alt="Marker" />
          </button>
        </Marker>
      ))}

      {popupInfo && (
        <Popup
          anchor="top"
          latitude={popupInfo.latitude}
          longitude={popupInfo.longitude}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <h3>{popupInfo.name}</h3>
            {/* Add more project details here */}
          </div>
        </Popup>
      )}
    </Map>
  );
}