import { localizedData } from "@/constants/locales";
import { localizeObject } from "@/utils/site.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateOrderInput,
  Package,
  useAllStatesQuery,
  useCreateOrderMutation,
  useGetCitiesByStateQuery,
  useProductBySlugQuery,
} from "graphql/generated/hooks";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

const orderSchema = z.object({
  packageId: z.string().min(1, "Package is required"),
  name: z.string().min(1, "Name is required"),
  postcode: z.string().min(1, "Postcode is required"),
  fullAddress: z.string().min(1, "Full address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  paymentOption: z.enum(["COD", "ONLINE"], {
    required_error: "Payment method is required",
  }),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const PaymentMethods = ({
  packages,
  color,
}: {
  packages: Package[];
  color: string;
}) => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    values: {
      packageId: "",
      name: "",
      postcode: "",
      fullAddress: "",
      phoneNumber: "",
      city: "",
      state: "",
      paymentOption: "COD",
    },
  });
  const params = useParams();
  const { lang, slug } = params as { lang: string; slug: string };
  const paymentMethodsHeading = localizeObject(localizedData.payment, lang);
  const { data: states } = useAllStatesQuery();
  const { data: cities } = useGetCitiesByStateQuery(
    {
      stateName: form.watch("state"),
    },
    { enabled: !!form.getValues("state") }
  );
  const router = useRouter();
  const { mutate } = useCreateOrderMutation({
    onSuccess(data) {
      toast.success("Order created successfully");
      router.replace(`/thank-you?id=${data.createOrder?._id}`);
    },
    onError(error) {
      toast.error((error as Error[])?.[0].message);
    },
  });

  const encodedSlug = decodeURIComponent(slug);

  const { data: product } = useProductBySlugQuery({
    slug: encodedSlug,
  });
  const productData = product?.productBySlug;
  const onSubmit = (data: OrderFormValues) => {
    const orderPrice = productData?.salePrice ?? productData?.price ?? 0;

    // Track the InitiateCheckout event
    // trackCustomEvent("InitiateCheckout", {
    //   content_name: productData?.name,
    //   content_ids: [productData?._id],
    //   content_type: 'product',
    //   value: orderPrice,
    //   currency: 'USD', // Replace with your currency
    //   package: data.packageId,
    //   payment_method: data.paymentOption
    // });

    mutate({
      input: {
        ...data,
        productId: String(productData?._id),
        orderPrice,
      } as CreateOrderInput,
    });
  };

  // const handleTest = (data: OrderFormValues) => {
  //   const orderPrice = productData?.salePrice ?? productData?.price ?? 0;

  //   // Track the InitiateCheckout event
  //   trackCustomEvent("InitiateCheckout", {
  //     content_name: productData?.name,
  //     content_ids: [productData?._id],
  //     content_type: "product",
  //     value: orderPrice,
  //     currency: "USD", // Replace with your currency
  //     package: data.packageId,
  //     payment_method: data.paymentOption,
  //   });

  //   // mutate({
  //   //   input: {
  //   //     ...data,
  //   //     productId: String(productData?._id),
  //   //     orderPrice,
  //   //   } as CreateOrderInput,
  //   // });
  // };

  return (
    <div
      className="py-10 md:py-20 px-10 md:px-0 "
      style={{ backgroundColor: color ? color : "lime" }}
    >
      <div className="max-w-screen-xl mx-auto md:block flex flex-col justify-center">
        <h2 className="text-3xl md:text-6xl font-bold mb-4 text-center">
          <span className="text-white">
            {paymentMethodsHeading.text1 as string}{" "}
          </span>
          <span className="text-black">
            {paymentMethodsHeading.text2 as string}
          </span>
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="packageId"
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
                        {packages?.map((pkg, index) => (
                          <SelectItem key={index} value={pkg._id as string}>
                            {pkg.name as string}
                          </SelectItem>
                        ))}
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
                  name="fullAddress"
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full h-[75px] text-xl font-medium px-8">
                            <SelectValue
                              placeholder={paymentMethodsHeading.city as string}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {cities?.getCitiesByState?.map((city, index) => (
                              <SelectItem
                                key={index}
                                value={city.name as string}
                              >
                                {city.name as string}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                              placeholder={
                                paymentMethodsHeading.state as string
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {states?.allStates?.map((state, index) => (
                              <SelectItem
                                key={index}
                                value={state.name as string}
                              >
                                {state.name as string}
                              </SelectItem>
                            ))}
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
              name="paymentOption"
              render={({ field }) => (
                <FormItem className="py-7">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={"COD"}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="COD"
                          id="cod"
                          className="text-white border-white"
                        />
                        <Label
                          htmlFor="COD"
                          className="text-black text-xl font-medium"
                        >
                          {paymentMethodsHeading.selectionText as string}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="ONLINE"
                          id="online"
                          className="text-white border-white"
                        />
                        <Label
                          htmlFor="ONLINE"
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
            {/* <Button
              type="button"
              className="bg-white text-lime-400 rounded-full px-14"
              onClick={() => handleTest(form.getValues())}
            >
              tesst
            </Button> */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethods;
