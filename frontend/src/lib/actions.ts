import L, { Map as LeafletMap, LatLngExpression, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString();
const markerShadow = new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString();

export const initializeMap = (mapRef: React.MutableRefObject<LeafletMap | null>): LeafletMap | null => {
  if (typeof window === "undefined" || mapRef.current) return null;

  const map = L.map("map").setView([22.3511, 78.6677], 5);
  mapRef.current = map;

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

export const createIcon = () => {
  return L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export const addMarker = (
  map: LeafletMap,
  markersRef: React.MutableRefObject<Marker[]>,
  latlng: LatLngExpression,
  popupContent: string
) => {
  const marker = L.marker(latlng, { icon: createIcon() }).addTo(map);
  marker.bindPopup(popupContent);
  marker.on("click", () => map.flyTo(latlng, 15, { duration: 2 }));
  markersRef.current.push(marker);
};

export const handleGetLocation = (
  mapRef: React.MutableRefObject<LeafletMap | null>,
  markersRef: React.MutableRefObject<Marker[]>
) => {
  if (!mapRef.current) {
    console.error("Map is not initialized yet.");
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current!.flyTo([latitude, longitude], 15, { duration: 3 });
        addMarker(mapRef.current!, markersRef, [latitude, longitude], "You are here!");
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
        alert("Failed to get your location. Please enable your location.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};
