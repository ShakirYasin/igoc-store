"use client";

import { localizedData } from "@/constants/locales";
import { localizeObject } from "@/utils/site.utils";
import dayjs from "dayjs";
import { useOrderByIdQuery } from "graphql/generated/hooks";
import { XCircle } from "lucide-react";
import Link from "next/link";
import Fallback from "../fallbacks/Fallback";

export default function PaymentFailedPage({
  lang,
  orderId,
}: {
  lang: string;
  orderId: string;
}) {
  const pageMetaData = localizeObject(localizedData.paymentFailed, lang);
  const { data: order, isLoading } = useOrderByIdQuery(
    { id: orderId },
    { enabled: !!orderId }
  );

  if (isLoading) {
    return <Fallback text="Loading" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            {pageMetaData.title as string}
          </h1>
          <p className="text-xl mb-8">{pageMetaData.description as string}</p>
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {pageMetaData.heading1 as string}
            </h2>
            <div className="grid grid-cols-1 gap-4 px-28">
              <div className="flex justify-between">
                <p>
                  <strong>{pageMetaData.heading2 as string}</strong>
                </p>
                <p>#{order?.orderById?._id}</p>
              </div>
              <div className="flex justify-between">
                <p>
                  <strong>{pageMetaData.date as string}</strong>
                </p>
                <p>
                  {dayjs(order?.orderById?.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  <strong>{pageMetaData.totalHeading as string}</strong>
                </p>
                <p>RM {order?.orderById?.orderPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>
                  <strong>{pageMetaData.paymentOption as string}</strong>
                </p>
                <p>{order?.orderById?.paymentDetails?.status}</p>
              </div>
            </div>
          </div>
          <div className="space-x-4">
            <Link
              href="/"
              className="inline-block bg-gray-500 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-600 transition duration-300"
            >
              {pageMetaData.homeButton as string}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
