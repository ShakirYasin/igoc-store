import ProductPage from "@/components/PageClient/ProductPage";

type Props = {
  params: { lang: string };
};

export default function Home({ params: { lang } }: Props) {
  return <ProductPage lang={lang} />;
}
