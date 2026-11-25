'use client'
import Link from "next/link";
import { Button, TextField, Text } from "@radix-ui/themes";
import styles from "./RegisterForm.module.scss";
import { registerSchema, RegisterValues } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formTitle}>რეგისტრაცია</h2>

      <label className={styles.field}>
        <Text className={styles.label} size="2" weight="medium">
          სახელი
        </Text>
        <TextField.Root
          className={styles.input}
          size="3"
          placeholder="ნინო"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <Text className={styles.error} size="1">
            {errors.name.message}
          </Text>
        )}
      </label>

      <label className={styles.field}>
        <Text className={styles.label} size="2" weight="medium">
          ელფოსტა
        </Text>
        <TextField.Root
          className={styles.input}
          size="3"
          type="email"
          placeholder="nino@mail.ge"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <Text className={styles.error} size="1">
            {errors.email.message}
          </Text>
        )}
      </label>

      <label className={styles.field}>
        <Text className={styles.label} size="2" weight="medium">
          პაროლი
        </Text>
        <TextField.Root
          className={styles.input}
          size="3"
          type="password"
          placeholder="მინიმუმ 8 სიმბოლო"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <Text className={styles.error} size="1">
            {errors.password.message}
          </Text>
        )}
      </label>

      <Button
        type="submit"
        className={styles.fillButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "იგზავნება..." : "ანგარიშის შექმნა"}
      </Button>

      <p className={styles.switchText}>
        უკვე გაქვს ანგარიში?{" "}
        <Link href="/login" className={styles.switchLink}>
          შესვლა
        </Link>
      </p>
    </form>
  );
}
