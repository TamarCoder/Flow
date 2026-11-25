"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChangeNameDialog from "@/components/ChangeNameDialog/ChangeNameDialog";
import ChangePasswordDialog from "@/components/ChangePasswordDialog/ChangePasswordDialog";
import ProfileSettings from "@/components/ProfileSettings/ProfileSettings";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useProfile } from "@/hooks/useProfile";
import { isAuthEnabled } from "@/lib/features";
import styles from "./ProfileView.module.scss";

type OpenDialog = "name" | "password" | null;

export default function ProfileView() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const { logout } = useProfile();
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null);

  const onLogout = async () => {
    await logout().catch(() => {});
    router.push("/");
  };

  return (
    <main className={styles.page}>
      <Link href="/dashboard" className={styles.backLink}>← ტასქებზე დაბრუნება</Link>

      <header className={styles.user}>
        <span className={styles.avatar}>{user?.name.charAt(0)}</span>
        <div>
          <h3 className={styles.name}>{user?.name}</h3>
          <p className={styles.email}>{user?.email}</p>
        </div>
      </header>

      <ProfileSettings onChangeName={() => setOpenDialog("name")} onChangePassword={() => setOpenDialog("password")} />

      {isAuthEnabled && <button type="button" className={styles.logout} onClick={onLogout}>გასვლა</button>}

      <ChangeNameDialog isOpen={openDialog === "name"} currentName={user?.name ?? ""} onClose={() => setOpenDialog(null)} />
      <ChangePasswordDialog isOpen={openDialog === "password"} onClose={() => setOpenDialog(null)} />
    </main>
  );
}
