// Libraries
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Api's
import {
  addTodoApi,
  deleteTodoApi,
  getTodosApi,
  markTodoDoneApi,
  updateTodoApi,
} from "@/api/todo/todo.api";
// Types
import type { TodoStoreType, TodoType } from "@/types/todo/todo.type";
// Utils
import { showError } from "@/utils/error/error.utils";
import toast from "react-hot-toast";

const markDoneQueue: Array<() => Promise<void>> = [];
let markDoneProcessing = false;
const markDonePending = new Set<string>();

async function processMarkDoneQueue() {
  if (markDoneProcessing) return;
  markDoneProcessing = true;
  while (markDoneQueue.length) {
    const job = markDoneQueue.shift();
    if (!job) continue;
    try {
      await job();
    } catch (err) {
      // keep processing remaining jobs even if one fails
      console.error("Error processing markTodoDone job:", err);
    }
  }
  markDoneProcessing = false;
}

export const useTodoStore = create(
  persist<TodoStoreType>(
    (set, get) => ({
      todos: [],
      page: 0,
      limit: 15,
      hasMore: true,
      total: 0,
      searchTerm: "",

      getLoading: false,
      initialLoading: false,
      loadMoreLoading: false,
      error: null,
      actionLoading: false,

      getTodos: async (searchTerm = "") => {
        const { limit } = get();

        set({
          initialLoading: true,
          loadMoreLoading: false,
          error: null,
          searchTerm,
          page: 0,
          hasMore: true,
          total: 0,
          todos: [],
        });

        try {
          const response = await getTodosApi(0, limit, searchTerm);

          set({
            todos: response.todos || [],
            total: response.total || 0,
            hasMore: response.hasMore || false,
            page: 1,
            searchTerm,
          });
        } catch (error) {
          showError(error);
          set({ error: "Failed to load todos" });
        } finally {
          set({ initialLoading: false });
        }
      },
      loadMoreTodos: async (searchTerm = "") => {
        const state = get();
        if (!state.hasMore || state.loadMoreLoading) return false;

        set({ loadMoreLoading: true, error: null });
        try {
          const currentSearch = searchTerm || state.searchTerm;

          const response = await getTodosApi(
            state.page,
            state.limit,
            currentSearch,
          );
          set((prevState) => ({
            todos: [...prevState.todos, ...(response.todos || [])],
            total: response.total || prevState.total,
            hasMore: response.hasMore || false,
            page: prevState.page + 1,
            searchTerm: currentSearch,
          }));
          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to load more todos" });
          return false;
        } finally {
          set({ loadMoreLoading: false });
        }
      },
      resetPagination: () => {
        set({
          todos: [],
          page: 0,
          hasMore: true,
          total: 0,
          error: null,
          searchTerm: "",
        });
      },

      addTodo: async (title, description?) => {
        set({ actionLoading: true, error: null });
        try {
          const response = await addTodoApi(title, description);
          const newTodo = response.newTodo;
          set((prevState) => ({
            todos: [newTodo, ...prevState.todos],
            total: prevState.total + 1,
          }));
          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to add todo" });
          return false;
        } finally {
          set({ actionLoading: false });
        }
      },
      updateTodo: async (id, data) => {
        set({ actionLoading: true, error: null });

        try {
          const response = await updateTodoApi(id, data);
          const updated = (response.updatedTodo ?? response.todo) as
            | TodoType
            | undefined;

          if (updated) {
            set((prev) => ({
              todos: prev.todos.map((t) => (t._id === id ? updated : t)),
            }));
          }

          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to update todo" });
          return false;
        } finally {
          set({ actionLoading: false });
        }
      },
      markTodoDone: async (id, done) => {
        // Enqueue the mark-done operation so requests are processed one at a time
        return new Promise<boolean>((resolve) => {
          markDoneQueue.push(async () => {
            const state = get();

            const idx = state.todos.findIndex((t) => t._id === id);
            if (idx === -1) {
              resolve(false);
              return;
            }

            const prevDone = state.todos[idx].done;
            if (prevDone === done) {
              // No-op if status already matches
              resolve(true);
              return;
            }

            if (markDonePending.has(id)) {
              // Another job for this id is already pending
              resolve(false);
              return;
            }

            markDonePending.add(id);

            // Optimistic update: only update if value actually changes to avoid extra renders
            set((prev) => {
              const i = prev.todos.findIndex((t) => t._id === id);
              if (i === -1) return prev;
              const current = prev.todos[i];
              if (current.done === done) return prev;
              const next = prev.todos.slice();
              next[i] = { ...current, done };
              return { todos: next } as Partial<TodoStoreType> as TodoStoreType;
            });

            set({ actionLoading: true, error: null });

            try {
              const response = await markTodoDoneApi(id, done);
              const updated = (response.updatedTodo ?? response.todo) as
                | TodoType
                | undefined;

              if (updated) {
                set((prev) => {
                  const i = prev.todos.findIndex((t) => t._id === id);
                  if (i === -1) return prev;
                  const curr = prev.todos[i];
                  // Only replace if there's an actual difference
                  if (
                    curr._id === updated._id &&
                    curr.title === updated.title &&
                    curr.description === updated.description &&
                    curr.done === updated.done
                  ) {
                    return prev;
                  }
                  const next = prev.todos.slice();
                  next[i] = updated;
                  return {
                    todos: next,
                  } as Partial<TodoStoreType> as TodoStoreType;
                });
              }

              resolve(true);
            } catch (error) {
              showError(error);
              set({ error: "Failed to update todo status" });

              // Revert optimistic update on failure
              set((prev) => {
                const i = prev.todos.findIndex((t) => t._id === id);
                if (i === -1) return prev;
                const curr = prev.todos[i];
                if (curr.done === prevDone) return prev;
                const next = prev.todos.slice();
                next[i] = { ...curr, done: prevDone };
                return {
                  todos: next,
                } as Partial<TodoStoreType> as TodoStoreType;
              });

              resolve(false);
            } finally {
              markDonePending.delete(id);
              set({ actionLoading: false });
            }
          });

          void processMarkDoneQueue();
        });
      },
      deleteTodo: async (id) => {
        set({ actionLoading: true, error: null });

        try {
          const response = await deleteTodoApi(id);
          toast.success(response.message || "Todo deleted");
          set((prev) => {
            const nextTodos = prev.todos.filter((t) => t._id !== id);
            return {
              todos: nextTodos,
              total: Math.max(0, prev.total - 1),
            };
          });

          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to delete todo" });
          return false;
        } finally {
          set({ actionLoading: false });
        }
      },
    }),
    {
      name: "todos-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
