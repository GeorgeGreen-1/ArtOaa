import * as z from "zod";

// This is blob type for image upload

const BlobType = z.custom<Blob>(
  (value) => value instanceof Blob && z.OK(value),
);

const ArtStyleType = z.object({
  value: z.string(),
  label: z.string(),
});

export const OrderFormSchema = z.object({
  description: z.string().min(5),
  wallImage: BlobType,
  location: z.string().min(5),
  artStyles: z.array(ArtStyleType).min(1),
  wallImageSize: z.object({
    value: z.string().min(1, { message: "Required and at least 1 character" }),
    label: z.string(),
  }),
});

export type OrderFormSchemaType = z.infer<typeof OrderFormSchema>;
