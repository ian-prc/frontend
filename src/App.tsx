import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "../src/pages/auth/LogIn";
import SplashScreen from "./components/SplashScreen";
import SignUp from "./pages/auth/SignUp";
import Completed from "./pages/general/Completed";
import Dashboard from "./pages/general/Dashboard";
import Progress from "@/pages/general/Progress";
import Home from "./pages/home/Home";
import LandingPage from "./pages/LandingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/splashscreen",
      Component: SplashScreen,
    },
    {
      path: "/landing",
      Component: LandingPage,
    },
    {
      path: "/signup",
      Component: SignUp,
    },
    {
      path: "/login",
      Component: LogIn,
    },
    // --- AUTHENTICATED ROUTES WITH LOGOUT HEADER ---
    {
    
      children: [
        {
          path: "/dashboard",
          Component: Dashboard,
        },
        {
          path: "/progress",
          Component: Progress,
        },
        {
          path: "/completed",
          Component: Completed,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;