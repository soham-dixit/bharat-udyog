const useGeolocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            switch (err.code) {
              case err.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                break;
              case err.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
              case err.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
              default:
                setError("An unknown error occurred.");
            }
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    }, []);
  
    return { location, error };
  };
  