import { useSWRConfig } from "swr";
import { patchJson, postJson } from "@/api/client";
import type { NameValues, PasswordValues } from "@/lib/profile";
import type { User } from "@/types/models";

export function useProfile() {
  const { mutate } = useSWRConfig();

  // The saved user replaces "/me", so every header and card shows the new name.
  const updateName = async (values: NameValues) => {
    const user = await patchJson<User>("/me", values);
    await mutate("/me", user, { revalidate: false });
  };

  const changePassword = (values: PasswordValues) => postJson("/me/password", values);

  // Clears every cached response, so the next user does not see this user's data.
  const logout = async () => {
    await postJson("/auth/logout", {});
    await mutate(() => true, undefined, { revalidate: false });
  };

  return { updateName, changePassword, logout };
}
