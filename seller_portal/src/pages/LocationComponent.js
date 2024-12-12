import React, { useState, useEffect } from 'react';
import LocationMap from './LocationMap';

const LocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (!("geolocation" in navigator)) {
          throw new Error("Geolocation is not supported by your browser");
        }

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const handleLocationSelect = (lat, lng) => {
    setLocation({
      latitude: lat,
      longitude: lng
    });
  };

  if (loading) {
    return <div>Loading location...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error getting location: {error}</div>;
  }
  return (
    <div>
      <h1>Current Location</h1>
      {location.latitude && location.longitude ? (
        <>
          <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
          <LocationMap 
            latitude={location.latitude} 
            longitude={location.longitude}
            onLocationSelect={handleLocationSelect}
          />
        </>
      ) : (
        <p>Unable to detect location. Please ensure you've granted location permissions.</p>
      )}
    </div>
  );
};

export default LocationComponent;