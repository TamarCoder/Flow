import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "სახელი მინიმუმ 2 სიმბოლო უნდა იყოს"),
  email: z.email("შეიყვანე სწორი ელფოსტა"),
  password: z
    .string()
    .min(8, "პაროლი მინიმუმ 8 სიმბოლო უნდა იყოს")
    .regex(/[0-9]/, "პაროლი უნდა შეიცავდეს ერთ ციფრს"),
});

export const loginSchema = z.object({
  email: z.email("შეიყვანე სწორი ელფოსტა"),
  password: z.string().min(1, "შეიყვანე პაროლი"),
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
