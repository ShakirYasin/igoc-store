"use client";

import { Heart, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ConvertMultilingualToString,
  localizeObject,
} from "@/utils/site.utils";
import { ProductPageInfo as OriginalProductPageInfo } from "graphql/generated/hooks";
import "swiper/css";
import "swiper/css/pagination";
import { usePathname, useRouter } from "next/navigation";
import { localizedData } from "@/constants/locales";
import { Button } from "./ui/button";

type ProductPageInfo = ConvertMultilingualToString<OriginalProductPageInfo>;

interface ProductCardProps {
  product: ProductPageInfo;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlistToggle,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toggleWishlist = () => {
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    onWishlistToggle?.(product._id as string, newWishlistState);
  };
  const languagePath = pathname.split("/")[1];
  const handleClick = () => {
    const productPath =
      languagePath && languagePath.length === 2
        ? `/${languagePath}/${product.slug}`
        : `/${product.slug}`;
    router.push(productPath);
  };
  const productText = localizeObject(
    localizedData.productListing,
    languagePath
  );
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden relative pb-4 cursor-pointer">
      <div className="relative px-5 py-6">
        <div className="overflow-hidden">
          <div className="relative w-full h-[300px]">
            <Swiper pagination={true} modules={[Pagination]}>
              {product.images &&
                product.images.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        src={image}
                        alt={`${product.name}`}
                        width={420}
                        height={300}
                        objectFit="cover"
                        className="transition-transform ease-in-out duration-300 hover:scale-110 w-full h-full md:w-[420px] md:h-[300px]"
                        placeholder="blur"
                        blurDataURL="/images/productimage.png"
                        onError={() => {
                          // This will be called if the image fails to load
                          console.error(`Failed to load image: ${image}`);
                        }}
                      />
                    </SwiperSlide>
                  );
                })}
              {/* Add more SwiperSlide components here for additional images */}
            </Swiper>
          </div>
        </div>
        {product.salePrice && (
          <div className="absolute top-8 right-8 z-20 text-black px-2 py-1 text-xs font-bold rounded-full bg-white">
            {Math.round(
              ((Number(product.price) - Number(product.salePrice)) /
                Number(product.price)) *
                100
            )}
            % OFF
          </div>
        )}
        {/* {product.promo && (
          <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded">
            {product.discount}% OFF
          </div>
        )} */}
        <button
          onClick={toggleWishlist}
          className="absolute z-20 top-8 left-8 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "text-red-500 fill-current" : "text-gray-400"
            }`}
          />
        </button>
      </div>
      <div className="px-4">
        <div className="flex items-start justify-between gap-10">
          <h3 className="text-2xl font-bold">{product?.name}</h3>
          <div className="flex items-center my-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">
              {product.avgRating}
            </span>
          </div>
        </div>
        {/* <p className="text-gray-600 mb-4">{product.description}</p> */}
        <div className="flex justify-between items-center py-5">
          <div>
            {product.salePrice ? (
              <>
                <span className="text-xl font-bold text-[#1E282A] mr-2">
                  RM{Number(product.salePrice).toFixed(2)}
                </span>
                <span className="text-lg text-[#1E282A] line-through">
                  RM{Number(product.price).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-[#1E282A]">
                RM{Number(product.price).toFixed(2)}
              </span>
            )}
          </div>
          <Button
            className="bg-[#B9DF01] text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-lime-500 transition-colors"
            onClick={handleClick}
          >
            {productText?.buttonText as string}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
