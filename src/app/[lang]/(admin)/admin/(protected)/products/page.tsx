"use client";

import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import AdminListingFallback from "@/components/fallbacks/AdminListingFallback";
import { Button } from "@/components/ui/button";
import {
  useDeleteAllProductsMutation,
  useDeleteProductByIdMutation,
  useProductsQuery,
} from "graphql/generated/hooks";
import { Edit, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductListingPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { data, isLoading, refetch } = useProductsQuery();

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

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-lime-400">Product Listing</h2>
        <div className="space-x-2">
          <Link href="/admin/products/new">
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => {
              setProductToDelete(null);
              setIsDeleteModalOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete All Products
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products?.map((product) => (
          <div
            key={product?._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={product?.images?.[0] as string}
              alt={product?.name?.en as string}
              width={200}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {product?.name?.en}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Price: ${product?.price}
              </p>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/products/${product?._id}/edit`}
                  className="flex-1"
                >
                  <Button variant="default" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setProductToDelete(product?._id as string);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
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
