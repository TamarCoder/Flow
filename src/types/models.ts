// Shapes shared by the mock data and the future backend API.

export type TaskStatus = "todo" | "doing" | "done";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

// What GET /projects returns: the counts let cards show progress without loading every task.
export type ProjectSummary = Project & {
  taskCount: number;
  doneCount: number;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
};
