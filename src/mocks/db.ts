import type { Project, Task, User } from "@/types/models";
import { mockProjects } from "./projects";
import { mockTasks } from "./tasks";
import { mockUser } from "./user";

// Without a backend the data lives in this browser, so it survives a refresh.
// The sample projects only fill it on the first visit. Delete with src/mocks/ when the backend is ready.
const STORAGE_KEY = "flow-data";

type Database = { user: User; projects: Project[]; tasks: Task[] };

function loadDatabase(): Database {
  const seed = { user: mockUser, projects: mockProjects, tasks: mockTasks };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Database) : structuredClone(seed);
  } catch {
    // Broken JSON or no storage (private mode): start from the samples.
    return structuredClone(seed);
  }
}

let database: Database | null = null;

export function getDatabase(): Database {
  database ??= loadDatabase();
  return database;
}

export function saveDatabase() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getDatabase()));
  } catch {
    // Storage full or blocked: changes still work until the page closes.
  }
}
