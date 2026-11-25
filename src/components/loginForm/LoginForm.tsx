"use client";

import Link from "next/link";
import { Button, TextField, Text } from "@radix-ui/themes";
import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formTitle}>შესვლა</h2>

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
          placeholder="••••••••"
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
        {isSubmitting ? "იგზავნება..." : "შესვლა"}
      </Button>

      <p className={styles.switchText}>
        არ გაქვს ანგარიში?{" "}
        <Link href="/register" className={styles.switchLink}>
          რეგისტრაცია
        </Link>
      </p>
    </form>
  );
}
