import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLogo from "./assets/app-logo.png";

function LandingPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
        <p className="text-[#1D546D] text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full flex flex-col items-center">
      <img src={AppLogo} alt="App Logo" className="w-40 h-40 mt-32" />

      <p className="text-[#1D546D] font-bold italic text-3xl mt-10">Welcome</p>

      <div className="flex flex-col items-center mt-12 space-y-4">
        <button
          onClick={() => navigate("/signup")}
          className="bg-[#5F9598] text-white font-bold py-2 px-8 rounded-md hover:opacity-90 transition"
        >
          Create Account
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-[#5F9598] text-white font-bold py-2 px-10 rounded-md hover:opacity-90 transition"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
