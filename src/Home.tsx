import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLogo from "./assets/app-logo.png";
import SplashScreen from "./SplashScreen";

function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <SplashScreen />;

  return (
    <div className="bg-[#F5F5F5] w-screen h-screen relative">
      <div className="flex items-center justify-center">
        <img src={AppLogo} alt="App Logo" className="w-40 h-40 mt-40" />
      </div>
      <div className="">
        <p className="text-[#1D546D] font-bold font-italic text-center text-3xl mt-10">
          Welcome
        </p>
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/landing")}
          className="bg-[#5F9598] text-white font-bold py-2 px-2 rounded-md"
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
}
export default Home;
