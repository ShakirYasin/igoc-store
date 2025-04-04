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
        name: "images1",
        label: "Image 1",
        type: "image",
      },
      {
        name: "images2",
        label: "Image 2",
        type: "image",
      },
      {
        name: "image1Description",
        label: "Image 1 Description (Malay)",
        type: "textarea",
      },
      {
        name: "image2Description",
        label: "Image 2 Description (Malay)",
        type: "textarea",
      },

      {
        name: "reviewImage",
        label: "Review Image",
        type: "image",
      },
      // {
      //   name: "sectionColor",
      //   label: "Section Color",
      //   type: "color",
      // },
      // { name: "images", label: "Images", type: "image-array" },
    ]}
  />
);

export default SectionsSection;
