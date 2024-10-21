import DynamicFieldArray from "../../DynamicFieldArray";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../productSchema";

interface FAQsSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

const FAQsSection = ({ form }: FAQsSectionProps) => (
  <DynamicFieldArray
    name="faqs"
    label="FAQs"
    form={form}
    fields={[
      {
        name: "question.en",
        label: "Question (English)",
        type: "text",
      },
      {
        name: "question.ms",
        label: "Question (Malay)",
        type: "text",
      },
      {
        name: "answer.en",
        label: "Answer (English)",
        type: "textarea",
      },
      {
        name: "answer.ms",
        label: "Answer (Malay)",
        type: "textarea",
      },
    ]}
  />
);

export default FAQsSection;
