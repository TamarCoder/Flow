import styles from "./TaskActions.module.scss";

type TaskActionsProps = {
  onDelete: () => void;
  onEdit: () => void;
};

// Delete and Edit buttons at the bottom right of the task page.
export default function TaskActions({ onDelete, onEdit }: TaskActionsProps) {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.deleteButton} onClick={onDelete}>
        წაშლა
      </button>
      <button type="button" className={styles.editButton} onClick={onEdit}>
        რედაქტირება
      </button>
    </div>
  );
}
