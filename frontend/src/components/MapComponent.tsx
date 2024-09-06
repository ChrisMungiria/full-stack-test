import { useEffect, useState } from "react";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { updateUserLocation } from "../actions";

type Location = {
  latitude: number;
  longitude: number;
};

const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

const MapComponent = ({ userID }: { userID: string }) => {
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [isInsidePolygon, setIsInsidePolygon] = useState<boolean>(false);

  const polygonCoords = [
    [-1.2614758, 36.798213],
    [-1.2720915, 36.7986427],
    [-1.2755358, 36.7943406],
    [-1.2614758, 36.798213], // Close the polygon
  ];

  // const outsidePolygonCoords = [
  //   [-1.2720915, 36.7986427],
  //   [-1.2755358, 36.7943406],
  //   [-1.2747809, 36.794735],
  //   [-1.2720915, 36.7986427], // Close the polygon
  // ];

  const checkIfInsidePolygon = (latitude: number, longitude: number) => {
    const point = turf.point([longitude, latitude]);
    const polygon = turf.polygon([
      polygonCoords.map((coord) => [coord[1], coord[0]]),
    ]);

    return turf.booleanPointInPolygon(point, polygon);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({
            latitude,
            longitude,
          });
          const userInPolygon = checkIfInsidePolygon(latitude, longitude);
          setIsInsidePolygon(userInPolygon);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInsidePolygon) {
      updateUserLocation(userID, userLocation.latitude, userLocation.longitude);
    } else {
      console.log("You are not in the polygon");
    }
  }, [isInsidePolygon, userLocation.latitude, userLocation.longitude, userID]);

  return (
    <>
      {userLocation.latitude === 0 && userLocation.longitude === 0 ? (
        <></>
      ) : (
        <>
          <MapContainer
            center={{
              lat: userLocation.latitude,
              lng: userLocation.longitude,
            }}
            zoom={20}
            scrollWheelZoom={false}
            style={{ height: "90%" }}
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
                lat: userLocation.latitude,
                lng: userLocation.longitude,
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
          {isInsidePolygon && (
            <div className="flex items-center gap-2 my-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-green-500">Tracking</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MapComponent;
