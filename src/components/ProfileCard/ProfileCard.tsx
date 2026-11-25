"use client";

import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import styles from "./ProfileCard.module.scss";

export default function ProfileCard() {
  const { data: user } = useCurrentUser();

  return (
    <Link href="/profile" className={styles.profile}>
      <span className={styles.avatar}>{user?.name.charAt(0)}</span>
      <span className={styles.profileText}>
        <span className={styles.name}>{user?.name}</span>
        <span className={styles.caption}>პროფილი</span>
      </span>
    </Link>
  );
}
