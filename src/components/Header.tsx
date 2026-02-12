import AppLogo from "@/assets/app-logo.png";
function Header(){
    return(

      <div className="bg-[#5F9598] w-full h-20 rounded-lg p-3 flex fixed z-20 items-center justify-between px-8 py-1">
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
        </div>
    
    );
}
export default Header;