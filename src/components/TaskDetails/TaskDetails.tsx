"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import DeleteTaskDialog from "@/components/DeleteTaskDialog/DeleteTaskDialog";
import EditTaskDialog from "@/components/EditTaskDialog/EditTaskDialog";
import StatusPicker from "@/components/StatusPicker/StatusPicker";
import TaskActions from "@/components/TaskActions/TaskActions";
import TaskDescription from "@/components/TaskDetails/TaskDescription";
import { useProject } from "@/hooks/useProject";
import { useTask } from "@/hooks/useTask";
import { statusLabels } from "@/lib/taskStatus";
import styles from "./TaskDetails.module.scss";

export default function TaskDetails() {
  const { id, taskId } = useParams<{ id: string; taskId: string }>();
  const router = useRouter();
  const { data: project } = useProject(id);
  const { task, error, updateTask, deleteTask } = useTask(taskId);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const projectHref = `/projects/${id}`;

  const confirmDelete = async () => {
    await deleteTask();
    router.push(projectHref);
  };

  return (
    <main className={styles.page}>
      <Link href={projectHref} className={styles.backLink}>← {project?.name ?? "პროექტი"}</Link>

      {error && <p className={styles.notFound}>ტასქი ვერ მოიძებნა.</p>}

      {task && (
        <article className={styles.card} data-status={task.status}>
          <span className={styles.statusLabel}>{statusLabels[task.status]}</span>
          <h1 className={styles.title}>{task.title}</h1>

          <div className={styles.group}>
            <span className={styles.label}>სტატუსი</span>
            {/* Saved as soon as it changes, as the design asks. */}
            <StatusPicker value={task.status} onChange={(status) => updateTask({ status }).catch(() => {})} />
          </div>

          <TaskDescription key={task.id} initialValue={task.description} onSave={(description) => updateTask({ description })} />

          <TaskActions onDelete={() => setIsDeleting(true)} onEdit={() => setIsEditing(true)} />
        </article>
      )}

      {/* After saving, the user stays on this page; after deleting, they go back to the project. */}
      <EditTaskDialog task={isEditing ? task ?? null : null} onClose={() => setIsEditing(false)} onSave={updateTask} />
      <DeleteTaskDialog
        task={isDeleting ? task ?? null : null}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => confirmDelete().catch(() => {})}
      />
    </main>
  );
}
