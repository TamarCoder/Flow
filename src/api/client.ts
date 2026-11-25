import { findMockResponse } from "@/mocks/handlers";

// Mocks stay on until NEXT_PUBLIC_API_URL is set; then every request goes to the backend.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const isUsingMocks = !API_URL;

type Method = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
  if (isUsingMocks) return (await findMockResponse(method, path, body)) as T;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`${method} ${path} failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export const fetchJson = <T>(path: string) => request<T>("GET", path);

export const postJson = <T>(path: string, body: unknown) => request<T>("POST", path, body);

export const patchJson = <T>(path: string, body: unknown) => request<T>("PATCH", path, body);
