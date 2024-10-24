import React from "react";
import { Spinner } from "../ui/spinner";

const Fallback: React.FC<{ text?: string }> = ({ text = "Admin Panel" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="relative">
        <div className="absolute inset-0 bg-lime-500 blur-xl opacity-20 animate-pulse"></div>
        <Spinner size="lg" className="text-lime-500 relative z-10" />
      </div>
      <p className="mt-6 text-xl font-bold text-lime-500 animate-pulse">
        Loading {text} ...
      </p>
      <div className="mt-8 w-16 h-1 bg-lime-500 rounded-full"></div>
    </div>
  );
};

export default Fallback;
