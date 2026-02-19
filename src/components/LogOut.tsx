import { useAuthStore } from "@/stores/auth/auth.store";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

function LogOut() {
  // 1. Destructure exactly what is in your store (user and logout)
  const { logout} = useAuthStore(); 
  const navigate = useNavigate();
  


  const handleLogout = async () => {
    try {
      // 2. Use 'logout' (the name from your store)
      await logout(); 
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (

  <button
  onClick={handleLogout}
  className="absolute ml-85 mt-9 flex items-center gap-2 bg-[#5F9598] hover:bg-[#841427] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl transition-all duration-300 hover:shadow-md active:scale-95 group z-50"
  title="Logout"
>
  <span className="font-bold text-sm hidden md:block">Sign Out</span>
  <HiOutlineLogout className="text-xl group-hover:translate-x-1 transition-transform" />
</button>



     
  );
}

export default LogOut;