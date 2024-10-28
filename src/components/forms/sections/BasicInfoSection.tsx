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

interface BasicInfoSectionProps {
  form: UseFormReturn<ProductFormValues>;
  type: "create" | "update";
}

const BasicInfoSection = ({ form, type }: BasicInfoSectionProps) => (
  <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField
      control={form.control}
      name="name.en"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name (English)</FormLabel>
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
    <FormField
      control={form.control}
      name="totalUnits"
      render={({ field: { onChange, ...restField } }) => (
        <FormItem>
          <FormLabel>Total Units</FormLabel>
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
    <FormField
      control={form.control}
      name="allowShipment"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 space-x-3 space-y-0">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Allow Shipment</FormLabel>
            <div className="text-sm text-gray-400">
              Enable shipping for this product
            </div>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=checked]:bg-black"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default BasicInfoSection;
