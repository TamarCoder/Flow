"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Text } from "@radix-ui/themes";
import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField/FormField";
import { useLogin } from "@/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { trigger, error: requestError } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await trigger(values);
      router.push("/dashboard");
    } catch {
      // requestError from SWR shows the message below.
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formTitle}>შესვლა</h2>

      <FormField label="ელფოსტა" type="email" placeholder="nino@mail.ge" error={errors.email?.message} {...register("email")} />

      <FormField
        label="პაროლი"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        labelAction={
          <Link href="/forgot-password" className={styles.forgotLink}>
            დაგავიწყდა?
          </Link>
        }
        {...register("password")}
      />

      {requestError && (
        <Text className={styles.error} size="2">
          შესვლა ვერ მოხერხდა. სცადე თავიდან.
        </Text>
      )}

      <Button type="submit" className={styles.fillButton} disabled={isSubmitting}>
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
