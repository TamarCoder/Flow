import { z } from "zod";

export const nameSchema = z.object({
  name: z.string().trim().min(2, "სახელი მინიმუმ 2 სიმბოლო უნდა იყოს"),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1, "შეიყვანე მიმდინარე პაროლი"),
  newPassword: z
    .string()
    .min(8, "პაროლი მინიმუმ 8 სიმბოლო უნდა იყოს")
    .regex(/[0-9]/, "პაროლი უნდა შეიცავდეს ერთ ციფრს"),
});

export type NameValues = z.infer<typeof nameSchema>;
export type PasswordValues = z.infer<typeof passwordSchema>;
