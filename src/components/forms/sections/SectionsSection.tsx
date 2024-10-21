import DynamicFieldArray from "../../DynamicFieldArray";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../productSchema";

interface SectionsSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

const SectionsSection = ({ form }: SectionsSectionProps) => (
  <DynamicFieldArray
    name="sections"
    label="Sections"
    form={form}
    fields={[
      {
        name: "type",
        label: "Type",
        type: "select",
        options: ["NORMAL", "WARNING"],
      },
      { name: "orderIndex", label: "Order Index", type: "number" },
      {
        name: "heading.en",
        label: "Heading (English)",
        type: "text",
      },
      {
        name: "heading.ms",
        label: "Heading (Malay)",
        type: "text",
      },
      {
        name: "subheading.en",
        label: "Subheading (English)",
        type: "text",
      },
      {
        name: "subheading.ms",
        label: "Subheading (Malay)",
        type: "text",
      },
      {
        name: "description.en",
        label: "Description (English)",
        type: "textarea",
      },
      {
        name: "description.ms",
        label: "Description (Malay)",
        type: "textarea",
      },
      { name: "images", label: "Images", type: "image-array" },
      {
        name: "sectionColor",
        label: "Section Color",
        type: "color",
      },
    ]}
  />
);

export default SectionsSection;
