import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

interface Option {
  value: string;
  title: string;
  subtitle: string;
  badge: string;
}

interface RadioCardGroupProps {
  name: "paymentOption" | "shippingRegion";
  control: Control<{
    packageId: string;
    name: string;
    email: string;
    postcode: string;
    fullAddress: string;
    phoneNumber: string;
    city: string;
    state: string;
    paymentOption: "COD" | "ONLINE";
    shippingRegion?: "WEST" | "EAST";
  }>;
  label: string;
  options: Option[];
  horizontal?: boolean;
}

export function RadioCardGroup({
  name,
  control,
  label,
  options,
  horizontal = false,
}: RadioCardGroupProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${horizontal ? "flex-1" : "w-full"} space-y-4`}>
          <FormLabel className="text-xl font-medium text-black block">
            {label}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-3"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.value}
                    className={`flex flex-col w-full p-5 bg-white border-2 rounded-xl cursor-pointer transition-all duration-200
                      ${
                        field.value === option.value
                          ? "border-lime-500 ring-1 ring-lime-500/20"
                          : "border-gray-100 hover:border-lime-500/50"
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">
                        {option.title}
                      </span>
                      <span className="text-lime-600 text-sm font-medium bg-lime-50 px-2.5 py-0.5 rounded-full">
                        {option.badge}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm mt-1">
                      {option.subtitle}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
