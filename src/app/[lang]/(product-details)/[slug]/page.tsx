import ProductDetailComponent from "@/components/ProductDetailComponent";
import React from "react";

const page = ({ params }: { params: { slug: string; lang: string } }) => {
  return <ProductDetailComponent slug={params.slug} lang={params.lang} />;
};

export default page;
