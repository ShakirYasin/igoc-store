import { z } from "zod";

export const productSchema = z
  .object({
    _id: z.string().optional(),
    name: z.object({
      en: z.string().min(1, "English name is required"),
      ms: z.string().min(1, "Malay name is required"),
    }),
    price: z.number().min(0, "Price must be non-negative"),
    salePrice: z.number().min(0, "Sale price must be non-negative"),
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
    slug: z.string().optional(),
    sectionColors: z.object({
      faqSection: z.string(),
      feedbackSection: z.string(),
      freeGiftSection: z.string(),
      packageSection: z.string(),
      paymentSection: z.string(),
      productSection: z.string(),
    }),
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
