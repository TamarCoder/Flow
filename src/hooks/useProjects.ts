import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { fetchJson, postJson } from "@/api/client";
import type { ProjectValues } from "@/lib/project";
import type { Project, ProjectSummary } from "@/types/models";

export function useProjects() {
  return useSWR<ProjectSummary[]>("/projects", fetchJson);
}

// After creating, the list is fetched again so the new card shows on the dashboard.
export function useCreateProject() {
  const { mutate } = useSWRConfig();
  return useSWRMutation("/projects", async (url: string, { arg }: { arg: ProjectValues }) => {
    const project = await postJson<Project>(url, arg);
    await mutate("/projects");
    return project;
  });
}
