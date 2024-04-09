import { z } from "zod";

const BlobType = z.custom<Blob>(
  (value) => value instanceof Blob && z.OK(value),
);

export const UploadProjectSchema = z.object({
  images: z.array(BlobType).min(1), // Array of image URLs
});

export type UploadProjectSchemaType = z.infer<typeof UploadProjectSchema>;
