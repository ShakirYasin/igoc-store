"use client";

import { FacebookPixel } from "graphql/generated/hooks";
import React, { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
export type FacebookPixelEventData = {
  content_name?: string;
  content_ids?: string[];
  content_type: string;
  value: number;
  currency: string;
  package?: string;
  payment_method?: string;
};

export const trackCustomEvent = (
  eventName: string,
  data?: FacebookPixelEventData
) => {
  if (typeof window !== "undefined") {
    ReactPixel.track(eventName, data);
  }
};

export const eventHandler = (facebookPixel: FacebookPixel, event: string) => {
  switch (event) {
    case "ORDER":
      if (facebookPixel?.settings?.events?.includes("ORDER")) {
        ReactPixel.pageView();
      }
      break;
    case "PURCHASE":
      if (facebookPixel?.settings?.events?.includes("PURCHASE")) {
        ReactPixel.fbq("track", "Purchase");
      }
      break;
  }
};

const FacebookPixelProvider = ({
  facebookPixel,
  event,
  children,
}: {
  facebookPixel: FacebookPixel;
  event: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    // Initialize Facebook Pixel
    if (typeof window !== "undefined" && facebookPixel?.enabled) {
      ReactPixel.init(facebookPixel.settings?.pixelId as string);
      if (facebookPixel.settings?.events?.includes(event)) {
        eventHandler(facebookPixel, event);
      }
    }
  }, [facebookPixel, event]);

  return <>{children}</>;
};

export default FacebookPixelProvider;
