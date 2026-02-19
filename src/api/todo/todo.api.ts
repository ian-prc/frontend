import axiosInstance from "@/axios/axios-instances";

export const getTodosApi = async (
  page: number = 0,
  limit: number = 15,
  search: string = "",
) => {
  const response = await axiosInstance.get("/todo/all", {
    params: { page, limit, search: search.trim() },
  });
  return response.data;
};

export const addTodoApi = async (title: string, description?: string) => {
  const response = await axiosInstance.post("/todo/add", {
    title,
    description,
  });
  return response.data;
};

export const updateTodoApi = async (
  id: string,
  data: { title?: string; description?: string },
) => {
  const response = await axiosInstance.put(`/todo/update/${id}`, data);
  return response.data;
};

export const markTodoDoneApi = async (id: string, done: boolean) => {
  const response = await axiosInstance.patch(`/todo/done/${id}`, { done });
  return response.data;
};

export const deleteTodoApi = async (id: string) => {
  const response = await axiosInstance.delete(`/todo/delete/${id}`);
  return response.data;
};
