export type TodoType = {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
};

export type TodoStoreType = {
  todos: TodoType[];
  page: number;
  limit: number;
  hasMore: boolean;
  total: number;
  searchTerm: string;

  getLoading: boolean;
  initialLoading: boolean;
  loadMoreLoading: boolean;
  error: string | null;
  actionLoading: boolean;

  getTodos: (searchTerm?: string) => Promise<void>;
  loadMoreTodos: (searchTerm?: string) => Promise<boolean>;
  resetPagination: () => void;

  addTodo: (title: string, description?: string) => Promise<boolean>;
  updateTodo: (
    id: string,
    data: { title?: string; description?: string },
  ) => Promise<boolean>;
  markTodoDone: (id: string, done: boolean) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
};
