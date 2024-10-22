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
import Script from "next/script";
import Image from "next/image";

const ProductPage = ({ lang }: { lang: string }) => {
  const { data, isLoading } = useProductsForPageQuery({ published: true });

  const headings = localizeObject(localizedData.home, lang);
  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1717818722405103');
          fbq('track', 'PageView');
          `}
      </Script>
      <noscript>
        <Image
          height={1}
          width={1}
          alt="fb-pixel"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1717818722405103&ev=PageView&noscript=1"
        />
      </noscript>

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
    </>
  );
};

export default ProductPage;
