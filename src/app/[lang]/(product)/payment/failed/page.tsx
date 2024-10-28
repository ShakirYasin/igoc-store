import PaymentFailedPage from "@/components/PageClient/PaymentFailedPage";

export default function FailedPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: string };
  searchParams: { orderId: string };
}) {
  return <PaymentFailedPage lang={lang} orderId={searchParams.orderId} />;
}
