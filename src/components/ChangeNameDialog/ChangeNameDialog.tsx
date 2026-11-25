"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Text } from "@radix-ui/themes";
import FormField from "@/components/FormField/FormField";
import { useProfile } from "@/hooks/useProfile";
import { nameSchema, type NameValues } from "@/lib/profile";
import dialog from "@/styles/dialog.module.scss";

type ChangeNameDialogProps = {
  isOpen: boolean;
  currentName: string;
  onClose: () => void;
};

export default function ChangeNameDialog({ isOpen, currentName, onClose }: ChangeNameDialogProps) {
  const { updateName } = useProfile();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<NameValues>({
    resolver: zodResolver(nameSchema),
    values: { name: currentName },
  });

  const onSubmit = async (values: NameValues) => {
    try {
      await updateName(values);
      onClose();
    } catch {
      setError("root", { message: "სახელი ვერ შეინახა. სცადე თავიდან." });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Content className={dialog.dialog} aria-describedby={undefined}>
        <form className={dialog.form} onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Title className={dialog.title}>სახელის შეცვლა</Dialog.Title>
          <FormField label="სახელი" error={errors.name?.message} autoFocus {...register("name")} />
          {errors.root && <Text className={dialog.error} size="2">{errors.root.message}</Text>}
          <div className={dialog.actions}>
            <Dialog.Close>
              <Button type="button" className={dialog.outlineButton}>გაუქმება</Button>
            </Dialog.Close>
            <Button type="submit" className={dialog.fillButton} disabled={isSubmitting}>შენახვა</Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
