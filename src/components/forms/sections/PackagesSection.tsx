import DynamicFieldArray from "../../DynamicFieldArray";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../productSchema";

interface PackagesSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

const PackagesSection = ({ form }: PackagesSectionProps) => (
  <DynamicFieldArray
    name="packages"
    label="Packages"
    form={form}
    fields={[
      {
        name: "name.en",
        label: "Name (English)",
        type: "text",
      },
      {
        name: "name.ms",
        label: "Name (Malay)",
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
      {
        name: "price",
        label: "Price",
        type: "number",
      },
      {
        name: "image",
        label: "Image",
        type: "image",
      },
    ]}
  />
);

export default PackagesSection;
