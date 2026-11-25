import type { LoginValues, RegisterValues } from "@/lib/auth";
import type { ProjectValues } from "@/lib/project";
import type { ProjectSummary } from "@/types/models";
import { mockProjects } from "./projects";
import { mockTasks } from "./tasks";
import { mockUser } from "./user";

// Answers the same paths the backend will serve, so hooks do not know which one they talk to.
const routes: Record<string, (body: unknown) => unknown> = {
  "GET /me": () => mockUser,
  "GET /projects": (): ProjectSummary[] =>
    mockProjects.map((project) => {
      const tasks = mockTasks.filter((task) => task.projectId === project.id);
      return { ...project, taskCount: tasks.length, doneCount: tasks.filter((task) => task.status === "done").length };
    }),
  "POST /projects": (body) => {
    const project = { ...(body as ProjectValues), id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    mockProjects.push(project);
    return project;
  },
  // Any email and password log in as the mock user.
  "POST /auth/login": (body) => ({ ...mockUser, email: (body as LoginValues).email }),
  "POST /auth/register": (body) => {
    const { name, email } = body as RegisterValues;
    return { ...mockUser, name, email, avatarUrl: undefined };
  },
};

export async function findMockResponse(method: string, path: string, body?: unknown): Promise<unknown> {
  // Short delay so loading states are visible while working on mocks.
  await new Promise((resolve) => setTimeout(resolve, 300));
  const route = routes[`${method} ${path}`];
  if (!route) throw new Error(`No mock for ${method} ${path}`);
  return structuredClone(route(body));
}
