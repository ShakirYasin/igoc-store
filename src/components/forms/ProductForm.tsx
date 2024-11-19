"use client";

import { productInitialValues } from "@/constants/initialValues";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProductInput,
  UpdateProductInput,
  useCreateProductMutation,
  useUpdateProductByIdMutation,
} from "graphql/generated/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormAccordion from "./FormAccordion";
import { ProductFormValues, productSchema } from "./productSchema";
import BasicInfoSection from "./sections/BasicInfoSection";

import FAQsSection from "./sections/FAQsSection";
import SectionsSection from "./sections/SectionsSection";

import FacebookPixelSection from "./sections/FacebookPixelSection";
import FeedbackSection from "./sections/FeedbackSection";
import ImagesSection from "./sections/ImagesSection";
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
  const [isKeyboardSave, setIsKeyboardSave] = useState(false);

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
      if (!isKeyboardSave) {
        toast.success("Product updated successfully");
        router.push(`/admin`);
      } else {
        toast.success("Product saved");
        setIsKeyboardSave(false);
      }
    },
    onError: (error) => {
      toast.error((error as Error).message);
      setIsKeyboardSave(false);
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

  const onSubmit = useCallback(
    (data: ProductFormValues) => {
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
    },
    [createProduct, updateProduct, type]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        setIsKeyboardSave(true);
        form.handleSubmit(onSubmit)();
      }
    };
    if (type === "update") {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (type === "update") {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [form, type, onSubmit]);

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
