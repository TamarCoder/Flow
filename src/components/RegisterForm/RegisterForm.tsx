'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Text } from "@radix-ui/themes";
import styles from "./RegisterForm.module.scss";
import { registerSchema, RegisterValues } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/components/FormField/FormField";
import { useRegister } from "@/hooks/useAuth";

export default function RegisterForm() {
  const router = useRouter();
  const { trigger, error: requestError } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterValues) => {
    try {
      await trigger(values);
      router.push("/dashboard");
    } catch {
      // requestError from SWR shows the message below.
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formTitle}>რეგისტრაცია</h2>

      <FormField label="სახელი" placeholder="ნინო" error={errors.name?.message} {...register("name")} />
      <FormField label="ელფოსტა" type="email" placeholder="nino@mail.ge" error={errors.email?.message} {...register("email")} />
      <FormField label="პაროლი" type="password" placeholder="მინიმუმ 8 სიმბოლო" error={errors.password?.message} {...register("password")} />

      {requestError && (
        <Text className={styles.error} size="2">
          რეგისტრაცია ვერ მოხერხდა. სცადე თავიდან.
        </Text>
      )}

      <Button type="submit" className={styles.fillButton} disabled={isSubmitting}>
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
