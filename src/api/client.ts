import { findMockResponse } from "@/mocks/handlers";

// Mocks stay on until NEXT_PUBLIC_API_URL is set; then every request goes to the backend.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const isUsingMocks = !API_URL;

export async function fetchJson<T>(path: string): Promise<T> {
  if (isUsingMocks) return (await findMockResponse(path)) as T;

  const response = await fetch(`${API_URL}${path}`, { credentials: "include" });
  if (!response.ok) throw new Error(`GET ${path} failed: ${response.status}`);
  return response.json() as Promise<T>;
}
