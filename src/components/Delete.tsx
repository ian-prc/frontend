import React from "react";
import { TiDeleteOutline } from "react-icons/ti";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full mb-4">
            <TiDeleteOutline className="h-15 w-15 text-red-900" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">Delete Task?</h3>
          <p className="mt-2 text-sm text-slate-500">
            Are you sure you want to delete{" "}
            <span className="font-bold text-slate-700 italic">
              "{itemName || "this task"}"
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto rounded-lg bg-red-900 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 hover:bg-red-700 active:scale-95 transition-all"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
