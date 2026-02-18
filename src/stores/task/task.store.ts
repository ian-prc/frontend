// Libraries
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Api's
import {
  createTaskApi,
  deleteTaskApi,
  getTaskApi,
  markTaskDoneApi,
  updateTaskApi,
} from "@/api/task/task.api";
// Types
import type { TaskStoreType, TaskType } from "@/types/task/task.type";
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

export const useTaskStore = create(
  persist<TaskStoreType>(
    (set, get) => ({
      task: [],
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

      getTask: async (searchTerm = "") => {
        const { limit } = get();

        set({
          initialLoading: true,
          loadMoreLoading: false,
          error: null,
          searchTerm,
          page: 0,
          hasMore: true,
          total: 0,
          task: [],
        });

        try {
          const response = await getTaskApi(0, limit, searchTerm);

          set({
            task: response.task || [],
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

          const response = await getTaskApi(
            state.page,
            state.limit,
            currentSearch,
          );
          set((prevState) => ({
            task: [...prevState.task, ...(response.todos || [])],
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
          task: [],
          page: 0,
          hasMore: true,
          total: 0,
          error: null,
          searchTerm: "",
        });
      },

      createTask: async (task, description?) => {
        set({ actionLoading: true, error: null });
        try {
          const response = await createTaskApi(task, description);
          const newTodo = response.newTodo;
          set((prevState) => ({
            task: [newTodo, ...prevState.task],
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
      updateTask: async (id, data) => {
        set({ actionLoading: true, error: null });

        try {
          const response = await updateTaskApi(id, data);
          const updated = (response.updatedTodo ?? response.todo) as
            | TaskType
            | undefined;

          if (updated) {
            set((prev) => ({
              task: prev.task.map((t) => (t._id === id ? updated : t)),
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
      markTaskDone: async (id, done) => {
        // Enqueue the mark-done operation so requests are processed one at a time
        return new Promise<boolean>((resolve) => {
          markDoneQueue.push(async () => {
            const state = get();

            const idx = state.task.findIndex((t) => t._id === id);
            if (idx === -1) {
              resolve(false);
              return;
            }

            const prevDone = state.task[idx].done;
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
              const i = prev.task.findIndex((t) => t._id === id);
              if (i === -1) return prev;
              const current = prev.task[i];
              if (current.done === done) return prev;
              const next = prev.task.slice();
              next[i] = { ...current, done };
              return { task: next } as Partial<TaskStoreType> as TaskStoreType;
            });

            set({ actionLoading: true, error: null });

            try {
              const response = await markTaskDoneApi(id, done);
              const updated = (response.updatedTask ?? response.task) as
                | TaskType
                | undefined;

              if (updated) {
                set((prev) => {
                  const i = prev.task.findIndex((t) => t._id === id);
                  if (i === -1) return prev;
                  const curr = prev.task[i];
                  // Only replace if there's an actual difference
                  if (
                    curr._id === updated._id &&
                    curr.task === updated.task &&
                    curr.description === updated.description &&
                    curr.done === updated.done
                  ) {
                    return prev;
                  }
                  const next = prev.task.slice();
                  next[i] = updated;
                  return {
                    task: next,
                  } as Partial<TaskStoreType> as TaskStoreType;
                });
              }

              resolve(true);
            } catch (error) {
              showError(error);
              set({ error: "Failed to update todo status" });

              // Revert optimistic update on failure
              set((prev) => {
                const i = prev.task.findIndex((t) => t._id === id);
                if (i === -1) return prev;
                const curr = prev.task[i];
                if (curr.done === prevDone) return prev;
                const next = prev.task.slice();
                next[i] = { ...curr, done: prevDone };
                return {
                  todos: next,
                } as Partial<TaskStoreType> as TaskStoreType;
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
      deleteTask: async (id) => {
        set({ actionLoading: true, error: null });

        try {
          const response = await deleteTaskApi(id);
          toast.success(response.message || "Task deleted");
          set((prev) => {
            const nextTask = prev.task.filter((t) => t._id !== id);
            return {
              task: nextTask,
              total: Math.max(0, prev.total - 1),
            };
          });

          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to delete task" });
          return false;
        } finally {
          set({ actionLoading: false });
        }
      },
    }),
    {
      name: "task-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
