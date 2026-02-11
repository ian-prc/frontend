import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import LandingPage from "./LandingPage";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import SplashScreen from "./SplashScreen";

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
    </div>
  );
}
export default App;
