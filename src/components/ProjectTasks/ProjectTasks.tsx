"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AddTaskForm from "@/components/AddTaskForm/AddTaskForm";
import DeleteTaskDialog from "@/components/DeleteTaskDialog/DeleteTaskDialog";
import EditTaskDialog from "@/components/EditTaskDialog/EditTaskDialog";
import TaskRow from "@/components/TaskRow/TaskRow";
import TaskSidebar from "@/components/TaskSidebar/TaskSidebar";
import { useProject } from "@/hooks/useProject";
import { useTasks } from "@/hooks/useTasks";
import { findNextStatus, type TaskFilter } from "@/lib/taskStatus";
import type { Task } from "@/types/models";
import { formatGeorgianDate } from "@/lib/formatGeorgianDate";
import styles from "./ProjectTasks.module.scss";

export default function ProjectTasks() {
  const { id } = useParams<{ id: string }>();
  const { data: project, error: projectError } = useProject(id);
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks(id);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      doing: tasks.filter((task) => task.status === "doing").length,
      done: tasks.filter((task) => task.status === "done").length,
    }),
    [tasks],
  );
  const visibleTasks = filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className={styles.layout}>
      <TaskSidebar filter={filter} counts={counts} onFilterChange={setFilter} />

      <main className={styles.main}>
        <Link href="/dashboard" className={styles.backLink}>← პროექტები</Link>

        {projectError ? (
          <p className={styles.description}>პროექტი ვერ მოიძებნა.</p>
        ) : (
          <header className={styles.header}>
            <span className={styles.date}>{formatGeorgianDate(new Date())}</span>
            <h2 className={styles.title}>{project?.name}</h2>
            {project?.description && <p className={styles.description}>{project.description}</p>}
          </header>
        )}

        <AddTaskForm onAdd={createTask} />

        {!isLoading && visibleTasks.length === 0 ? (
          <p className={styles.empty}>აქ ტასქები არ არის</p>
        ) : (
          <ul className={styles.list}>
            {visibleTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                // On failure SWR puts the old status back, so the error needs no extra message.
                onStatusClick={() => updateTask(task.id, { status: findNextStatus(task.status) }).catch(() => {})}
                onEdit={() => setEditingTask(task)}
                onDelete={() => setDeletingTask(task)}
              />
            ))}
          </ul>
        )}
      </main>

      <EditTaskDialog
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={(changes) => updateTask(editingTask!.id, changes)}
      />
      <DeleteTaskDialog
        task={deletingTask}
        onClose={() => setDeletingTask(null)}
        // On failure SWR puts the task back in the list.
        onConfirm={() => deletingTask && deleteTask(deletingTask.id).catch(() => {})}
      />
    </div>
  );
}
