import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { postJson } from "@/api/client";
import type { LoginValues, RegisterValues } from "@/lib/auth";
import type { User } from "@/types/models";

// On success the returned user is written into the "/me" cache, so the header updates at once.
function useAuthRequest<Values>(path: string) {
  const { mutate } = useSWRConfig();
  return useSWRMutation(path, async (url: string, { arg }: { arg: Values }) => {
    const user = await postJson<User>(url, arg);
    await mutate("/me", user, { revalidate: false });
    return user;
  });
}

export const useLogin = () => useAuthRequest<LoginValues>("/auth/login");

export const useRegister = () => useAuthRequest<RegisterValues>("/auth/register");
