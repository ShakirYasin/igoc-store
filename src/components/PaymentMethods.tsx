import { localizedData } from "@/constants/locales";

import {
  getBrowserCookie,
  localizeObject,
  phoneNumberSchema,
  sha256Hash,
} from "@/utils/site.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateOrderInput,
  CreateOrderMutation,
  Package,
  Product,
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
import { RadioCardGroup } from "./ui/radio-card-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { trackInitiateCheckout } from "@/provider/FacebookPixelProvider";

const orderSchema = z
  .object({
    packageId: z.string().min(1, "Package is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").optional(),
    postcode: z.string().min(1, "Postcode is required"),
    fullAddress: z.string().min(1, "Full address is required"),
    phoneNumber: phoneNumberSchema,
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    paymentOption: z.enum(["COD", "ONLINE"], {
      required_error: "Payment method is required",
    }),
    shippingRegion: z
      .enum(["WEST", "EAST"], {
        required_error: "Shipping region is required",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentOption === "COD") {
      if (!data.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required for COD orders",
          path: ["email"],
        });
      }
      if (!data.phoneNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number is required for COD orders",
          path: ["phoneNumber"],
        });
      }
    } else if (!data.email && !data.phoneNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either email or phone number is required",
        path: ["email"],
      });
    }
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
      shippingRegion: "WEST",
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
      handlePaymentSuccess(data);
    },
    onError(error) {
      toast.error((error as Error[])?.[0].message);
    },
  });

  const encodedSlug = decodeURIComponent(slug);

  const { data: product } = useProductBySlugQuery({
    slug: encodedSlug,
  });
  const productData = localizeObject(product?.productBySlug as Product, lang);
  const onSubmit = (data: OrderFormValues) => {
    const productPrice =
      productData?.packages?.find((pkg) => pkg._id === data.packageId)?.price ??
      productData?.price ??
      productData?.salePrice ??
      0;
    const shipmentPrice = productData.allowShipment
      ? data.shippingRegion === "EAST"
        ? 15
        : 10
      : 0;
    const orderPrice = productPrice + shipmentPrice;

    mutate({
      input: {
        ...data,
        productId: String(productData?._id),
        orderPrice,
      } as CreateOrderInput,
    });
  };
  const metaData = localizeObject(localizedData.payment, lang);
  const paymentOptions = [
    {
      value: "COD",
      title: metaData.selectionText.cod.heading as string,
      subtitle: metaData.selectionText.cod.subtitle as string,
      badge: "COD",
    },
    {
      value: "ONLINE",
      title: metaData.selectionText.online.heading as string,
      subtitle: metaData.selectionText.online.subtitle as string,
      badge: "Card",
    },
  ];

  const shippingOptions = [
    {
      value: "WEST",
      title: metaData.selectionText.west.heading as string,
      subtitle: metaData.selectionText.west.subtitle as string,
      badge: "RM10",
    },
    {
      value: "EAST",
      title: metaData.selectionText.east.heading as string,
      subtitle: metaData.selectionText.east.subtitle as string,
      badge: "RM15",
    },
  ];

  const handlePaymentSuccess = async (data: CreateOrderMutation) => {
    const { createOrder } = data;
    if (!createOrder) return;

    const { enabled, settings } = productData.facebookPixel ?? {};
    if (enabled && settings?.events?.includes("ORDER")) {
      const fbc = getBrowserCookie("_fbc");
      const fbp = getBrowserCookie("_fbp");
      const hashedData = {
        ph: form.getValues("phoneNumber")
          ? await sha256Hash(form.getValues("phoneNumber"))
          : undefined,
        zp: form.getValues("postcode")
          ? await sha256Hash(form.getValues("postcode"))
          : undefined,
        fn: form.getValues("name")
          ? await sha256Hash(form.getValues("name"))
          : undefined,
        ct: form.getValues("city")
          ? await sha256Hash(form.getValues("city"))
          : undefined,
        st: form.getValues("state")
          ? await sha256Hash(form.getValues("state"))
          : undefined,
      };
      trackInitiateCheckout({
        content_name: productData.name as string,
        content_ids: [productData._id as string],
        content_type: "product",
        value: createOrder.orderPrice as number,
        currency: "MYR",
        package: form.getValues("packageId"),
        payment_method: form.getValues("paymentOption"),
        fbc,
        fbp,
        user_data: {
          ...hashedData,
          client_ip_address: null,
          client_user_agent: navigator.userAgent,
          country: "my",
        },
      });
    }

    toast.success("Order created successfully");

    const redirectPath =
      createOrder.paymentUrl || `/thank-you?id=${createOrder._id}`;
    if (createOrder.paymentUrl) {
      window.location.href = redirectPath;
    } else {
      router.replace(redirectPath);
    }
  };

  return (
    <div
      className="py-6 md:py-20 px-4 md:px-0"
      id="payment-methods"
      style={{ backgroundColor: color || "lime" }}
    >
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl md:text-6xl font-bold text-center mb-6 md:mb-10">
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
                <FormItem className="py-2 md:py-4">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full h-[60px] md:h-[75px] text-lg md:text-xl font-medium px-4 md:px-8">
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
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
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
                          className="h-[60px] md:h-[75px] text-lg md:text-xl font-medium px-4 md:px-8"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={paymentMethodsHeading.email as string}
                          className="h-[60px] md:h-[75px] text-lg md:text-xl font-medium px-4 md:px-8"
                          onChange={(e) =>
                            onChange(e.target.value || undefined)
                          }
                          {...rest}
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
                          className="h-[60px] md:h-[75px] text-lg md:text-xl font-medium px-4 md:px-8"
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
                          <SelectTrigger className="w-full h-[60px] md:h-[75px] text-lg md:text-xl font-medium px-4 md:px-8">
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
                          className="h-[60px] md:h-[75px] text-lg md:text-xl font-medium px-4 md:px-8"
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
                          className="h-[60px] md:h-[75px] text-lg md:text-xl font-medium px-4 md:px-8"
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
                          <SelectTrigger className="w-full h-[60px] md:h-[75px] text-lg md:text-xl font-medium px-4 md:px-8">
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
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 my-6 md:my-12">
              <RadioCardGroup
                name="paymentOption"
                control={form.control}
                label={paymentMethodsHeading.text3 as string}
                options={paymentOptions}
              />

              {!!productData?.allowShipment && (
                <>
                  <div className="hidden md:flex items-stretch">
                    <Separator
                      orientation="vertical"
                      className="mx-4 bg-gray-200"
                    />
                  </div>

                  <RadioCardGroup
                    name="shippingRegion"
                    control={form.control}
                    label={paymentMethodsHeading.text4 as string}
                    options={shippingOptions}
                  />
                </>
              )}
            </div>

            <div className="flex justify-center mt-6 md:mt-0">
              <Button
                type="submit"
                className="w-full md:w-auto bg-lime-500 text-white rounded-full px-8 md:px-14 py-4 md:py-6 text-base md:text-lg font-medium hover:bg-green-600"
              >
                {paymentMethodsHeading.buttonText as string}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethods;
