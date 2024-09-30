"use client";

import React, { useState } from "react";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Product {
  id: string;
  name: string;
  images: string[];

  rating: number;

  price: number;
  discount?: number;
  promo?: string;
}

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlistToggle,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    onWishlistToggle?.(product.id, newWishlistState);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden relative pb-4">
      <div className="relative px-5 py-6">
        <div className="overflow-hidden">
          <div className="relative w-full h-[300px]">
            <Swiper pagination={true} modules={[Pagination]}>
              {product.images &&
                product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image}
                      alt={`${product.name} - Image`}
                      width={420}
                      height={300}
                      objectFit="cover"
                      className="transition-transform ease-in-out duration-300 hover:scale-110"
                    />
                  </SwiperSlide>
                ))}
              {/* Add more SwiperSlide components here for additional images */}
            </Swiper>
          </div>
        </div>
        {product.discount && (
          <div className="absolute top-8 right-8 z-20 text-black px-2 py-1 text-xs font-bold rounded-full bg-white">
            {product.discount}% OFF
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
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <div className="flex items-center my-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        {/* <p className="text-gray-600 mb-4">{product.description}</p> */}
        <div className="flex justify-between items-center py-5">
          <span className="text-xl font-bold text-green-600">
            RM{product.price.toFixed(2)}
          </span>
          <button className="bg-lime-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-lime-500 transition-colors">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
