import { ProductFormValues } from "@/components/forms/productSchema";

export const productInitialValues: ProductFormValues = {
  _id: undefined, // Optional field
  name: "",
  discountImage: [], // Array of strings
  headline: "", // String
  marketingMessage: "", // String
  instruction: "", // String
  dynamicFields: [], // Optional array of objects
  price: 0, // Number
  video: "", // String (URL)
  salePrice: 0, // Number
  unit: 1, // Number (minimum value is 1)
  images: [], // Array of strings
  sectionColors: {
    faqSection: "#000000",
  },
  sections: [
    {
      type: "NORMAL",
      heading: { en: "", ms: "" },
      subheading: { en: "", ms: "" },
      description: { en: "", ms: "" },
      images: [],
      discountImage: [],
      sectionColors: "#000000",
      orderIndex: 1, // Minimum value is 1
    },
  ],
  // slug: "",
  // sectionColors: {
  //   faqSection: "#000000",
  //   feedbackSection: "#000000",
  //   freeGiftSection: "#000000",
  //   packageSection: "#000000",
  //   paymentSection: "#000000",
  //   productSection: "#000000",
  // } as TSectionColors,
};
