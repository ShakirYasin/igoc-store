"use client";

import { localizedData } from "@/constants/locales";
import FacebookPixelProvider, {
  trackPurchase,
} from "@/provider/FacebookPixelProvider";
import { localizeObject } from "@/utils/site.utils";
import dayjs from "dayjs";
import { FacebookPixel, useOrderByIdQuery } from "graphql/generated/hooks";
import { CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Fallback from "../fallbacks/Fallback";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function ThankYouPage({
  lang,
  orderId,
}: {
  lang: string;
  orderId: string;
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [confettiRunning, setConfettiRunning] = useState(true);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });

    const timer = setTimeout(() => setConfettiRunning(false), 10000); // Run for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const pageMetaData = localizeObject(localizedData.thankyouPage, lang);
  const { data: order, isLoading } = useOrderByIdQuery(
    { id: orderId },
    { enabled: !!orderId }
  );

  useEffect(() => {
    if (
      order?.orderById &&
      order.orderById?.productId?.facebookPixel?.enabled &&
      order.orderById?.productId?.facebookPixel?.settings?.events?.includes(
        "PURCHASE"
      )
    ) {
      trackPurchase({
        content_name: order.orderById?.productId?.name?.en as string,
        content_ids: [order.orderById.productId?._id as string],
        content_type: "product",
        value: order.orderById.orderPrice as number,
        currency: "MYR",
        order_id: order.orderById._id as string,
        package: order.orderById.packageId as string,
        payment_method: order.orderById.paymentOption as string,
      });
    }
  }, [order]);

  if (isLoading) {
    return <Fallback text="Success" />;
  }

  return (
    <FacebookPixelProvider
      facebookPixel={
        order?.orderById?.productId?.facebookPixel as FacebookPixel
      }
    >
      <div className="min-h-screen bg-white">
        {confettiRunning && (
          <ReactConfetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={200}
          />
        )}

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-[#9ACD32] mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              {pageMetaData.title as string}
            </h1>
            <p className="text-xl mb-8">{pageMetaData.description as string}</p>
            <div className="bg-gray-100  rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {pageMetaData.heading1 as string}
              </h2>
              <div className="grid grid-cols-1  gap-4 px-28 ">
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
            <Link
              href="/"
              className="inline-block bg-[#9ACD32] text-white font-bold py-2 px-6 rounded-full hover:bg-[#8BBB2A] transition duration-300"
            >
              {pageMetaData.buttonText as string}
            </Link>
          </div>
        </main>
      </div>
    </FacebookPixelProvider>
  );
}
