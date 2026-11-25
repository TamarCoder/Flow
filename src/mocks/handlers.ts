import type { LoginValues, RegisterValues } from "@/lib/auth";
import type { ProjectValues } from "@/lib/project";
import type { ProjectSummary, Task } from "@/types/models";
import { mockProjects } from "./projects";
import { mockTasks } from "./tasks";
import { mockUser } from "./user";

type Route = [method: string, pattern: RegExp, answer: (params: string[], body: unknown) => unknown];

// Answers the same paths the backend will serve, so hooks do not know which one they talk to.
const routes: Route[] = [
  ["GET", /^\/me$/, () => mockUser],
  ["GET", /^\/projects$/, (): ProjectSummary[] =>
    mockProjects.map((project) => {
      const tasks = mockTasks.filter((task) => task.projectId === project.id);
      return { ...project, taskCount: tasks.length, doneCount: tasks.filter((task) => task.status === "done").length };
    })],
  ["POST", /^\/projects$/, (_, body) => {
    const project = { ...(body as ProjectValues), id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    mockProjects.push(project);
    return project;
  }],
  ["GET", /^\/projects\/([^/]+)$/, ([id]) => findOrFail(mockProjects.find((project) => project.id === id))],
  ["GET", /^\/projects\/([^/]+)\/tasks$/, ([id]) => mockTasks.filter((task) => task.projectId === id)],
  ["POST", /^\/projects\/([^/]+)\/tasks$/, ([id], body) => {
    const task: Task = { id: crypto.randomUUID(), projectId: id, title: (body as { title: string }).title, description: "", status: "todo", createdAt: new Date().toISOString() };
    mockTasks.unshift(task);
    return task;
  }],
  ["PATCH", /^\/tasks\/([^/]+)$/, ([id], body) => Object.assign(findOrFail(mockTasks.find((task) => task.id === id)), body)],
  ["DELETE", /^\/tasks\/([^/]+)$/, ([id]) => {
    mockTasks.splice(mockTasks.findIndex((task) => task.id === id), 1);
    return {};
  }],
  // Any email and password log in as the mock user.
  ["POST", /^\/auth\/login$/, (_, body) => ({ ...mockUser, email: (body as LoginValues).email })],
  ["POST", /^\/auth\/register$/, (_, body) => {
    const { name, email } = body as RegisterValues;
    return { ...mockUser, name, email, avatarUrl: undefined };
  }],
];

function findOrFail<T>(item: T | undefined): T {
  if (!item) throw new Error("404 Not found");
  return item;
}

export async function findMockResponse(method: string, path: string, body?: unknown): Promise<unknown> {
  // Short delay so loading states are visible while working on mocks.
  await new Promise((resolve) => setTimeout(resolve, 300));
  for (const [routeMethod, pattern, answer] of routes) {
    const match = method === routeMethod && path.match(pattern);
    if (match) return structuredClone(answer(match.slice(1), body));
  }
  throw new Error(`No mock for ${method} ${path}`);
}
