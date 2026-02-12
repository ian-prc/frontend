import AppLogo from "@/assets/app-logo.png";

function SplashScreen() {
  return (
    <div className="bg-[#F5F5F5] w-screen h-screen relative">
      <div className="flex items-center justify-center">
        <img src={AppLogo} alt="App Logo" className="w-40 h-40 mt-40" />
      </div>
      <div className="">
        <p className="text-[#1D546D] font-bold font-italic text-center text-3xl mt-10">
          Welcome
        </p>
      </div>
      <div className="flex items-center justify-center ml-45 mt-30 bg-[#5F9598] w-10 h-10 rounded-full border-white"></div>
    </div>
  );
}
export default SplashScreen;
