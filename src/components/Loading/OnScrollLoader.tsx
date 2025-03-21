import { PAGE_SIZE_INCREMENT } from "@/constants/orders.constants";
import { ORDERS_COLORS } from "@/constants/orders.constants";
import React from "react";

const OnScrollLoader = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-16 h-16">
        {/* Outer ring animation */}
        <div
          className={`absolute inset-0 ${ORDERS_COLORS.primary} opacity-20 rounded-full animate-ping`}
        />
        {/* Inner ring animation */}
        <div
          className={`absolute inset-0 ${ORDERS_COLORS.primary} opacity-60 rounded-full animate-pulse`}
        />
        {/* Loading text */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${ORDERS_COLORS.text} text-sm font-medium`}
        >
          Loading
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Fetching next {PAGE_SIZE_INCREMENT} orders...
      </p>
    </div>
  );
};

export default OnScrollLoader;
