import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { ProductFormValues } from "../productSchema";

interface QuantityInputProps {
  form: UseFormReturn<ProductFormValues>;
}

const QuantityInput = ({ form }: QuantityInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dynamicFields", // Field array name in your form values schema
  });

  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-lg">
      <div className="mb-4">
        <h3 className="text-white font-semibold mb-2">
          Quantity and Price Fields
        </h3>
        <p className="text-sm text-gray-500">(1 PCS) RM29 + RM10 COD - RM39</p>
      </div>

      {/* Dynamic Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end space-x-2">
            <FormField
              control={form.control}
              name={`dynamicFields.${index}.value`} // Path for each dynamic field
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Choice {index + 1}</FormLabel>
                  <FormControl>
                    <Input
                      {...field} // Pass field from react-hook-form
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)} // Remove the field at the specified index
            >
              X
            </Button>
          </div>
        ))}
      </div>

      {/* Add New Field Button */}
      <Button
        type="button"
        onClick={() => append({ value: "" })} // Adds a new empty field to the array
        className="mt-4 bg-white hover:bg-white/60 text-black"
      >
        Add Field
      </Button>
    </div>
  );
};

export default QuantityInput;
