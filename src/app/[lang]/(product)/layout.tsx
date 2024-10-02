import ProductLayout from "@/layout/ProductLayout";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductLayout>{children}</ProductLayout>;
}
