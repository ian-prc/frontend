import React, { useState } from "react";

// 1. Define the shape of your task data
interface Task {
  id?: string | number;
  name: string;
  status: "To Do" | "In Progress" | "Review" | "Completed";
}

// 2. Define the Props interface
interface TaskUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskInitialData?: Task; // This clears the "any" error
}

const TaskUpdateModal: React.FC<TaskUpdateModalProps> = ({
  isOpen,
  onClose,
  taskInitialData,
}) => {
  // 3. Provide fallback values to avoid undefined errors
  const [taskName, setTaskName] = useState<string>(taskInitialData?.name || "");
  const [status, setStatus] = useState<Task["status"]>(
    taskInitialData?.status || "To Do",
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="w-100 max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <header className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Update Task</h3>
        </header>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 focus:border-indigo-500 outline-none"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("Updated:", { taskName, status });
                onClose();
              }}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskUpdateModal;
