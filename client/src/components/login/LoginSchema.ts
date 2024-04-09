import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type ILoginSchema = z.infer<typeof LoginSchema>;
