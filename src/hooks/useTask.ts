import useSWR from "swr";
import { deleteJson, fetchJson, patchJson } from "@/api/client";
import type { TaskChanges } from "@/hooks/useTasks";
import type { Task } from "@/types/models";

// One task for its own page. The project list refetches when the user goes back to it.
export function useTask(taskId: string) {
  const key = `/tasks/${taskId}`;
  const swr = useSWR<Task>(key, fetchJson);

  // The page changes at once; if the request fails SWR puts the old task back.
  const updateTask = (changes: TaskChanges) =>
    swr.mutate(() => patchJson<Task>(key, changes), {
      optimisticData: (current) => ({ ...(current as Task), ...changes }),
      rollbackOnError: true,
      revalidate: false,
    });

  const deleteTask = () => deleteJson(key);

  return { task: swr.data, error: swr.error, updateTask, deleteTask };
}
