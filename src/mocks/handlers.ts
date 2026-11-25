import type { LoginValues, RegisterValues } from "@/lib/auth";
import type { ProjectValues } from "@/lib/project";
import type { ProjectSummary, Task } from "@/types/models";
import { getDatabase, saveDatabase } from "./db";

const db = getDatabase;

type Route = [method: string, pattern: RegExp, answer: (params: string[], body: unknown) => unknown];

// Answers the same paths the backend will serve, so hooks do not know which one they talk to.
const routes: Route[] = [
  ["GET", /^\/me$/, () => db().user],
  ["PATCH", /^\/me$/, (_, body) => Object.assign(db().user, body)],
  // The mock accepts any current password.
  ["POST", /^\/me\/password$/, () => ({})],
  ["POST", /^\/auth\/logout$/, () => ({})],
  ["GET", /^\/projects$/, (): ProjectSummary[] =>
    db().projects.map((project) => {
      const tasks = db().tasks.filter((task) => task.projectId === project.id);
      return { ...project, taskCount: tasks.length, doneCount: tasks.filter((task) => task.status === "done").length };
    })],
  ["POST", /^\/projects$/, (_, body) => {
    const project = { ...(body as ProjectValues), id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    db().projects.push(project);
    return project;
  }],
  ["GET", /^\/projects\/([^/]+)$/, ([id]) => findOrFail(db().projects.find((project) => project.id === id))],
  ["GET", /^\/projects\/([^/]+)\/tasks$/, ([id]) => db().tasks.filter((task) => task.projectId === id)],
  ["POST", /^\/projects\/([^/]+)\/tasks$/, ([id], body) => {
    const task: Task = { id: crypto.randomUUID(), projectId: id, title: (body as { title: string }).title, description: "", status: "todo", createdAt: new Date().toISOString() };
    db().tasks.unshift(task);
    return task;
  }],
  ["GET", /^\/tasks\/([^/]+)$/, ([id]) => findOrFail(db().tasks.find((task) => task.id === id))],
  ["PATCH", /^\/tasks\/([^/]+)$/, ([id], body) => Object.assign(findOrFail(db().tasks.find((task) => task.id === id)), body)],
  ["DELETE", /^\/tasks\/([^/]+)$/, ([id]) => {
    // findIndex gives -1 for an unknown id, and splice(-1) would remove the last task.
    const index = db().tasks.findIndex((task) => task.id === id);
    if (index >= 0) db().tasks.splice(index, 1);
    return {};
  }],
  // Any email and password log in as the mock user.
  ["POST", /^\/auth\/login$/, (_, body) => ({ ...db().user, email: (body as LoginValues).email })],
  ["POST", /^\/auth\/register$/, (_, body) => {
    const { name, email } = body as RegisterValues;
    return { ...db().user, name, email, avatarUrl: undefined };
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
    if (!match) continue;
    const result = structuredClone(answer(match.slice(1), body));
    if (method !== "GET") saveDatabase();
    return result;
  }
  throw new Error(`No mock for ${method} ${path}`);
}
