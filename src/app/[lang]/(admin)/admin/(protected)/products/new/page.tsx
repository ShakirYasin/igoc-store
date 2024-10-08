import ProductForm from "@/components/forms/ProductForm";

export default function IGOCAdminPanel() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-lime-400 mb-6">Product Editor</h2>
      <ProductForm type="create" />
    </div>
  );
}
