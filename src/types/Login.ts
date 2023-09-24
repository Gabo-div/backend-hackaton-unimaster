import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1).email().trim(),
  password: z.string().min(8).max(20).trim(),
});

export type LoginBody = z.infer<typeof loginSchema>;
