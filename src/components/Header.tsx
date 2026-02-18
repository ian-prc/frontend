import AppLogo from "@/assets/app-logo.png";

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-20 px-6 bg-[#5F9598] shadow-md">
      {/* Logo Container - Circular with nice padding */}
      <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-inner">
        <img
          src={AppLogo}
          alt="App Logo"
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Centered Greeting - Using absolute positioning for true center */}
      <h1 className="absolute left-1/2 -translate-x-1/2 text-white font-bold italic tracking-wide text-lg">
        HELLO USER
      </h1>

      {/* Placeholder for future elements (e.g., Logout or Menu) */}
      <div className="w-16 h-16" aria-hidden="true" />
    </header>
  );
}

export default Header;
