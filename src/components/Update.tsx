import { useTodoStore } from "@/stores/todo/todo.store";
import type { TodoType } from "@/types/todo/todo.type";
import React, { useEffect, useState } from "react";

interface TodoUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  TodoUpdateModal?: TodoType;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Update: React.FC<TodoUpdateModalProps> = ({
  isOpen,
  onClose,
  TodoUpdateModal,
}) => {
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const [todoName, setTodoName] = useState("");
  const [status, setStatus] = useState<"In Progress" | "Completed">(
    "In Progress",
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (TodoUpdateModal) {
      setTodoName(TodoUpdateModal.title);
      setStatus(TodoUpdateModal.done ? "Completed" : "In Progress");
    }
  }, [TodoUpdateModal]);

  if (!isOpen || !TodoUpdateModal) return null;

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateTodo(TodoUpdateModal._id!, {
        title: todoName,
        description: status,
      });

      const doneBoolean = status === "Completed";

      if (TodoUpdateModal.done !== doneBoolean) {
        await useTodoStore
          .getState()
          .markTodoDone(TodoUpdateModal._id!, doneBoolean);
      }
      await sleep(800);

      onClose();
    } finally {
      setLoading(false);
    }
  };

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
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Status
            </label>
            <select
              value={status}
              disabled={loading}
              onChange={(e) =>
                setStatus(e.target.value as "In Progress" | "Completed")
              }
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
              disabled={loading}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="rounded-lg bg-[#00449D] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-950 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
