"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

const ColorPickerFallback: React.FC = () => {
  return (
    <div className="relative">
      <Skeleton className="w-[200px] h-[200px] rounded-md" />
      <div className="mt-2 flex items-center">
        <Skeleton className="w-8 h-8 rounded-full mr-2" />
        <Skeleton className="w-24 h-8 rounded" />
      </div>
    </div>
  );
};

export default ColorPickerFallback;
