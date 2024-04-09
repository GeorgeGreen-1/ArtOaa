import * as z from "zod";

export const BidFormSchema = z.object({
  coverLetter: z.string().min(5),
  offer: z.string().min(2),
});

export type BidFormSchemaType = z.infer<typeof BidFormSchema>;
