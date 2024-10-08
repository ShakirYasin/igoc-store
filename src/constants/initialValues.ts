import { ProductFormValues } from "@/components/forms/ProductForm";
import { CustomerInput, FeedbackInput } from "graphql/generated/hooks";


export type TSectionColors = {
  faqSection: string;
  feedbackSection: string;
  freeGiftSection: string;
  packageSection: string;
  paymentSection: string;
  productSection: string;
};
export const productInitialValues: ProductFormValues = {
  name: { en: "", ms: "" },
    price: 0,
    salePrice: 0,
    totalUnits: 0,
    images: [],
    sections: [
      {
        type: "NORMAL",
        heading: { en: "", ms: "" },
        subheading: { en: "", ms: "" },
        description: { en: "", ms: "" },
        sectionColor: "#000000",
        images: [],
        orderIndex: 0,
      },
    ],
    faqs: [
      {
        question: { en: "", ms: "" },
        answer: { en: "", ms: "" },
      },
    ],
    feedback: [
      {
        rating: 0,
        comment: "",
        customer: {
          name: "",
          image: "",
          location: "",
        } as CustomerInput,
        isGoogleReview: false,
      },
    ] as FeedbackInput[],
    slug: "",
    sectionColors: {
    faqSection: "#000000",
    feedbackSection: "#000000",
    freeGiftSection: "#000000",
    packageSection: "#000000",
    paymentSection: "#000000",
    productSection: "#000000",
  } as TSectionColors,
};
