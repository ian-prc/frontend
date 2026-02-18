import AppLogo from "@/assets/app-logo.png";

function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#F5F5F5] overflow-hidden">
      {/* Logo Section */}
      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <img
          src={AppLogo}
          alt="App Logo"
          className="w-32 h-32 md:w-40 md:h-40 object-contain shadow-sm rounded-2xl"
        />

        <h1 className="mt-8 text-[#1D546D] text-3xl md:text-4xl font-bold italic tracking-tight">
          Welcome
        </h1>
      </div>

      {/* Loading Indicator - Positioned absolutely at the bottom */}
      <div className="absolute bottom-16 flex flex-col items-center">
        <div className="w-3 h-3 bg-[#5F9598] rounded-full animate-bounce" />
        <p className="mt-2 text-xs font-medium text-[#1D546D]/60 uppercase tracking-widest">
          Loading
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
