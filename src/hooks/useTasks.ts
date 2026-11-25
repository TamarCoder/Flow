import useSWR from "swr";
import { fetchJson, patchJson, postJson } from "@/api/client";
import type { Task } from "@/types/models";

type TaskChanges = Partial<Pick<Task, "title" | "description" | "status">>;

export function useTasks(projectId: string) {
  const key = `/projects/${projectId}/tasks`;
  const swr = useSWR<Task[]>(key, fetchJson);
  const tasks = swr.data ?? [];

  const createTask = (title: string) =>
    swr.mutate(async (current = []) => [await postJson<Task>(key, { title }), ...current], { revalidate: false });

  // The list changes at once; if the request fails SWR puts the old list back.
  const updateTask = (taskId: string, changes: TaskChanges) =>
    swr.mutate(
      async (current = []) => {
        const saved = await patchJson<Task>(`/tasks/${taskId}`, changes);
        return current.map((task) => (task.id === taskId ? saved : task));
      },
      {
        optimisticData: (current = []) => current.map((task) => (task.id === taskId ? { ...task, ...changes } : task)),
        rollbackOnError: true,
        revalidate: false,
      },
    );

  return { tasks, isLoading: swr.isLoading, error: swr.error, createTask, updateTask };
}
