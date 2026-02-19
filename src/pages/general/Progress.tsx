import AppLogo from "@/assets/app-logo.png";
import DeleteModal from "@/components/Delete";
import Update from "@/components/Update";
import { useAccountStore } from "@/stores/account/account.store";
import { useTodoStore } from "@/stores/todo/todo.store";
import type { TodoType } from "@/types/todo/todo.type";
import { useEffect, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiProgress6Line } from "react-icons/ri";
import { SiVirustotal } from "react-icons/si";
import { useNavigate } from "react-router-dom";

interface TodoType {
  _id: string;
  title: string;
  status: "In Progress" | "Completed";
}

function Progress() {
  const navigate = useNavigate();

  const { todos, getTodos, deleteTodo } = useTodoStore();
  const { account, loading, getAccount } = useAccountStore();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | undefined>(
    undefined,
  );

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    if (!account) getAccount();
  }, [account, getAccount]);

  const totalCount = useMemo(() => todos?.length || 0, [todos]);

  const progressCount = useMemo(
    () => (todos || []).filter((t) => t.title === "In Progress").length,
    [todos],
  );

  const completedCount = useMemo(
    () => (todos || []).filter((t) => t.title === "Completed").length,
    [todos],
  );

  const inProgressTodos = useMemo(
    () => (todos || []).filter((t) => t.title === "In Progress"),
    [todos],
  );

  const handleDeleteClick = (id: string) => {
    setTodoToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleEditClick = (todo: TodoType) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <div className="w-screen min-h-screen bg-[#F5F5F5] p-4 flex flex-col items-center">
      <div className="bg-[#5F9598] w-full max-w-4xl h-20 rounded-xl relative flex items-center px-4 shadow-md">
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
          <img src={AppLogo} alt="Logo" className="w-10 h-10 object-contain" />
        </div>
        <h1 className="flex-1 text-center font-bold italic text-white uppercase">
          {loading ? "LOADING..." : `HELLO ${account?.name || "GUEST"}`}
        </h1>
        <div className="w-14" />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-10 max-w-4xl">
        <div
          onClick={() => navigate("/dashboard")}
          className="bg-white text-[#00449D] p-4 border-2 border-[#00449D] rounded-xl relative cursor-pointer"
        >
          <SiVirustotal className="absolute right-2 top-2 w-10 h-10" />
          <h1 className="font-bold italic text-2xl">{totalCount}</h1>
          <p className="font-bold italic">Total Task</p>
        </div>

        <div
          onClick={() => navigate("/progress")}
          className="bg-white text-[#841427] p-4 border-2 border-[#841427] rounded-xl relative cursor-pointer shadow-inner scale-[0.98]"
        >
          <RiProgress6Line className="absolute right-2 top-2 w-10 h-10" />
          <h1 className="font-bold italic text-2xl">{progressCount}</h1>
          <p className="font-bold italic">In Progress</p>
        </div>

        <div
          onClick={() => navigate("/completed")}
          className="col-span-2 bg-white border-2 border-[#12A122] text-[#12A122] p-4 rounded-xl relative cursor-pointer"
        >
          <IoMdCheckmarkCircleOutline className="absolute right-4 top-2 w-12 h-12" />
          <h1 className="font-bold italic text-2xl">{completedCount}</h1>
          <p className="font-bold italic">Completed</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 w-full max-w-4xl mb-10">
        {inProgressTodos.length > 0 ? (
          inProgressTodos.map((item, index) => (
            <div
              key={item._id}
              className={`py-5 px-4 rounded-xl italic font-semibold flex justify-between items-center text-white shadow-sm
                ${index % 2 === 0 ? "bg-[#5f9598e1]" : "bg-[#2b787c]"}`}
            >
              <span>{item.title}</span>

              <div className="flex gap-4 items-center">
                <FaRegEdit
                  size={20}
                  onClick={() => handleEditClick(item)}
                  className="cursor-pointer hover:text-blue-200 transition-colors"
                />
                <MdDelete
                  size={22}
                  onClick={() => handleDeleteClick(item._id)}
                  className="cursor-pointer hover:text-red-300 transition-colors"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic mt-10">
            No progress tasks yet.
          </p>
        )}
      </div>

      <Update
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        TodoUpdateModal={selectedTodo}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          if (todoToDelete) deleteTodo(todoToDelete);
          setIsDeleteOpen(false);
        }}
        itemName="todo"
      />
    </div>
  );
}

export default Progress;
