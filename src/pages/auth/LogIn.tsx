import { useAuthStore } from "@/stores/auth/auth.store";
import type { AccountType } from "@/types/account/account.type";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaEye, FaEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const { loading, setLogin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<Partial<AccountType>>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const success = await setLogin(form);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="bg-[#F5F5F5] w-screen h-screen flex flex-col justify-center items-center font-sans">
      <form
        onSubmit={submitForm}
        className="relative bg-[#1D546D] w-full mt-80 h-150 pt-24 pb-12 px-10 rounded-2xl flex flex-col gap-6 shadow-2xl"
      >
        <div className="absolute -top-60 left-1/2 -translate-x-1/2">
          <div className="bg-[#F5F5F5] rounded-full  p-2">
            <FaRegUserCircle className="text-[180px] text-[#5F9598]" />
          </div>
        </div>

        <div className="relative mt-4">
          <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-white py-3.5 pl-12 pr-6 rounded-full outline-none focus:ring-2 focus:ring-[#5F9598] transition-all"
          />
        </div>

        <div className="relative">
          <IoIosLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-white py-3.5 pl-12 pr-14 rounded-full outline-none focus:ring-2 focus:ring-[#5F9598] transition-all"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1D546D] transition-colors"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between px-2 text-sm">
          <label className="flex items-center space-x-2 text-white cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-none accent-[#5F9598]"
            />
            <span className="group-hover:text-gray-200 transition-colors">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-white hover:text-blue-200 hover:underline transition-all"
          >
            Forgot password?
          </Link>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#5F9598] hover:bg-[#4d7a7c] text-white font-bold py-3 px-12 rounded-full shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-white text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-white hover:text-blue-300 hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
