"use client";

import ProductForm from "@/components/forms/ProductForm";
import { ProductFormValues } from "@/components/forms/productSchema";
import { useProductByIdQuery } from "graphql/generated/hooks";
import { useParams } from "next/navigation";

export default function UpdateProductPage() {
  const { id } = useParams();

  const { data, isLoading } = useProductByIdQuery({
    productId: id as string,
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }
  const product = data?.product
    ? {
        ...data.product,
        facebookPixel: data.product.facebookPixel ?? {
          enabled: false,
          settings: null,
        },
      }
    : undefined;
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-lime-400 mb-2">Update Product</h2>
      <p className="text-sm text-gray-400 mb-6 flex items-center gap-1">
        Note: Press{" "}
        <span className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">
          {navigator?.userAgent?.toLowerCase().includes("mac") ? "⌘" : "Ctrl"}
        </span>
        <span>+</span>
        <span className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">S</span> to
        save changes
      </p>
      <ProductForm initialData={product as ProductFormValues} type="update" />
    </div>
  );
}
