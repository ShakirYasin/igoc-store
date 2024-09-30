"use client";

import { demoProducts } from "@/constants/demo";
import { getLocalizedHeading } from "@/utils/site.utils";
import { useProductsQuery } from "graphql/generated/hooks";
import ProductCard from "../ProductCard";

const ProductPage = ({ lang }: { lang: string }) => {
  const { data, isLoading } = useProductsQuery();
  const heading = getLocalizedHeading(lang);
  return (
    <div className="max-w-[1440px] mx-auto bg-background py-24">
      <h1
        className={`text-center text-6xl ${
          lang === "ms" ? "max-w-[770px]" : "max-w-[870px]"
        }  mx-auto font-semibold leading-tight`}
      >
        <span className="text-black "> {heading.text1}</span>
        <span className="text-lime-400"> {heading.text2}</span>
        <span className="text-lime-400"> {heading.text3}</span>
        <span className="text-black"> {heading.text4}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
        {demoProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
