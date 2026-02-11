import AppLogo from "./assets/app-logo.png";

function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-[#F5F5F5]  p-3">
      <div className="bg-[#5F9598] w-full h-20 rounded-lg">
        <div className="bg-white w-20 h-20 absolute">
          <img src={AppLogo} alt="App Logo" className="absolute w-20 h-20 " />
          <h1 className="text-black font-bold font-italic">HELLO USER</h1>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
