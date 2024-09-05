import { useParams } from "react-router-dom";

const HomePage = () => {
  const { userID } = useParams();
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <h1>UserID: {userID}</h1>
    </div>
  );
};

export default HomePage;
