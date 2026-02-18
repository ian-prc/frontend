import { useAuthStore } from "@/stores/auth/auth.store";
import type { AccountType } from "@/types/account/account.type";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaEye, FaEyeSlash, FaRegUserCircle } from "react-icons/fa"; // Added Eye icons
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const { loading, setLogin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false); // State for visibility

  const [form, setForm] = useState<Partial<AccountType>>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const success = await setLogin(form);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="bg-[#F5F5F5] w-screen h-screen flex justify-center items-center"
    >
      <div className="relative ">
        <FaRegUserCircle className="absolute -top-60 -translate-y-1/2 left-35 text-9xl text-[#5F9598]" />
      </div>
      <div className="bg-[#1D546D] w-120 h-150 rounded-4xl mt-130 px-5 flex flex-col gap-8">
        {/* Email Field */}
        <div className="relative">
          <MdEmail className="absolute top-22 -translate-y-1/2 left-3" />
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full bg-white p-3 px-8 rounded-full border-2 mt-15"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <IoIosLock className="absolute top-7 -translate-y-1/2 left-3" />
          <input
            name="password"
            // Dynamic type based on state
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={handleChange}
            className="w-full bg-white p-3 px-8 pr-12 rounded-full border-2"
          />
          {/* Eye Icon Toggle */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-7 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#1D546D]"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>

          <div className="flex items-center space-x-2 mt-4 ml-3">
            <label htmlFor="remember" className="text-white cursor-pointer">
              Remember me
            </label>
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 cursor-pointer text-black border-2"
            />
            <Link
              to="/signup"
              className="text-white hover:underline hover:text-blue-500 pl-20"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative flex justify-center items-center pt-10">
            <button
              type="submit"
              className="bg-[#5F9598] text-white font-bold text-center w-30 py-2 px-2 rounded-full cursor-pointer"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>

        <p className="absolute mt-87 text-white ml-10">
          Don't have an account?{" "}
        </p>
        <Link
          to="/signup"
          className="text-secondary ml-55 text-blue-100 hover:text-blue-500 hover:underline"
        >
          Register here
        </Link>
      </div>
    </form>
  );
}

export default LogIn;
