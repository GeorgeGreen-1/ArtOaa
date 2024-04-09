import * as z from "zod";

export const ContactFormSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  mail: z.string().email(),
  phonenumber: z.string().min(3),
  message: z.string().min(3),
});

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;
