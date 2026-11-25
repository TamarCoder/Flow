import type { ComponentProps, ReactNode } from "react";
import { Text, TextField } from "@radix-ui/themes";
import styles from "./FormField.module.scss";

type FormFieldProps = ComponentProps<typeof TextField.Root> & {
  label: string;
  error?: string;
  // Shown at the right end of the label row, e.g. a "forgot password" link.
  labelAction?: ReactNode;
};

export default function FormField({ label, error, labelAction, ...inputProps }: FormFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.labelRow}>
        <Text className={styles.label} size="2" weight="medium">
          {label}
        </Text>
        {labelAction}
      </span>
      <TextField.Root className={styles.input} size="3" aria-invalid={!!error} {...inputProps} />
      {error && (
        <Text className={styles.error} size="1">
          {error}
        </Text>
      )}
    </label>
  );
}
