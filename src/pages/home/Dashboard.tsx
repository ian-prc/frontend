import AppLogo from "@/assets/app-logo.png";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiProgress6Line } from "react-icons/ri";
import { SiVirustotal } from "react-icons/si";

function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-[#F5F5F5] p-3">
      <div className="bg-[#5F9598] w-full h-20 rounded-lg relative">
        <button
          type="submit"
          className="bg-[#5F9598] text-white font-bold py-4 px-4 rounded-lg  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#12777c] cursor-pointer"
        ></button>
        "
        <h1 className="absolute top-7 left-1/2 -translate-x-1/2 text-black font-bold italic">
          HELLO USER
        </h1>
        <div className="bg-white w-15 h-15 rounded-full absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <img
            src={AppLogo}
            alt="App Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="absolute flex justify-center items-center -mt-60 min-h-screen">
          <div className="relative justify-center grid grid-cols-2 gap-4 place-items-center">
            <div className="bg-white text-[#00449D] p-3 border-2 border-[#00449D] rounded-lg w-45">
              <SiVirustotal className="absolute flex justify-center items-center ml-25 w-12 h-12" />
              <h1 className="font-bold italic ml-3 ">5</h1>
              <p className="font-bold italic">Total</p>
            </div>
            <div className="bg-white p-3 rounded-lg w-45 border-[#841427] border-2 text-[#841427] italic font-bold ">
              <RiProgress6Line className="absolute flex justify-center -mt-2 ml-25 w-15 h-15 " />
              <h1 className="text-[#] font-bold italic ml-3">3</h1>
              <p className="text-[#841427] font-bold italic">In Progress</p>
            </div>
            <div className="col-span-2 bg-white border-2 border-[#12A122] text-[#12A122] p-3 rounded-lg w-95">
              <IoMdCheckmarkCircleOutline className="absolute flex justify-center items-center ml-75 -mt-1 w-15 h-15" />
              <h1 className="font-bold italic ml-3">2</h1>
              <p className="font-bold italic">Completed</p>
            </div>
          </div>
        </div>
        <div className="absolute mt-80 flex items-center justify-center gap-2 ">
          <input
            type="text"
            placeholder="Add Task"
            className="bg-white border-2 border-gray-300 rounded-lg w-80 py-4 px-3 font-bold italic"
          />
          <button
            type="submit"
            className="bg-[#5F9598] text-white font-bold py-4 px-4 rounded-lg  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#12777c] cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="relative mt-100 flex flex-col gap-3 italic">
            <div className="bg-[#5f9598bb] py-5 px-2 rounded-lg w-95">
              <MdDelete className="absolute w-5 h-5 ml-75" />
              <FaRegEdit className="absolute w-5 h-5 ml-70" />
              Run 10000km
            </div>
            <div className="bg-[#5F9598] py-5 px-2 rounded-lg w-95 ">
              Sleep 24 hours
            </div>
            <div className="bg-[#5f9598bb] py-5 px-2 rounded-lg w-95">
              Nonstop Playing
            </div>
            <div className="bg-[#5F9598] py-5 px-2 rounded-lg w-95 ">
              Swimming
            </div>
            <div className="bg-[#5f9598bb] py-5 px-2 rounded-lg w-95">Work</div>
            <div className="bg-[#5F9598] py-5 px-2 rounded-lg w-95 ">
              Cleaning
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
