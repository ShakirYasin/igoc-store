import { Skeleton } from "@/components/ui/skeleton";

const ProductsLoading = () => {
  return (
    <>
      {[...Array(9)].map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-48 w-full bg-[#b6b6b6]" />
          <Skeleton className="h-4 w-3/4 bg-[#b6b6b6]" />
          <Skeleton className="h-4 w-1/2 bg-[#b6b6b6]" />
        </div>
      ))}
    </>
  );
};

export default ProductsLoading;
