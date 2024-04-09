import * as z from "zod";

const BlobType = z.custom<Blob>(
  (value) => value instanceof Blob && z.OK(value),
);

const ArtStyleType = z.object({
  value: z.string(),
  label: z.string(),
});

// Edit Profile - Section - Main-info schema

export const MainInfoFormSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  profileImage: BlobType.or(z.string()),
});

export type MainInfoFormSchemaType = z.infer<typeof MainInfoFormSchema>;

// Edit Profile - Section - Portfolio-info schema

export const PortfolioInfoFormSchema = z.object({
  artStyles: z.array(ArtStyleType).min(1),
  aboutMe: z.string().min(3),
  location: z.object({
    value: z.string().min(1),
    label: z.string(),
  }),
});

export type PortfolioInfoFormSchemaType = z.infer<
  typeof PortfolioInfoFormSchema
>;

// Edit Profile - Section - Payment-info schema

export const PaymentInfoFormSchema = z.object({
  cardNumber: z.string().min(16),
  cardHolder: z.string().min(1),
  cardMonth: z.string().min(2),
  cardCVC: z.string().min(3),
  cardYear: z.string().min(2),
});

export type PaymentInfoFormSchemaType = z.infer<typeof PaymentInfoFormSchema>;
