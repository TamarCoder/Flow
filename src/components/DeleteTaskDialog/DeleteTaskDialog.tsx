"use client";

import { AlertDialog, Button } from "@radix-ui/themes";
import type { Task } from "@/types/models";
import dialog from "@/styles/dialog.module.scss";
import styles from "./DeleteTaskDialog.module.scss";

type DeleteTaskDialogProps = {
  task: Task | null;
  onClose: () => void;
  onConfirm: () => void;
};

// Every delete goes through this confirmation, as the design asks.
export default function DeleteTaskDialog({ task, onClose, onConfirm }: DeleteTaskDialogProps) {
  return (
    <AlertDialog.Root open={!!task} onOpenChange={(open) => !open && onClose()}>
      <AlertDialog.Content className={`${dialog.dialog} ${styles.dialog}`}>
        <AlertDialog.Title className={dialog.title}>წავშალო ტასქი?</AlertDialog.Title>
        <AlertDialog.Description className={dialog.text}>
          „{task?.title}“ წაიშლება და მისი აღდგენა ვეღარ მოხერხდება.
        </AlertDialog.Description>

        <div className={dialog.actions}>
          <AlertDialog.Cancel>
            <Button type="button" className={dialog.outlineButton}>გაუქმება</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button type="button" className={dialog.dangerButton} onClick={onConfirm}>წაშლა</Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
