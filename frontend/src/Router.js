import { createBrowserRouter } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import AddDetailsPage from "./pages/AddDetailsPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/addDetails",
    element: <AddDetailsPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);
export default router;
