import ErrorComponent from "@/components/ErrorComponent";
import { localizedData } from "@/constants/locales";
import { localizeObject } from "@/utils/site.utils";
import { Metadata } from "next";

import { redirect } from "next/navigation";

type Props = {
  searchParams: { reason: string };
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang;

  const pageMetaData = localizeObject(localizedData.paymentError, lang);

  return {
    title: pageMetaData.title as string,
    description: pageMetaData.description as string,
  };
}

export default async function PaymentErrorPage({
  searchParams,
  params,
}: Props) {
  if (!searchParams.reason) {
    redirect("/");
  }

  const lang = params.lang;
  const reason = searchParams.reason as keyof typeof pageMetaData;
  const pageMetaData = localizeObject(localizedData.paymentError, lang);

  return (
    <main className="min-h-screen bg-gray-50">
      <ErrorComponent
        title={pageMetaData.title as string}
        message={pageMetaData[reason] as string}
        backToHome={pageMetaData.buttonText as string}
      />
    </main>
  );
}
