import useSWR from "swr";
import { fetchJson } from "@/api/client";
import type { Project } from "@/types/models";

export function useProject(projectId: string) {
  return useSWR<Project>(`/projects/${projectId}`, fetchJson);
}
