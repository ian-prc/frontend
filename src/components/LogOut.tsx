import { useAuthStore } from "@/stores/auth/auth.store";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

function TopHeader() {
  // 1. Destructure exactly what is in your store (user and logout)
  const { logout} = useAuthStore(); 
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length === 0) return "Dashboard";
    
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

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
    <header className="fixed top-0 right-0 left-0 h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 md:px-10 z-40 border-b border-gray-100">
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-bold text-[#1D546D] tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-[#1D546D] font-semibold text-sm leading-tight">
              {/* 3. This now works because 'user' is destructured above */}
          
            </span>
            <div className="flex items-center justify-end gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[#5F9598] text-[10px] uppercase font-bold tracking-wider">Online</span>
            </div>
          </div>
          
          <div className="h-10 w-10 rounded-full bg-[#1D546D]/10 flex items-center justify-center text-[#1D546D] font-bold border border-[#1D546D]/20">
       
          </div>
        </div>

        <div className="h-8 w-8 bg-gray-200 mx-1 hidden sm:block" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#1D546D] hover:bg-[#c94b4b] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 group"
          title="Logout"
        >
          <span className="font-bold text-sm hidden md:block">Sign Out</span>
          <HiOutlineLogout className="text-xl group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </header>
  );
}

export default TopHeader;