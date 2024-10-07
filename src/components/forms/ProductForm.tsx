"use client";

import { Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DynamicFieldArray from "../DynamicFieldArray";
import ImageUploadField from "../ImageUploadField";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProductInput,
  CustomerInput,
  FeedbackInput,
  UpdateProductByIdInput,
  useCreateProductMutation,
  useUpdateProductByIdMutation,
} from "graphql/generated/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  _id: z.string().optional(),
  name: z.object({
    en: z.string().min(1, "English name is required"),
    ms: z.string().min(1, "Malay name is required"),
  }),
  price: z.number().min(0, "Price must be non-negative"),
  salePrice: z.number().min(0, "Sale price must be non-negative"),
  totalUnits: z.number().min(0, "Total units must be non-negative"),
  images: z.any(),
  sections: z.array(
    z.object({
      type: z.enum(["NORMAL", "WARNING"]),
      heading: z.object({ en: z.string(), ms: z.string() }),
      subheading: z.object({ en: z.string(), ms: z.string() }),
      description: z.object({ en: z.string(), ms: z.string() }),
      images: z.array(z.any()),
      orderIndex: z.number().min(1, "Order index must be non-negative"),
    })
  ),
  faqs: z.array(
    z.object({
      question: z.object({ en: z.string(), ms: z.string() }),
      answer: z.object({ en: z.string(), ms: z.string() }),
    })
  ),
  feedback: z.array(
    z.object({
      rating: z.number().min(1, "Rating must be 1-5").max(5),
      comment: z.string(),
      customer: z.object({
        name: z.string(),
        image: z.any(),
        location: z.string(),
      }),
      isGoogleReview: z.boolean(),
    })
  ),
  slug: z.string().min(1, "Slug is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface IProductFormProps {
  initialData?: ProductFormValues;
  type: "create" | "update";
}
export const initializeValues: ProductFormValues = {
  name: { en: "", ms: "" },
  price: 0,
  salePrice: 0,
  totalUnits: 0,
  images: [],
  sections: [
    {
      type: "NORMAL",
      heading: { en: "", ms: "" },
      subheading: { en: "", ms: "" },
      description: { en: "", ms: "" },
      images: [],
      orderIndex: 0,
    },
  ],
  faqs: [
    {
      question: { en: "", ms: "" },
      answer: { en: "", ms: "" },
    },
  ],
  feedback: [
    {
      rating: 0,
      comment: "",
      customer: {
        name: "",
        image: "",
        location: "",
      } as CustomerInput,
      isGoogleReview: false,
    },
  ] as FeedbackInput[],
  slug: "",
};

const ProductForm = ({
  initialData = initializeValues,
  type,
}: IProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    values: initialData,
  });
  const router = useRouter();
  const { mutate: createProduct } = useCreateProductMutation({
    onSuccess: () => {
      toast.success("Product created successfully");
      router.push(`/admin`);
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });
  const { mutate: updateProduct } = useUpdateProductByIdMutation({
    onSuccess: () => {
      toast.success("Product updated successfully");
      router.push(`/admin`);
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log({ data });
    const { _id, slug, ...payload } = data;

    if (type === "create") {
      createProduct({ input: { ...payload, slug } as CreateProductInput });
    } else if (_id) {
      updateProduct({ input: { data: payload, id: _id } as UpdateProductByIdInput });
    } else {
      toast.error("Cannot update product without an ID");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    onChange={(e) => {
                      onChange(Number(e.target.value));
                    }}
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
                    onChange={(e) => {
                      onChange(Number(e.target.value));
                    }}
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
                    onChange={(e) => {
                      onChange(Number(e.target.value));
                    }}
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
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {field.value.map((image: string, imgIndex: number) => (
                    <div
                      key={imgIndex}
                      className=" flex gap-6 items-center space-x-2 mb-2"
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
                      field.onChange([...field.value, ""]);
                    }}
                    className="mt-2 text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Product Image
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DynamicFieldArray
          name="sections"
          label="Sections"
          form={form}
          fields={[
            {
              name: "type",
              label: "Type",
              type: "select",
              options: ["NORMAL", "WARNING"],
            },
            { name: "orderIndex", label: "Order Index", type: "number" },
            { name: "heading.en", label: "Heading (English)", type: "text" },
            { name: "heading.ms", label: "Heading (Malay)", type: "text" },
            {
              name: "subheading.en",
              label: "Subheading (English)",
              type: "text",
            },
            {
              name: "subheading.ms",
              label: "Subheading (Malay)",
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
            { name: "images", label: "Images", type: "image-array" },
          ]}
        />

        <DynamicFieldArray
          name="faqs"
          label="FAQs"
          form={form}
          fields={[
            {
              name: "question.en",
              label: "Question (English)",
              type: "text",
            },
            { name: "question.ms", label: "Question (Malay)", type: "text" },
            {
              name: "answer.en",
              label: "Answer (English)",
              type: "textarea",
            },
            { name: "answer.ms", label: "Answer (Malay)", type: "textarea" },
          ]}
        />

        <DynamicFieldArray
          name="feedback"
          label="Feedback"
          form={form}
          fields={[
            {
              name: "rating",
              label: "Rating",
              type: "number",
              min: 0,
              max: 5,
              step: 0.1,
            },
            { name: "comment", label: "Comment", type: "text" },
            { name: "customer.name", label: "Customer Name", type: "text" },
            {
              name: "customer.image",
              label: "Customer Image",
              type: "image",
            },
            {
              name: "customer.location",
              label: "Customer Location",
              type: "text",
            },
            {
              name: "isGoogleReview",
              label: "Is Google Review",
              type: "switch",
            },
          ]}
        />

        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          Save Product
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
