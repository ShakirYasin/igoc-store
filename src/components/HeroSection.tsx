"use client";

import React, { useState } from "react";
import Image from "next/image";
import StylizedHeading from "./StylizedHeading";
import { Button } from "./ui/button";
import {
  ConvertMultilingualToString,
  localizeObject,
} from "@/utils/site.utils";
import { Product } from "graphql/generated/hooks";
import { useParams, useRouter } from "next/navigation";
import { localizedData } from "@/constants/locales";

interface HeroSectionProps {
  product: ConvertMultilingualToString<Product>;
  color: string;
}

const HeroSection = ({ product, color }: HeroSectionProps) => {
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const router = useRouter();
  const { lang } = useParams();
  const heroSectionHeading = localizeObject(localizedData.hero, lang as string);
  return (
    <div
      className="  py-10 md:py-32 px-10 md:px-0"
      style={{ backgroundColor: color ? color : "white" }}
    >
      <div className="max-w-[1276px] mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center md:gap-7 gap-0">
          <div className="flex flex-col space-y-2 max-h-[320px] overflow-y-auto scrollbar-hide">
            {product?.images?.map((image, index) => (
              <div
                key={index}
                className={`relative cursor-pointer ${
                  index >= 4 ? "mt-2" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={109}
                  height={98}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          <Image
            src={selectedImage || product?.images?.[0] || ""}
            alt={product?.name || ""}
            width={441}
            height={441}
            className="object-cover rounded-xl"
          />
        </div>
        <div className="py-4  md:block flex flex-col justify-center">
          <StylizedHeading
            className="md:text-4xl flex md:justify-start  justify-center text-2xl font-bold md:inline-flex gap-3 flex-wrap"
            text1={product?.name?.split(" ")[0] || ""}
            text2={product?.name?.split(" ")[1] || ""}
            text3={product?.name?.split(" ")[2] || ""}
            text4={product?.name?.split(" ")[3] || ""}
          />
          <div className="flex items-center  justify-between mt-10  ">
            <div className="flex flex-col gap-5 min-h-[131px] items-center md:items-start ">
              <p className="text-black text-xl md:text-3xl font-bold md:text-start text-center">
                {heroSectionHeading.text1 as string}
              </p>
              <p className="text-3xl font-bold text-lime-400">
                {product?.unitsSold}
              </p>
            </div>
            <div className="flex flex-col gap-5 min-h-[131px] items-center md:items-start">
              <p className="text-black text-xl md:text-3xl font-bold md:text-start text-center">
                {heroSectionHeading.text2 as string}
              </p>
              <p className="text-3xl font-bold text-lime-400">
                {product?.satisfiedCustomers}
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              router.push(`#payment-methods`);
            }}
            className="bg-lime-400 text-white px-24 py-5 mt-12 rounded-full text-md font-semibold hover:bg-green-600 transition duration-300"
          >
            {heroSectionHeading.buttonText as string}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
