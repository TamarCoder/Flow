"use client";

import { useEffect, useState } from "react";
import { readSavedTheme, saveTheme, type Theme } from "@/lib/theme";
import styles from "./ThemeSwitch.module.scss";

const options: { value: Theme; label: string }[] = [
  { value: "light", label: "ღია" },
  { value: "dark", label: "მუქი" },
];

// Two-part "light / dark" switch on the profile page.
export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(readSavedTheme());
  }, []);

  const choose = (next: Theme) => {
    setTheme(next);
    saveTheme(next);
  };

  return (
    <div className={styles.switch} role="radiogroup" aria-label="თემა">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={theme === option.value}
          className={styles.option}
          onClick={() => choose(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
