import { useEffect, useState } from "react";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

type InitialLocation = {
  latitude: number;
  longitude: number;
};

const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

const MapComponent = () => {
  const [initialLocation, setInitialLocation] = useState<InitialLocation>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setInitialLocation({
          latitude,
          longitude,
        });
      });
    }
  }, []);

  return (
    <>
      {initialLocation.latitude === 0 && initialLocation.longitude === 0 ? (
        <></>
      ) : (
        <MapContainer
          center={{
            lat: initialLocation.latitude,
            lng: initialLocation.longitude,
          }}
          zoom={20}
          scrollWheelZoom={false}
          style={{ height: "100%" }}
        >
          <Polygon
            pathOptions={{
              color: "purple",
            }}
            positions={[
              [-1.266219, 36.7983968],
              [-1.2673778, 36.7990406],
              [-1.2669702, 36.7960901],
            ]}
          />
          <Marker
            position={{
              lat: initialLocation.latitude,
              lng: initialLocation.longitude,
            }}
            icon={icon}
          >
            <Popup>This is your location</Popup>
          </Marker>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}
    </>
  );
};

export default MapComponent;
