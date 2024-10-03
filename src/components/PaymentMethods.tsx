import React from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { localizedData } from "@/constants/locales";
import { localizeObject } from "@/utils/site.utils";
export type TPaymentMethodsHeading = {
  text1: string;
  text2: string;
  selectionText: string;
  selectionText2: string;
  buttonText: string;
  package: string;
  name: string;
  postcode: string;
  fullAddress: string;
  phoneNumber: string;
  city: string;
  state: string;
};
const PaymentMethods = () => {
  const form = useForm();
  const params = useParams();
  const lang = params.lang as string;
  const paymentMethodsHeading = localizeObject(localizedData.payment, lang);
  return (
    <div className="py-16 bg-lime-400">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-6xl font-bold mb-4 text-center">
          <span className="text-white">
            {paymentMethodsHeading.text1 as string}{" "}
          </span>
          <span className="text-black">
            {paymentMethodsHeading.text2 as string}
          </span>
        </h2>
        <Form {...form}>
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem className="py-4">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full h-[75px] text-xl font-medium px-8">
                      <SelectValue
                        placeholder={paymentMethodsHeading.package as string}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={paymentMethodsHeading.name as string}
                        className="h-[75px] text-xl font-medium px-8"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={
                          paymentMethodsHeading.fullAddress as string
                        }
                        className="h-[75px] text-xl font-medium px-8"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={paymentMethodsHeading.city as string}
                        className="h-[75px] text-xl font-medium px-8"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={paymentMethodsHeading.postcode as string}
                        className="h-[75px] text-xl font-medium px-8"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={
                          paymentMethodsHeading.phoneNumber as string
                        }
                        className="h-[75px] text-xl font-medium px-8"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full h-[75px] text-xl font-medium px-8">
                          <SelectValue
                            placeholder={paymentMethodsHeading.state as string}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="state1">State 1</SelectItem>
                          <SelectItem value="state2">State 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="py-7">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={"cod"}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="cod"
                        id="cod"
                        className="text-white border-white"
                      />
                      <Label
                        htmlFor="cod"
                        className="text-black text-xl font-medium"
                      >
                        {paymentMethodsHeading.selectionText as string}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="online"
                        id="online"
                        className="text-white border-white"
                      />
                      <Label
                        htmlFor="online"
                        className="text-black text-xl font-medium"
                      >
                        {paymentMethodsHeading.selectionText2 as string}
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-white text-lime-400 rounded-full px-14"
          >
            {paymentMethodsHeading.buttonText as string}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethods;
