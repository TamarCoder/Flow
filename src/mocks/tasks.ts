import type { Task } from "@/types/models";

export const mockTasks: Task[] = [
  { id: "t1", projectId: "p1", title: "კვირის გეგმის შედგენა", description: "", status: "done", createdAt: "2026-11-20T09:00:00.000Z" },
  { id: "t2", projectId: "p1", title: "პრეზენტაციის მომზადება", description: "", status: "doing", createdAt: "2026-11-21T09:00:00.000Z" },
  { id: "t3", projectId: "p1", title: "გუნდთან შეხვედრა", description: "", status: "todo", createdAt: "2026-11-22T09:00:00.000Z" },
  { id: "t4", projectId: "p2", title: "ექიმთან ჩაწერა", description: "", status: "todo", createdAt: "2026-11-20T10:00:00.000Z" },
  { id: "t5", projectId: "p2", title: "გადასახადების გადახდა", description: "", status: "todo", createdAt: "2026-11-21T10:00:00.000Z" },
  { id: "t6", projectId: "p3", title: "წიგნის 2 თავის წაკითხვა", description: "", status: "todo", createdAt: "2026-11-20T11:00:00.000Z" },
  { id: "t7", projectId: "p3", title: "კურსის მესამე ლექცია", description: "", status: "todo", createdAt: "2026-11-21T11:00:00.000Z" },
];
