import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapComponent({ lat = 0, lng = 0 }) {
  const [position, setPosition] = useState([lat, lng]);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
      console.log("Accuracy:", pos.coords.accuracy);
    },
    (err) => {
      console.error("Location error:", err);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}, []);
function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position]);

  return null;
}

  return (
    <div className="h-48 w-full rounded-xl overflow-hidden">
      <MapContainer
        center={position}
        zoom={13}
        attributionControl={false}   // 👈 removes footer
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} />
          <RecenterMap position={position} />  {/* 👈 ADD THIS */}

      </MapContainer>
    </div>
  );
}
