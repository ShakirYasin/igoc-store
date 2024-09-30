import HeaderListing from "@/components/HeaderListing";
import ProductCard from "@/components/ProductCard";
import StylizedHeading from "@/components/StylizedHeading";

const products = [
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
  {
    id: "1",
    name: "Bawah lantai penuh sarang anai-anai",
    images: [
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
      "/assets/images/productimage.png",
    ],
    rating: 4.8,

    price: 39.0,
    discount: 20,
  },
];

export default function Home() {
  return (
    <div className="max-w-[1920px] mx-auto">
      <HeaderListing className="bg-black sticky top-0 left-0 right-0 z-50 flex justify-between items-center" />
      <div className="max-w-[1440px] mx-auto bg-background py-24">
        <StylizedHeading
          text1="Habis Rosak"
          text2="Semua Bila"
          text3="Anai-Anai"
          text4="Menyerang!"
          className="text-center text-6xl max-w-[770px] mx-auto font-semibold leading-tight"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <HeaderListing className="bg-black" />
    </div>
  );
}
