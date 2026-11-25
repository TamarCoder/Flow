import type { ProjectSummary } from "@/types/models";
import { mockProjects } from "./projects";
import { mockTasks } from "./tasks";
import { mockUser } from "./user";

// Answers the same paths the backend will serve, so hooks do not know which one they talk to.
const routes: Record<string, () => unknown> = {
  "/me": () => mockUser,
  "/projects": (): ProjectSummary[] =>
    mockProjects.map((project) => {
      const tasks = mockTasks.filter((task) => task.projectId === project.id);
      return { ...project, taskCount: tasks.length, doneCount: tasks.filter((task) => task.status === "done").length };
    }),
};

export async function findMockResponse(path: string): Promise<unknown> {
  // Short delay so loading states are visible while working on mocks.
  await new Promise((resolve) => setTimeout(resolve, 300));
  const route = routes[path];
  if (!route) throw new Error(`No mock for ${path}`);
  return structuredClone(route());
}
