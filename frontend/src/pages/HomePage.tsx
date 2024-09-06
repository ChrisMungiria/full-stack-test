import { useParams } from "react-router-dom";
import { logLogInTime, updateUserLocation } from "../actions";
import { useEffect } from "react";

const HomePage = () => {
  const { userID } = useParams();
  logLogInTime(userID!);

  useEffect(() => {
    if (userID) {
      logLogInTime(userID);

      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            updateUserLocation(userID, latitude, longitude);
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
    }
  }, [userID]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100">
      <div className="w-11/12 max-w-xs bg-white rounded-md p-4 space-y-4">
        <h1 className="text-xl font-bold text-center">
          We are tracking your location until you leave the premises
        </h1>
        <h2 className="text-xs text-slate-500">
          *You agreed to this in the terms and conditions
        </h2>
      </div>
    </div>
  );
};

export default HomePage;
