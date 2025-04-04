import { Switch } from "@/components/ui/switch";
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
import QuantityInput from "./QuantityFields";
import SingleVideoUpload from "./IFrameVideo";

interface BasicInfoSectionProps {
  form: UseFormReturn<ProductFormValues>;
  type: "create" | "update";
}

const BasicInfoSection = ({ form, type }: BasicInfoSectionProps) => (
  <>
    <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="name.ms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name (Malay)</FormLabel>
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
      <FormField
        control={form.control}
        name="marketingMessage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marketing Message (Malay)</FormLabel>
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
      <FormField
        control={form.control}
        name="instruction"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instruction to Use Product (Malay)</FormLabel>
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
      <FormField
        control={form.control}
        name="price"
        render={({ field: { onChange, ...restField } }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                onChange={(e) => onChange(Number(e.target.value))}
                {...restField}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="salePrice"
        render={({ field: { onChange, ...restField } }) => (
          <FormItem>
            <FormLabel>Sale Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                onChange={(e) => onChange(Number(e.target.value))}
                {...restField}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {type === "create" && (
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
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
      )}

      {/* <FormField
      control={form.control}
      name="pricewithQuantity"
      render={({ field: { onChange, ...restField } }) => (
        <FormItem>
          <FormLabel>Price With Quantity (1)</FormLabel>
          <FormControl>
            <Input
              {...restField}
              type="number"
              onChange={(e) => onChange(Number(e.target.value))}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}
    </div>
    <QuantityInput form={form} />
    <SingleVideoUpload form={form} />
  </>
);

export default BasicInfoSection;
