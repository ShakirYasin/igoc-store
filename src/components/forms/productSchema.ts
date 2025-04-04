import { z } from "zod";

export const productSchema = z
  .object({
    _id: z.string().optional(),
    name: z.object({
      en: z.string().min(1, "English name is required"),
      ms: z.string().min(1, "Malay name is required"),
    }),
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
    price: z.number().min(0, "Price must be non-negative"),
    salePrice: z.number().min(0, "Sale price must be non-negative"),
    unit: z.number().min(1, "Unit must be non-negative"),

    images: z.array(z.string()),
    allowShipment: z.boolean(),
    sections: z.array(
      z.object({
        type: z.enum(["NORMAL", "WARNING"]),
        heading: z.object({ en: z.string(), ms: z.string() }),
        subheading: z.object({ en: z.string(), ms: z.string() }),
        description: z.object({ en: z.string(), ms: z.string() }),
        images: z.array(z.string()),
        sectionColor: z.string(),
        orderIndex: z.number().min(1, "Order index must be non-negative"),
      })
    ),
    faqs: z.array(
      z.object({
        question: z.object({ en: z.string(), ms: z.string() }),
        answer: z.object({ en: z.string(), ms: z.string() }),
      })
    ),
    feedback: z.array(
      z.object({
        rating: z.number().min(1, "Rating must be 1-5").max(5),
        comment: z.string(),
        customer: z.object({
          name: z.string(),
          image: z.string(),
          location: z.string(),
        }),
        isGoogleReview: z.boolean(),
      })
    ),
    packages: z.array(
      z.object({
        name: z.object({
          en: z.string(),
          ms: z.string(),
        }),
        description: z.object({
          en: z.string(),
          ms: z.string(),
        }),
        price: z.number().min(0, "Price must be non-negative"),
        image: z.string(),
      })
    ),
    slug: z
      .string()
      .optional()
      .refine(
        (val) => !val || (val.length <= 10 && /^[a-z0-9-]+$/.test(val)),
        "Slug must be max 10 characters, lowercase, and contain only letters, numbers, and hyphens"
      )
      .transform((val) => val?.toLowerCase().replace(/\s+/g, "-")),
    sectionColors: z.object({
      faqSection: z.string(),
      feedbackSection: z.string(),
      freeGiftSection: z.string(),
      packageSection: z.string(),
      paymentSection: z.string(),
      productSection: z.string(),
    }),
    video: z
      .string()
      .min(5, "URL is too short")
      .url("Invalid URL format")
      .refine(
        (url) => url.includes("youtube.com/embed") || url.includes("vimeo.com"),
        {
          message: "URL must be a valid YouTube or Vimeo embed link",
        }
      ),
    facebookPixel: z.object({
      enabled: z.boolean(),
      settings: z
        .object({
          pixelId: z.string(),
          events: z.array(z.string()),
          accessToken: z.string(),
          codeTestEvent: z.string().optional(),
        })
        .nullable(),
    }),
    unitsSold: z.number().min(0, "Units sold must be non-negative"),
    satisfiedCustomers: z
      .number()
      .min(0, "Satisfied customers must be non-negative"),
  })
  .superRefine((data, ctx) => {
    if (!data._id && !data.slug) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Slug is required",
        path: ["slug"],
      });
    }
  });

export type ProductFormValues = z.infer<typeof productSchema>;
