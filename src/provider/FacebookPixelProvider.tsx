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

export type FacebookPixelPurchaseData = {
  content_name?: string;
  content_ids?: string[];
  content_type: "product";
  value: number;
  currency: string;
  order_id?: string;
  package?: string;
  payment_method?: string;
  fbc: string | null;
  fbp: string | null;
  user_data?: FacebookPixelUserData;
};

export type FacebookPixelUserData = {
  client_ip_address: null;
  client_user_agent: string;
  country: string;
  ph: string | undefined;
  zp: string | undefined;
  fn: string | undefined;
  ct: string | undefined;
  st: string | undefined;
};

export const trackPurchase = (data: FacebookPixelPurchaseData) => {
  if (typeof window !== "undefined") {
    ReactPixel.track("Purchase", data);
  }
};

export const trackInitiateCheckout = (
  data: Omit<FacebookPixelPurchaseData, "order_id">
) => {
  if (typeof window !== "undefined") {
    ReactPixel.track("InitiateCheckout", data);
  }
};

const FacebookPixelProvider = ({
  facebookPixel,

  children,
}: {
  facebookPixel: FacebookPixel;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (window && typeof window !== "undefined" && facebookPixel?.enabled) {
      ReactPixel.init(facebookPixel.settings?.pixelId as string);
      ReactPixel.pageView();
    }
  }, [facebookPixel]);

  return <>{children}</>;
};

export default FacebookPixelProvider;
