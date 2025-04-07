import DynamicFieldArray from "../../DynamicFieldArray";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../productSchema";

interface FeedbackSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

const FeedbackSection = ({ form }: FeedbackSectionProps) => (
  <DynamicFieldArray
    name="feedback"
    label="Feedback"
    form={form}
    fields={[
      {
        name: "rating",
        label: "Rating",
        type: "number",
        min: 0,
        max: 5,
        step: 0.1,
      },
      { name: "comment", label: "Comment", type: "text" },
      {
        name: "customer.name",
        label: "Customer Name",
        type: "text",
      },
      {
        name: "customer.image",
        label: "Customer Image",
        type: "image",
      },
      {
        name: "customer.location",
        label: "Customer Location",
        type: "text",
      },
      {
        name: "isGoogleReview",
        label: "Is Google Review",
        type: "switch",
      },
    ]}
  />
);

export default FeedbackSection;
