import { useParams } from "react-router-dom";
import { logLogInTime } from "../actions";
import MapComponent from "../components/MapComponent";

const HomePage = () => {
  const { userID } = useParams();
  logLogInTime(userID!);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100">
      <div className="w-11/12 max-w-xs bg-white rounded-md p-4 space-y-4">
        <h1 className="text-xl font-bold text-center">
          We are tracking your location until you leave the premises
        </h1>
        <h2 className="text-xs text-slate-500">
          *You agreed to this in the terms and conditions
        </h2>
        <div className="w-full h-56 relative">
          <MapComponent userID={userID!} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
