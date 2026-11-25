import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(1, "შეიყვანე პროექტის სახელი"),
  description: z.string().trim(),
});

export type ProjectValues = z.infer<typeof projectSchema>;
