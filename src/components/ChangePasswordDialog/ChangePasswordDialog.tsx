"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Text } from "@radix-ui/themes";
import FormField from "@/components/FormField/FormField";
import { useProfile } from "@/hooks/useProfile";
import { passwordSchema, type PasswordValues } from "@/lib/profile";
import dialog from "@/styles/dialog.module.scss";

type ChangePasswordDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChangePasswordDialog({ isOpen, onClose }: ChangePasswordDialogProps) {
  const { changePassword } = useProfile();
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  // Passwords never stay in the form after it closes.
  const close = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: PasswordValues) => {
    try {
      await changePassword(values);
      close();
    } catch {
      setError("root", { message: "პაროლი ვერ შეიცვალა. შეამოწმე მიმდინარე პაროლი." });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <Dialog.Content className={dialog.dialog} aria-describedby={undefined}>
        <form className={dialog.form} onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Title className={dialog.title}>პაროლის შეცვლა</Dialog.Title>
          <FormField label="მიმდინარე პაროლი" type="password" autoComplete="current-password" error={errors.currentPassword?.message} {...register("currentPassword")} />
          <FormField label="ახალი პაროლი" type="password" autoComplete="new-password" placeholder="მინიმუმ 8 სიმბოლო" error={errors.newPassword?.message} {...register("newPassword")} />
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
