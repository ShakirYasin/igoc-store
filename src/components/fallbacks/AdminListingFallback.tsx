"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

const AdminListingFallback = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-48" />
        <div className="space-x-2">
          <Skeleton className="h-10 w-40 inline-block" />
          <Skeleton className="h-10 w-48 inline-block" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className=" dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <Skeleton className="w-full h-48" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex space-x-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminListingFallback;
