import { statusLabels } from "@/lib/taskStatus";
import type { Task } from "@/types/models";
import styles from "./TaskRow.module.scss";

type TaskRowProps = {
  task: Task;
  onStatusClick: () => void;
};

export default function TaskRow({ task, onStatusClick }: TaskRowProps) {
  return (
    <li className={styles.row} data-status={task.status}>
      <button
        type="button"
        className={styles.statusButton}
        onClick={onStatusClick}
        aria-label={`სტატუსი: ${statusLabels[task.status]}. შეცვლა`}
      >
        <span className={styles.circle}>
          {task.status === "done" && (
            <svg viewBox="0 0 16 16" className={styles.check} aria-hidden>
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
          )}
        </span>
      </button>

      <div className={styles.text}>
        <p className={styles.title}>{task.title}</p>
        <span className={styles.statusLabel}>{statusLabels[task.status]}</span>
      </div>
    </li>
  );
}
