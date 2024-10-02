import ProductDetailComponent from "@/components/ProductDetailComponent";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  return <ProductDetailComponent slug={params.slug} />;
};

export default page;
