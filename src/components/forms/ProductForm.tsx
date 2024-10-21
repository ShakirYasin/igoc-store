"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { productSchema, ProductFormValues } from "./productSchema";
import {
  CreateProductInput,
  UpdateProductInput,
  useCreateProductMutation,
  useUpdateProductByIdMutation,
} from "graphql/generated/hooks";
import { productInitialValues } from "@/constants/initialValues";
import FormAccordion from "./FormAccordion";
import BasicInfoSection from "./sections/BasicInfoSection";

import SectionsSection from "./sections/SectionsSection";
import FAQsSection from "./sections/FAQsSection";

import FacebookPixelSection from "./sections/FacebookPixelSection";
import ImagesSection from "./sections/ImagesSection";
import FeedbackSection from "./sections/FeedbackSection";
import PackagesSection from "./sections/PackagesSection";
import SectionColorsSection from "./sections/SectionColorsSection";

interface IProductFormProps {
  initialData?: ProductFormValues;
  type: "create" | "update";
}

const ProductForm = ({
  initialData = productInitialValues,
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

  const [openSections, setOpenSections] = useState<string[]>([
    "basic-info",
    "images",
    "sections",
    "faqs",
    "feedback",
    "packages",
    "section-colors",
    "facebook-pixel",
  ]);

  const onSubmit = (data: ProductFormValues) => {
    const { _id, slug, ...payload } = data;

    if (type === "create") {
      createProduct({ input: { ...payload, slug } as CreateProductInput });
    } else if (_id) {
      updateProduct({
        input: { data: payload as UpdateProductInput, id: _id },
      });
    } else {
      toast.error("Cannot update product without an ID");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormAccordion
          openSections={openSections}
          setOpenSections={setOpenSections}
          sections={[
            {
              value: "basic-info",
              title: "Basic Information",
              content: <BasicInfoSection form={form} type={type} />,
            },
            {
              value: "images",
              title: "Images",
              content: <ImagesSection form={form} />,
            },
            {
              value: "sections",
              title: "Sections",
              content: <SectionsSection form={form} />,
            },
            {
              value: "faqs",
              title: "FAQs",
              content: <FAQsSection form={form} />,
            },
            {
              value: "feedback",
              title: "Feedback",
              content: <FeedbackSection form={form} />,
            },
            {
              value: "packages",
              title: "Packages",
              content: <PackagesSection form={form} />,
            },
            {
              value: "section-colors",
              title: "Section Colors",
              content: <SectionColorsSection form={form} />,
            },
            {
              value: "facebook-pixel",
              title: "Facebook Pixel",
              content: <FacebookPixelSection form={form} />,
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
