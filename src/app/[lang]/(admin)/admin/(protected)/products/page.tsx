"use client";

import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import AdminListingFallback from "@/components/fallbacks/AdminListingFallback";
import { LabeledButton } from "@/components/LabeledButton";
import {
  useDeleteAllProductsMutation,
  useDeleteProductByIdMutation,
  useProductsQuery,
  useTogglePublishMutation,
} from "graphql/generated/hooks";
import { Edit, Plus, Trash, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductListingPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { data, isLoading, refetch } = useProductsQuery();
  const { mutate: togglePublish } = useTogglePublishMutation({
    onSuccess: (data) => {
      toast.success(data?.togglePublish?.message as string);
      refetch();
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  const { mutate: deleteProduct } = useDeleteProductByIdMutation({
    onSuccess: () => {
      toast.success("Product deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  const { mutate: deleteAllProducts } = useDeleteAllProductsMutation({
    onSuccess: () => {
      toast.success("All products deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  if (isLoading) {
    <AdminListingFallback />;
  }

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct({ input: { id: productToDelete } });
    } else {
      deleteAllProducts({});
    }
    setIsDeleteModalOpen(false);
  };

  const handleTogglePublish = (id: string) => {
    togglePublish({ input: id });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold text-lime-400">Product Listing</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <LabeledButton
            label="Add a new product"
            variant="default"
            className="bg-transparent text-green-400 hover:text-green-300 hover:bg-transparent w-full sm:w-auto"
            asChild
          >
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Link>
          </LabeledButton>
          <LabeledButton
            label="Delete all products"
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-transparent w-full sm:w-auto"
            onClick={() => {
              setProductToDelete(null);
              setIsDeleteModalOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete All Products
          </LabeledButton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products?.map((product) => (
          <div
            key={product?._id}
            className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700"
          >
            <div className="relative h-48">
              <Image
                src={product?.images?.[0] as string}
                alt={product?.name?.en as string}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 text-lime-400 truncate">
                {product?.name?.en}
              </h3>
              <p className="text-gray-400 mb-3">
                ${product?.price?.toFixed(2)}
              </p>
              <div className="flex justify-between items-center">
                <Link href={`/admin/products/${product?._id}/edit`}>
                  <LabeledButton
                    label="Edit Product"
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-300 p-2"
                  >
                    <Edit className="h-5 w-5" />
                  </LabeledButton>
                </Link>
                {product?.published ? (
                  <LabeledButton
                    label="Unpublish Product"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 p-2"
                    onClick={() => handleTogglePublish(product?._id as string)}
                  >
                    <Upload className="h-5 w-5" />
                  </LabeledButton>
                ) : (
                  <LabeledButton
                    label="Publish Product"
                    variant="ghost"
                    className="text-green-400 hover:text-green-300 p-2"
                    onClick={() => handleTogglePublish(product?._id as string)}
                  >
                    <Upload className="h-5 w-5" />
                  </LabeledButton>
                )}
                <LabeledButton
                  label="Delete Product"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 p-2"
                  onClick={() => {
                    setProductToDelete(product?._id as string);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <Trash className="h-5 w-5" />
                </LabeledButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        description={
          productToDelete
            ? "Are you sure you want to delete this product?"
            : "Are you sure you want to delete all products?"
        }
      />
    </div>
  );
}
