// import React, { useState, useEffect } from "react";
// import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// const LiveTracking = () => {
//   const [currentPosition, setCurrentPosition] = useState(center);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       setCurrentPosition({
//         lat: latitude,
//         lng: longitude,
//       });
//     });

//     const watchId = navigator.geolocation.watchPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       setCurrentPosition({
//         lat: latitude,
//         lng: longitude,
//       });
//     });

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   useEffect(() => {
//     const updatePosition = () => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;

//         // console.log("Position updated:", latitude, longitude);
//         setCurrentPosition({
//           lat: latitude,
//           lng: longitude,
//         });
//       });
//     };

//     updatePosition(); // Initial position update

//     const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={currentPosition}
//         zoom={15}
//       >
//         <Marker position={currentPosition} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default LiveTracking;

// // import React, { useState, useEffect } from "react";
// // import {
// //   LoadScript,
// //   GoogleMap,
// // } from "@react-google-maps/api";

// // const containerStyle = {
// //   width: "100%",
// //   height: "100%",
// // };

// // const LiveTracking = () => {
// //   const [currentPosition, setCurrentPosition] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     if (!navigator.geolocation) {
// //       setError("Geolocation is not supported by your browser");
// //       return;
// //     }

// //     // Initial position
// //     navigator.geolocation.getCurrentPosition(
// //       ({ coords: { latitude, longitude } }) => {
// //         setCurrentPosition({ lat: latitude, lng: longitude });
// //       },
// //       (err) => setError(err.message),
// //       { enableHighAccuracy: true }
// //     );

// //     // Watch position continuously
// //     const watchId = navigator.geolocation.watchPosition(
// //       ({ coords: { latitude, longitude } }) => {
// //         setCurrentPosition({ lat: latitude, lng: longitude });
// //       },
// //       (err) => setError(err.message),
// //       { enableHighAccuracy: true, maximumAge: 0 }
// //     );

// //     return () => navigator.geolocation.clearWatch(watchId);
// //   }, []);

// //   const onLoad = (map) => {
// //     if (currentPosition) {
// //       // Create an Advanced Marker Element instead of the old Marker
// //       new window.google.maps.marker.AdvancedMarkerElement({
// //         position: currentPosition,
// //         map,
// //         title: "You are here 🚗",
// //       });
// //     }
// //   };

// //   if (error) {
// //     return <p style={{ color: "red" }}>Error: {error}</p>;
// //   }

// //   if (!currentPosition) {
// //     return <p>Fetching location...</p>;
// //   }

// //   return (
// //     <LoadScript
// //       googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
// //       libraries={["marker"]} // 👈 required for AdvancedMarkerElement
// //     >
// //       <GoogleMap
// //         mapContainerStyle={containerStyle}
// //         center={currentPosition}
// //         zoom={15}
// //         onLoad={onLoad}
// //       />
// //     </LoadScript>
// //   );
// // };

// // export default LiveTracking;

import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  // ✅ Load Google Maps API once
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", // ensures unique script
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    // Initial position
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCurrentPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });

    // Watch position continuously
    const watchId = navigator.geolocation.watchPosition(({ coords }) => {
      setCurrentPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={15}
    >
      <Marker position={currentPosition} />
    </GoogleMap>
  );
};

export default LiveTracking;
