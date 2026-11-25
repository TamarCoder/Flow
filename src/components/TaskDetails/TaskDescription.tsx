"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TaskDetails.module.scss";

type TaskDescriptionProps = {
  initialValue: string;
  onSave: (description: string) => Promise<unknown>;
};

// Saves while typing: waits 600ms after the last key so each keystroke is not a request.
export default function TaskDescription({ initialValue, onSave }: TaskDescriptionProps) {
  const [value, setValue] = useState(initialValue);
  const [hasSaveError, setHasSaveError] = useState(false);
  const lastSaved = useRef(initialValue);
  // Kept in a ref so a new onSave from the parent does not restart the timer.
  const saveRef = useRef(onSave);

  useEffect(() => {
    saveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    if (value === lastSaved.current) return;
    const timer = setTimeout(() => {
      saveRef.current(value)
        .then(() => {
          lastSaved.current = value;
          setHasSaveError(false);
        })
        .catch(() => setHasSaveError(true));
    }, 600);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <label className={styles.group}>
      <span className={styles.label}>აღწერა</span>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="დაამატე დეტალები ამ ტასქზე…"
      />
      {hasSaveError && <span className={styles.error}>აღწერა ვერ შეინახა. სცადე თავიდან.</span>}
    </label>
  );
}
