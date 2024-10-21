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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-lime-400 mb-6">Update Product</h2>
      <ProductForm
        initialData={data?.product as ProductFormValues}
        type="update"
      />
    </div>
  );
}
