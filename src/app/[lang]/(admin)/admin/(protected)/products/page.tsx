"use client";
import ProductForm from "@/components/forms/ProductForm";

export default function UpdateProductPage() {
  // console.log(navigator.userAgent.toString(), "Your Browser");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-lime-400 mb-2">Create Product</h2>
      <p className="text-sm text-gray-400 mb-6 flex items-center gap-1">
        Note: Press{" "}
        <span className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">
          {navigator?.userAgent?.toLowerCase().includes("mac") ? "⌘" : "Ctrl"}{" "}
        </span>
        <span>+</span>
        <span className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">S</span> to
        save changes
      </p>
      <ProductForm type="create" />
    </div>
  );
}
