import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { ProductFormValues } from "../productSchema";
import DynamicFieldArray from "@/components/DynamicFieldArray";

interface BasicInfoSectionProps {
  form: UseFormReturn<ProductFormValues>;
  type: "create" | "update";
}

const BasicInfoSection = ({ form }: BasicInfoSectionProps) => (
  <>
    <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="headline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Headline (Malay)</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <DynamicFieldArray
      name="sections"
      label="Images Section"
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
        // {
        //   name: "sectionColor",
        //   label: "Section Color",
        //   type: "color",
        // },
        // { name: "images", label: "Images", type: "image-array" },
      ]}
    />
  </>
);

export default BasicInfoSection;
