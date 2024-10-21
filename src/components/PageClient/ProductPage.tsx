"use client";

import { localizedData } from "@/constants/locales";
import {
  ConvertMultilingualToString,
  localizeObject,
} from "@/utils/site.utils";
import {
  ProductPageInfo,
  useProductsForPageQuery,
} from "graphql/generated/hooks";
import ProductsLoading from "../Loading/ProductsLoading";
import ProductCard from "../ProductCard";

const ProductPage = ({ lang }: { lang: string }) => {
  const { data, isLoading } = useProductsForPageQuery({ published: true });

  const headings = localizeObject(localizedData.home, lang);
  return (
    <div className="max-w-[1440px] mx-auto bg-background py-10 md:py-24">
      <h1
        className={`text-center text-3xl md:text-6xl ${
          lang !== "en" ? "max-w-[770px]" : "max-w-[870px]"
        }  mx-auto font-semibold leading-tight`}
      >
        <span className="text-black "> {headings?.text1 as string}</span>
        <span className="text-lime-400"> {headings?.text2 as string}</span>
        <span className="text-lime-400"> {headings?.text3 as string}</span>
        <span className="text-black"> {headings?.text4 as string}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
        {isLoading ? (
          <ProductsLoading />
        ) : (
          data?.productsForPage?.map((product) => {
            const localizedProduct = localizeObject(
              product,
              lang
            ) as ConvertMultilingualToString<ProductPageInfo>;

            return (
              <ProductCard key={product?._id} product={localizedProduct} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductPage;
