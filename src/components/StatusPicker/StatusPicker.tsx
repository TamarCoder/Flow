import { statusLabels } from "@/lib/taskStatus";
import type { TaskStatus } from "@/types/models";
import styles from "./StatusPicker.module.scss";

type StatusPickerProps = {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
};

const statuses = Object.keys(statusLabels) as TaskStatus[];

// Three equal buttons; the chosen one gets a 2px border in its status color.
export default function StatusPicker({ value, onChange }: StatusPickerProps) {
  return (
    <div className={styles.picker} role="radiogroup" aria-label="სტატუსი">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          role="radio"
          aria-checked={value === status}
          data-status={status}
          className={styles.option}
          onClick={() => onChange(status)}
        >
          {statusLabels[status]}
        </button>
      ))}
    </div>
  );
}
