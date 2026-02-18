import React from "react";
import { IoMdClose } from "react-icons/io";

interface TermsProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="relative bg-[#1D546D] w-full max-w-2xl h-190 rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <IoMdClose size={28} />
        </button>

        {/* Content Area */}
        <div className=" p-8 pb-8 flex flex-col h-full">
          <h2 className="text-white text-2xl font-bold text-center mb-6">
            Terms & Conditions
          </h2>

          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar bg-white/5 rounded-2xl p-6 text-gray-100 text-sm leading-relaxed border border-white/10">
            <h3 className="font-bold text-[#5F9598] mb-2">1. Acceptance of Terms</h3>
            <p className="mb-4">
              By using this application, you agree to comply with these Terms and Conditions.er.
The application must only be used for lawful and appropriate purposes
</p>
            <h3 className="font-bold text-[#5F9598] mb-2">2. User Privacy</h3>
            <p className="mb-4">
             Users are responsible for keeping their account credentials secure and confidential.
</p>
            <h3 className="font-bold text-[#5F9598] mb-2">3. User Conduct</h3>
            <p className="mb-4">
             Any activity performed using a user’s account is the responsibility of the account owner.s
            </p>

            <h3 className="font-bold text-[#5F9598] mb-2">4. Termination</h3>
            <p className="mb-4">
The application must only be used for lawful and appropriate purposes

            </p>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="bg-[#5F9598] hover:bg-[#4d7a7c] text-white font-bold py-3 px-12 rounded-full shadow-lg transition-transform active:scale-95"
            >
             OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;