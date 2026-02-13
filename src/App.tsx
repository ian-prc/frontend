import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "../src/pages/auth/LogIn";
import SplashScreen from "./components/SplashScreen";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/home/Dashboard";
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
    {
      path: "/dashboard",
      Component: Dashboard,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  );
}
export default App;
