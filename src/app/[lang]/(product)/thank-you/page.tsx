import ThankYouPage from "@/components/PageClient/ThankyouPage";

const page = ({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { id: string };
}) => {
  return <ThankYouPage lang={params.lang} orderId={searchParams.id} />;
};

export default page;
