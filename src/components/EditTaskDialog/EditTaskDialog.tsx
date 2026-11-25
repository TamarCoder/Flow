"use client";

import { useState, type FormEvent } from "react";
import { Button, Dialog, Text } from "@radix-ui/themes";
import FormField from "@/components/FormField/FormField";
import StatusPicker from "@/components/StatusPicker/StatusPicker";
import type { TaskChanges } from "@/hooks/useTasks";
import type { Task } from "@/types/models";
import dialog from "@/styles/dialog.module.scss";

type EditTaskDialogProps = {
  task: Task | null;
  onClose: () => void;
  onSave: (changes: TaskChanges) => Promise<unknown>;
};

// Open while `task` is set. The form is keyed by task id, so it starts fresh for each task.
export default function EditTaskDialog({ task, onClose, onSave }: EditTaskDialogProps) {
  return (
    <Dialog.Root open={!!task} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Content className={dialog.dialog} aria-describedby={undefined}>
        {task && <EditTaskForm key={task.id} task={task} onClose={onClose} onSave={onSave} />}
      </Dialog.Content>
    </Dialog.Root>
  );
}

function EditTaskForm({ task, onClose, onSave }: EditTaskDialogProps & { task: Task }) {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    // An empty title is not saved, as the design asks.
    if (!title.trim()) return;
    // The list updates at once; on failure SWR puts the old task back, which the user sees.
    onSave({ title: title.trim(), status }).catch(() => {});
    onClose();
  };

  return (
    <form className={dialog.form} onSubmit={onSubmit}>
      <Dialog.Title className={dialog.title}>ტასქის რედაქტირება</Dialog.Title>

      <FormField
        label="სათაური"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={title.trim() ? undefined : "სათაური ცარიელი ვერ იქნება"}
        autoFocus
      />

      <div className={dialog.group}>
        <Text className={dialog.label} size="2" weight="medium">სტატუსი</Text>
        <StatusPicker value={status} onChange={setStatus} />
      </div>

      <div className={dialog.actions}>
        <Dialog.Close>
          <Button type="button" className={dialog.outlineButton}>გაუქმება</Button>
        </Dialog.Close>
        <Button type="submit" className={dialog.fillButton}>შენახვა</Button>
      </div>
    </form>
  );
}
