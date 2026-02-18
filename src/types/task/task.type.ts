export type TaskType = {
  _id: string;
  task: string;
  description?: string;
  done: boolean;
};

export type TaskStoreType = {
  task: TaskType[];
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

  getTask: (searchTerm?: string) => Promise<void>;
  loadMoreTodos: (searchTerm?: string) => Promise<boolean>;
  resetPagination: () => void;

  createTask: (task: string, description?: string) => Promise<boolean>;
  updateTask: (
    id: string,
    data: { task?: string; description?: string },
  ) => Promise<boolean>;
  markTaskDone: (id: string, done: boolean) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
};
