import AppLogo from "@/assets/app-logo.png";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiProgress6Line } from "react-icons/ri";
import { SiVirustotal } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function Completed() {
  const navigate = useNavigate();

  const tasks = [
    "Run 10000km",
    "Sleep 24 hours",
    "Nonstop Playing",
    "Swimming",
  ];

  return (
    <div className="w-screen min-h-screen bg-[#F5F5F5] p-4 flex flex-col items-center">
      <div className="bg-[#5F9598] w-full max-w-4xl h-20 rounded-xl relative flex items-center px-4 shadow-md">
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
          <img
            src={AppLogo}
            alt="App Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        <h1 className="flex-1 text-center text-black font-bold italic tracking-wider">
          YOUR PROGRESS
        </h1>
        <div className="w-14" />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full  mt-10">
        <div
          onClick={() => navigate("/dashboard")}
          className="bg-white text-[#00449D] p-4 border-2 border-[#00449D] rounded-xl relative overflow-hidden cursor-pointer hover:bg-blue-50 transition-colors"
        >
          <SiVirustotal className="absolute right-2 top-2 w-10 h-10" />
          <h1 className="font-bold italic text-2xl">5</h1>
          <p className="font-bold italic">Total</p>
        </div>

        <div
          onClick={() => navigate("/progress")}
          className="bg-white text-[#841427] p-4 border-2 border-[#841427] rounded-xl relative overflow-hidden cursor-pointer hover:bg-red-50 transition-colors"
        >
          <RiProgress6Line className="absolute right-2 top-2 w-10 h-10" />
          <h1 className="font-bold italic text-2xl">3</h1>
          <p className="font-bold italic">In Progress</p>
        </div>

        <div
          onClick={() => navigate("/completed")}
          className="col-span-2 bg-white border-2 border-[#12A122] text-[#12A122] p-4 rounded-xl relative overflow-hidden cursor-pointer hover:bg-green-50 transition-colors"
        >
          <IoMdCheckmarkCircleOutline className="absolute right-4 top-2  w-12 h-12" />
          <h1 className="font-bold italic text-2xl">2</h1>
          <p className="font-bold italic">Completed</p>
        </div>
      </div>

      <div className="mt-10 w-full ">
        <h2 className="text-[#5F9598] font-bold italic text-lg border-b-2 border-[#5F9598] pb-1">
          Completed Task
        </h2>
      </div>

      <div className="mt-5 flex flex-col gap-3 w-full  mb-10">
        <div className="mt-8 flex flex-col gap-3 w-full  mb-10">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`relative py-5 px-4 rounded-xl italic font-semibold flex justify-between items-center group transition-all
                    ${index % 2 === 0 ? "bg-[#5f9598bb] text-white" : "bg-[#5F9598] text-white shadow-sm"}`}
            >
              <span>{task}</span>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaRegEdit
                  className="cursor-pointer hover:text-gray-200"
                  title="Edit"
                />
                <MdDelete
                  className="cursor-pointer hover:text-red-300"
                  title="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Completed;
