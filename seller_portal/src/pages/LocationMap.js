import React, { useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_pin_icon.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

// Click handler component
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvent("click", (event) => {
    const { lat, lng } = event.latlng;
    onLocationSelect(lat, lng);
  });
  return null;
};

const LocationMap = ({ latitude, longitude, onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState([
    latitude,
    longitude,
  ]);

  const handleLocationSelect = useCallback(
    (lat, lng) => {
      setSelectedLocation([lat, lng]);
      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }
    },
    [onLocationSelect]
  );

  if (!latitude || !longitude) {
    return (
      <div style={{ padding: "1rem", color: "red" }}>
        Unable to load map: Invalid coordinates provided
      </div>
    );
  }

  return (
    <div>
      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={selectedLocation} icon={customIcon}>
            <MapClickHandler onLocationSelect={handleLocationSelect} />
            <Popup>
              You selected this location: <br />
              Latitude: {selectedLocation[0].toFixed(6)}, <br />
              Longitude: {selectedLocation[1].toFixed(6)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Display selected coordinates */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Selected Location Coordinates:</h3>
        <p>Latitude: {selectedLocation[0].toFixed(6)}</p>
        <p>Longitude: {selectedLocation[1].toFixed(6)}</p>
      </div>
    </div>
  );
};

export default LocationMap;
