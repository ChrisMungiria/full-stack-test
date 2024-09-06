import { useEffect, useState } from "react";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";

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

  const polygonCoords = [
    [-1.2614758, 36.798213],
    [-1.2720915, 36.7986427],
    [-1.2755358, 36.7943406],
    [-1.2614758, 36.798213], // Close the polygon
  ];

  const [isInsidePolygon, setIsInsidePolygon] = useState<boolean>(false);

  const checkIfInsidePolygon = (latitude: number, longitude: number) => {
    const point = turf.point([longitude, latitude]);
    const polygon = turf.polygon([
      polygonCoords.map((coord) => [coord[1], coord[0]]),
    ]);

    return turf.booleanPointInPolygon(point, polygon);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setInitialLocation({
          latitude,
          longitude,
        });
        const insidePolygon = checkIfInsidePolygon(latitude, longitude);
        setIsInsidePolygon(insidePolygon);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // TODO: log the user's location if they are inside the polygon
  }, [isInsidePolygon]);

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
              [-1.2614758, 36.798213],
              [-1.2720915, 36.7986427],
              [-1.2755358, 36.7943406],
            ]}
          />
          <Marker
            position={{
              lat: initialLocation.latitude,
              lng: initialLocation.longitude,
            }}
            icon={icon}
          >
            <Popup>
              This is your location
              {isInsidePolygon ? " - Inside Polygon" : " - Outside Polygon"}
            </Popup>
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
