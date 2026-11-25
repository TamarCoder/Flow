"use client";

import { useState, type FormEvent } from "react";
import styles from "./AddTaskForm.module.scss";

export default function AddTaskForm({ onAdd }: { onAdd: (title: string) => Promise<unknown> }) {
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    // Empty or spaces-only titles are ignored, as the design asks.
    if (!trimmed || isSaving) return;
    setIsSaving(true);
    try {
      await onAdd(trimmed);
      setTitle("");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="ახალი ტასქი…"
        aria-label="ახალი ტასქი"
      />
      <button type="submit" className={styles.button} disabled={isSaving}>
        დამატება
      </button>
    </form>
  );
}
