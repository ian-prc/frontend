import AppLogo from "@/assets/app-logo.png";

function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-[#F5F5F5] p-3">
      <div className="bg-[#5F9598] w-full h-20 rounded-lg relative">
        <h1 className="absolute top-7 left-1/2 -translate-x-1/2 text-black font-bold italic">
          HELLO USER
        </h1>

        <div className="bg-white w-20 h-20 rounded-full absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <img
            src={AppLogo}
            alt="App Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="absolute flex justify-center items-center -mt-60 min-h-screen">
          <div className="grid grid-cols-2 gap-4 place-items-center">
            <div className="bg-[#5F9598] text-white p-6 rounded-lg w-45">
              01
            </div>
            <div className="bg-white p-6 rounded-lg w-45 border-[#00449D]-3 "></div>
            <div className="col-span-2 bg-[#5F9598] text-white p-6 rounded-lg w-95">
              09
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
