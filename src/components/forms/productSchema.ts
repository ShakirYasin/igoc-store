import { z } from "zod";

export const productSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  discountImage: z.array(z.string()),

  headline: z.string().min(1, "Add Headline"),
  marketingMessage: z.string().min(1, "Add Marketing Message"),
  instruction: z.string().min(1, "Add Instruction"),
  dynamicFields: z
    .array(
      z.object({
        value: z.string().min(1, "Add price and Quantity here"), // Ensure each field has a value
      })
    )
    .optional(),
  price: z.number(),
  salePrice: z.number(),
  unit: z.number().min(1, "Unit must be non-negative"),
  sectionColors: z.object({
    faqSection: z.string(),
  }),

  images: z.array(z.string()),
  sections: z.array(
    z.object({
      type: z.enum(["NORMAL", "WARNING"]),
      heading: z.object({ en: z.string(), ms: z.string() }),
      subheading: z.object({ en: z.string(), ms: z.string() }),
      description: z.object({ en: z.string(), ms: z.string() }),
      images: z.array(z.string()),
      discountImage: z.array(z.string()),
      sectionColors: z.string(),
      orderIndex: z.number().min(1, "Order index must be non-negative"),
    })
  ),
  // slug: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (val) => !val || (val.length <= 10 && /^[a-z0-9-]+$/.test(val)),
  //     "Slug must be max 10 characters, lowercase, and contain only letters, numbers, and hyphens"
  //   )
  //   .transform((val) => val?.toLowerCase().replace(/\s+/g, "-")),
  // sectionColors: z.object({
  //   faqSection: z.string(),
  //   feedbackSection: z.string(),
  //   freeGiftSection: z.string(),
  //   packageSection: z.string(),
  //   paymentSection: z.string(),
  //   productSection: z.string(),
  // }),
  video: z
    .string()
    .url("Invalid URL format")
    .refine(
      (url) => url.includes("youtube.com/embed") || url.includes("vimeo.com"),
      {
        message: "URL must be a valid YouTube or Vimeo embed link",
      }
    ),
});

export type ProductFormValues = z.infer<typeof productSchema>;
