import type { TaskStatus } from "@/types/models";

export const statusLabels: Record<TaskStatus, string> = {
  todo: "გასაკეთებელი",
  doing: "პროცესში",
  done: "შესრულებული",
};

const statusOrder: TaskStatus[] = ["todo", "doing", "done"];

// Clicking the status circle moves todo → doing → done → todo.
export function findNextStatus(status: TaskStatus): TaskStatus {
  return statusOrder[(statusOrder.indexOf(status) + 1) % statusOrder.length];
}

export type TaskFilter = "all" | TaskStatus;

export const filterLabels: Record<TaskFilter, string> = { all: "ყველა", ...statusLabels };
