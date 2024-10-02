"use client";

import React, { useState } from "react";
import Image from "next/image";
import StylizedHeading from "./StylizedHeading";
import { Button } from "./ui/button";
interface Product {
  id: string;
  name: string;
  images: string[];
  rating: number;
  price: number;
  discount: number;
}

interface HeroSectionProps {
  product: Product;
}

const HeroSection = ({ product }: HeroSectionProps) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  return (
    <div className="max-w-[1276px] mx-auto py-32">
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-center gap-7">
          <div className="flex flex-col space-y-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
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
            src={selectedImage || product.images[0]}
            alt={product.name}
            width={441}
            height={441}
            className="object-cover rounded-xl"
          />
        </div>
        <div className="py-4">
          <StylizedHeading
            className="text-6xl font-bold inline-flex gap-3 flex-wrap"
            text1={product.name.split(" ")[0]}
            text2={product.name.split(" ")[1]}
            text3={product.name.split(" ")[2]}
            text4={product.name.split(" ")[3]}
          />
          <div className="flex items-center justify-between mt-10 ">
            <div className="flex flex-col justify-between min-h-[131px]">
              <p className="text-black text-3xl font-bold">UNIT SOLD</p>
              <p className="text-3xl font-bold text-lime-400">146,890</p>
            </div>
            <div className="flex flex-col justify-between min-h-[131px]">
              <p className="text-black text-3xl font-bold">
                SATISFIED CUSTOMERS
              </p>
              <p className="text-3xl font-bold text-lime-400">27,571</p>
            </div>
          </div>
          <Button className="bg-lime-400 text-white px-24 py-5 mt-12 rounded-full text-md font-semibold hover:bg-green-600 transition duration-300">
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
