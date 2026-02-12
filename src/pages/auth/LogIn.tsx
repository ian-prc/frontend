import { useEffect, useState } from "react";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
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
    <div className="bg-[#F5F5F5] w-screnn h-screen flex justify-center items-center">
      <div className="relative ">
        <FaRegUserCircle className="absolute -top-60 -traslate-y-1/2 left-35 text-9xl text-[#5F9598]" />
      </div>
      <div className="bg-[#1D546D] w-120 h-150 rounded-4xl mt-130 px-5 flex flex-col gap-8">
        <div className="relative ">
          <FaUser className="absolute top-22 -translate-y-1/2 left-3" />
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full bg-white p-3 px-8 rounded-full border-2 mt-15"
          />
        </div>
        <div className="relative">
          <IoIosLock className="absolute top-7 -translate-y-1/2 left-3" />
          <input
            type="text"
            placeholder="Enter password"
            className="w-full bg-white p-3 px-8 rounded-full border-2 "
          />
          <div className="flex items-center space-x-2 mt-4 ml-3">
            <label htmlFor="remember" className="text-white cursor-pointer">
              Remember me
            </label>
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 cursor-pointer text-black border-2"
            />
            <Link to="/signup" className="text-white hover:underline pl-20">
              Forgot password?
            </Link>
          </div>
          <div className="relative flex justify-center items-center pt-10 ">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#5F9598] text-white font-bold text-center w-30 py-2 px-2 rounded-full"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
