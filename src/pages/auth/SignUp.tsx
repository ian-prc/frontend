import { useAuthStore } from "@/stores/auth/auth.store";
import type { AccountType } from "@/types/account/account.type";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const { loading, setRegister } = useAuthStore();

  const [form, setForm] = useState<Partial<AccountType>>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Password do not match.");
      return;
    }

    const success = await setRegister(form);
    if (success) navigate("/login");
  };

  return (
    <form
      onSubmit={submitForm}
      className="bg-[#F5F5F5] w-screen h-screen flex justify-center items-center"
    >
      <div className="relative ">
        <FaRegUserCircle className="absolute -top-60 -translate-y-1/2 left-35 text-9xl text-[#5F9598]" />
      </div>
      <div className="bg-[#1D546D] w-120 h-150 rounded-4xl mt-130 px-5 flex flex-col gap-5">
        <div className="relative">
          <FaUser className="absolute top-22 -translate-y-1/2 left-3" />
          <input
            name="name"
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full bg-white p-3 px-8 rounded-full border-2 mt-15"
          />
        </div>
        <div className="relative">
          <MdEmail className="absolute top-1/2 -translate-y-1/2 left-3" />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full bg-white p-3 px-8 rounded-full border-2 "
          />
        </div>
        <div className="relative">
          <IoIosLock className="absolute top-1/2 -translate-y-1/2 left-3" />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full bg-white p-3 px-8 rounded-full border-2 "
          />
        </div>
        <div className="relative">
          <IoIosLock className="absolute top-1/2 -translate-y-1/2 left-3" />
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full bg-white p-3 px-8 rounded-full border-2 "
          />
        </div>
        <div className="pl-55">
          <Link to="/login" className="text-white hover:underline">
            Term and Condition
          </Link>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#5F9598] text-white font-bold text-center w-30 py-2 px-2 rounded-full cursor-pointer"
          >
            {" "}
            {loading ? "Loading.." : "Register"}{" "}
          </button>
        </div>
        <Link to="/login" className="text-secondary text-white ml-15">
          {" "}
          Already have an account? Login here{" "}
        </Link>
      </div>
    </form>
  );
}
export default SignUp;
