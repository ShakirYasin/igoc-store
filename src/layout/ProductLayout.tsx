"use client";

import HeaderListing from "@/components/HeaderListing";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <HeaderListing className="bg-black sticky top-0 left-0 right-0 z-50 flex justify-between items-center" />

      {children}
      <HeaderListing
        isFooter={true}
        className=" sticky top-0 left-0 right-0 z-50 flex justify-between items-center"
      />
    </div>
  );
};

export default ProductLayout;
