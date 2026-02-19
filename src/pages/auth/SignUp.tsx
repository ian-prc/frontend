import { useAuthStore } from "@/stores/auth/auth.store";
import type { AccountType } from "@/types/account/account.type";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import TermsAndConditions from "@/components/TermCondition"; 

// ConfirmPassword for form
interface SignUpFormType extends Partial<AccountType> {
  confirmPassword: string;
}

function SignUp() {
  const { loading, setRegister } = useAuthStore();
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState<SignUpFormType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Terms checkbox state
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Terms modal state
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      toast.error("You must accept the Terms and Conditions.");
      return;
    }

    const success = await setRegister(form);
    if (success) navigate("/login");
  };

  return (
    <div className="bg-[#F5F5F5] w-screen h-screen flex flex-col justify-center items-center font-sans">
      <form
        onSubmit={submitForm}
        className="relative bg-[#1D546D] w-full h-150 mt-80 pt-24 pb-10 px-10 rounded-2xl flex flex-col gap-4 shadow-2xl"
      >
    
        <div className="absolute -top-60 left-1/2 -translate-x-1/2">
          <div className="bg-[#F5F5F5] rounded-full p-2">
            <FaRegUserCircle className="text-[180px] text-[#5F9598]" />
          </div>
        </div>

  
        <div className="relative mt-4">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="name"
            required
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full bg-white py-3 pl-12 pr-6 rounded-full outline-none focus:ring-2 focus:ring-[#5F9598]"
          />
        </div>

        <div className="relative">
          <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full bg-white py-3 pl-12 pr-6 rounded-full outline-none focus:ring-2 focus:ring-[#5F9598]"
          />
        </div>

        <div className="relative">
          <IoIosLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full bg-white py-3 pl-12 pr-6 rounded-full outline-none focus:ring-2 focus:ring-[#5F9598]"
          />
        </div>


        <div className="relative">
          <IoIosLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="confirmPassword"
            type="password"
            required
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full bg-white py-3 pl-12 pr-6 rounded-full outline-none focus:ring-2 focus:ring-[#5F9598]"
          />
        </div>

      
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="w-4 h-4 accent-[#5F9598]"
          />
          <label
            htmlFor="terms"
            className="text-white text-sm flex items-center gap-1 cursor-pointer"
          >
            I agree to the
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-white text-sm underline hover:text-blue-200"
            >
              Terms and Conditions
            </button>
          </label>
        </div>

   
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={loading || !acceptedTerms}
            className="bg-[#5F9598] hover:bg-[#4d7a7c] text-white font-bold py-3 px-12 rounded-full transition-transform active:scale-95 disabled:opacity-70"
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </div>


   
        <div className="text-center mt-2">
          <Link to="/login" className="text-white text-sm hover:text-blue-200">
            Already have an account?{" "}
            <span className="font-bold hover:underline">Login here</span>
          </Link>
        </div>
      </form>

      
      <TermsAndConditions
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </div>
  );
}

export default SignUp;
