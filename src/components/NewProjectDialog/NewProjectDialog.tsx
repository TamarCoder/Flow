"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Text, TextArea } from "@radix-ui/themes";
import FormField from "@/components/FormField/FormField";
import { useCreateProject } from "@/hooks/useProjects";
import { projectSchema, ProjectValues } from "@/lib/project";
import dialog from "@/styles/dialog.module.scss";
import styles from "./NewProjectDialog.module.scss";

// The trigger button is passed in, so the dashboard keeps its own button style.
export default function NewProjectDialog({ trigger }: { trigger: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { trigger: createProject, error: requestError } = useCreateProject();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", description: "" },
  });

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  const onSubmit = async (values: ProjectValues) => {
    try {
      const project = await createProject(values);
      onOpenChange(false);
      router.push(`/projects/${project.id}`);
    } catch {
      // requestError from SWR shows the message below.
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content className={dialog.dialog} aria-describedby={undefined}>
        <form className={dialog.form} onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Title className={dialog.title}>ახალი პროექტი</Dialog.Title>

          <FormField label="სახელი" error={errors.name?.message} {...register("name")} />

          <label className={styles.field}>
            <Text className={dialog.label} size="2" weight="medium">აღწერა</Text>
            <TextArea className={styles.textarea} placeholder="რაზეა ეს პროექტი?" {...register("description")} />
          </label>

          {requestError && <Text className={dialog.error} size="2">პროექტი ვერ შეიქმნა. სცადე თავიდან.</Text>}

          <div className={dialog.actions}>
            <Dialog.Close>
              <Button type="button" className={dialog.outlineButton}>გაუქმება</Button>
            </Dialog.Close>
            <Button type="submit" className={dialog.fillButton} disabled={isSubmitting}>
              {isSubmitting ? "იქმნება..." : "შექმნა და ტასქების გაწერა"}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
