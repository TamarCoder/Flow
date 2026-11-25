'use client';

import Image from "next/image";
import styles from "./logo.module.scss";

export default function Logo() {
  return (
    <>
      <Image
        className={styles.light}
        src="/logos/logo-LightMode.png"
        alt="Logo"
        width={120}
        height={40}
        priority
      />
      <Image
        className={styles.dark}
        src="/logos/logo-darkMode.png"
        alt="Logo"
        width={120}
        height={40}
        priority
      />
    </>
  );
}
