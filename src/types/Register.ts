import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1).max(50).trim(),
  email: z.string().min(1).email().trim(),
  password: z.string().min(8).max(20).trim(),
});

export type RegisterBody = z.infer<typeof registerSchema>;
