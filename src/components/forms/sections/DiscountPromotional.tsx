import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Plus, Trash } from "lucide-react";
import ImageUploadField from "../../ImageUploadField";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../productSchema";
import { Input } from "@/components/ui/input";

// const defaultValues = {
//   discountImage: [], // Ensure this is initialized
//   price: 0,
//   salePrice: 0,
// };

interface ImagesSectionProps {
  form: UseFormReturn<ProductFormValues>;
  type?: "create" | "update";
}

const DiscountPromotional = ({ form }: ImagesSectionProps) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4">
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
        </div>
        <FormField
          control={form.control}
          name="discountImage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
                  {field?.value?.map((image: string, imgIndex: number) => (
                    <div
                      key={imgIndex}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <ImageUploadField
                        value={image}
                        onChange={(url: string) => {
                          const newImages = [...field.value];
                          newImages[imgIndex] = url;
                          field.onChange(newImages);
                        }}
                        onRemove={() => {
                          const newImages = field.value.filter(
                            (_: string, i: number) => i !== imgIndex
                          );
                          field.onChange(newImages);
                        }}
                        fieldName={`product-image-${imgIndex}`}
                        isArray={true}
                      />
                      {!image && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newImages = field.value.filter(
                              (_: string, i: number) => i !== imgIndex
                            );
                            field.onChange(newImages);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      field.onChange([...(field.value || []), ""]); // Fallback to an empty array
                    }}
                    className=" text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Product Image
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 mb-4">
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
        </div>
      </div>
    </>
  );
};

export default DiscountPromotional;
