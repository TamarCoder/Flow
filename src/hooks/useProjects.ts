import useSWR from "swr";
import { fetchJson } from "@/api/client";
import type { ProjectSummary } from "@/types/models";

export function useProjects() {
  return useSWR<ProjectSummary[]>("/projects", fetchJson);
}
