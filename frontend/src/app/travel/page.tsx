"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { summer, winter, monsoon } from "../../components/data";
import { initializeMap, addMarker, handleGetLocation } from "@/lib/actions";

//  No direct Leaflet import at the top
type Place = {
  name: string;
  location: [number, number];
  description: string;
};

const Travel: React.FC = () => {
  const mapRef = useRef<any>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const markersRef = useRef<any[]>([]);
  const [L, setL] = useState<any>(null); //  Store Leaflet dynamically

  useEffect(() => {
    if (typeof window === "undefined") return; // Runs only in the browser

    import("leaflet").then((Leaflet) => {
      setL(Leaflet); // Load Leaflet dynamically
    });
  }, []);

  useEffect(() => {
    if (!L || !mapRef.current) return; // Ensure Leaflet is loaded

    const map = initializeMap(mapRef);
    if (!map) return;

    addMarker(map, markersRef, [19.076, 72.8777], "Mumbai - Financial Capital of India");

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [L]);

  useEffect(() => {
    if (!L || !mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    let places: Place[] = [];
    if (selectedSeason === "summer") places = summer as Place[];
    if (selectedSeason === "winter") places = winter as Place[];
    if (selectedSeason === "monsoon") places = monsoon as Place[];

    places.forEach((place) => {
      addMarker(mapRef.current!, markersRef, place.location, `<b>${place.name}</b><br>${place.description}`);
    });
  }, [selectedSeason, L]);

  return (
    <div>
      <button
        className="fixed right-8 bottom-8 z-[1000] bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg"
        onClick={() => handleGetLocation(mapRef, markersRef)}
      >
        Go to my location
      </button>

      <div className="absolute inset-0 h-full w-full z-0" id="map"></div>

      <div>
        <select
          className="fixed top-[80px] left-[60px] z-50 px-2 py-3 bg-blue-500 text-white flex items-center justify-center border-none rounded-md cursor-pointer"
          onChange={(e) => setSelectedSeason(e.target.value)}
          value={selectedSeason}
        >
          <option value="">Select the season</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="monsoon">Monsoon</option>
        </select>
      </div>
    </div>
  );
};

// ✅ Prevents SSR to avoid "window is not defined" error
export default dynamic(() => Promise.resolve(Travel), { ssr: false });
