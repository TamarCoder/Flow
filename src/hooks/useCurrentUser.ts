import useSWR from "swr";
import { fetchJson } from "@/api/client";
import type { User } from "@/types/models";

export function useCurrentUser() {
  return useSWR<User>("/me", fetchJson);
}
