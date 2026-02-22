import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Recenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
}

export default function MarketPrices({ setScreen }) {
  const [userPos, setUserPos] = useState(null);
  const [stores, setStores] = useState([]);
  const mapRef = useRef(null);
  const [active, setActive ] = useState("1");

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(coords);

        // create some nearby sample stores (offsets)
        setStores([
          { id: 1, name: "Agri-Pro Solutions", coords: [coords[0] + 0.009, coords[1] + 0.006], dist: "1.2 km" },
          { id: 2, name: "Farmer's Depot", coords: [coords[0] - 0.01, coords[1] - 0.004], dist: "1.6 km" },
          { id: 3, name: "Seed & Soil Center", coords: [coords[0] + 0.005, coords[1] - 0.008], dist: "900 m" },
        ]);
      },
      (err) => {
        console.warn("Geolocation failed or denied", err);
        // fallback: a reasonable default center
        const defaultCenter = [6.9271, 79.8612];
        setUserPos(defaultCenter);
        setStores([
          { id: 1, name: "Agri-Pro Solutions", coords: [defaultCenter[0] + 0.009, defaultCenter[1] + 0.006], dist: "1.2 km" },
        ]);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  function handleLocateMe() {
    if (!navigator.geolocation) return alert("Geolocation not available");
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setUserPos(coords);
      if (mapRef.current) mapRef.current.setView(coords, 15);
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white h-full overflow-y-auto">

        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => setScreen?.("dashboard")} className="text-green-600">←</button>
          <h1 className="font-semibold">Local Market Prices</h1>
          <div />
        </div>

        <div className="p-3">
          <div className="bg-gray-50 rounded-xl p-2 flex items-center gap-2">
            <img src="/glass.svg" alt="search" className="w-5 h-5" />
            <input
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Search stores or products"
            />
          </div>
        </div>

        <div className="px-3 pb-40">
          <div className="w-full h-64 rounded-xl shadow-sm overflow-hidden">
            {userPos ? (
              <MapContainer
                whenCreated={(m) => (mapRef.current = m)}
                center={userPos}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <Recenter center={userPos} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={userPos}>
                  <Popup>You are here</Popup>
                </Marker>
                {stores.map((s) => (
                  <Marker key={s.id} position={s.coords}>
                    <Popup>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-xs text-gray-600">{s.dist} • Open</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="w-full h-full grid place-items-center text-sm text-gray-500">Locating you…</div>
            )}
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200 justify-center">
            <button className={active === "1" ? "px-3 py-1 bg-green-50 text-green-600 rounded-full" : "px-3 py-1 bg-white text-gray-700 rounded-full" } onClick={()=>{setActive("1")}}>Fertilizer Stores</button>
            <button className={active === "2" ? "px-3 py-1 bg-green-50 text-green-600 rounded-full" : "px-3 py-1 bg-white text-gray-700 rounded-full" } onClick={()=>{setActive("2")}}>Gov Centers</button>
            <button className={active === "3" ? "px-3 py-1 bg-green-50 text-green-600 rounded-full" : "px-3 py-1 bg-white text-gray-700 rounded-full" } onClick={()=>{setActive("3")}}>Seed</button>
          </div>

          <div className="mt-3 flex gap-2">
            <button onClick={handleLocateMe} className="flex-1 bg-white px-3 py-2 rounded-lg border">Locate me</button>
            <button className="bg-green-500 text-white px-3 py-2 rounded-lg">Filters</button>
          </div>

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white rounded-2xl shadow-lg p-4">
            {stores[0] ? (
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-lg grid place-items-center">
                    <img src="/Alert.svg" alt="store" className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{stores[0].name}</h3>
                    <p className="text-xs text-gray-500">{stores[0].dist} • Open until 6:00 PM</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">📞</button>
                    <button className="bg-gray-100 px-2 py-1 rounded-full">💬</button>
                  </div>
                </div>

                <div className="mt-3 bg-green-50 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded grid place-items-center">
                    <img src="/Alert.svg" alt="prod" className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-medium">IN STOCK</div>
                    <div className="text-xs text-gray-600">Potash Fertilizer, Urea, Neem Oil Spray</div>
                  </div>
                </div>

                <button className="mt-4 w-full bg-green-500 text-white py-3 rounded-full font-semibold">Get Directions</button>
              </div>
            ) : (
              <div className="text-center text-sm text-gray-600">No stores found nearby</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
