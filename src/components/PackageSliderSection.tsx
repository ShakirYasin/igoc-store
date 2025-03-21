import { localizedData } from "@/constants/locales";
import { localizeObject } from "@/utils/site.utils";
import { Package } from "graphql/generated/hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const PackageSliderSection: React.FC<{
  packages: Package[];
  color: string;
}> = ({ packages, color }) => {
  const params = useParams();
  const lang = params.lang as string;

  return (
    <div
      className="px-4 md:px-0 py-16 md:py-24"
      style={{ backgroundColor: color ? color : "white" }}
    >
      <div className="max-w-[1276px] mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">
          {localizeObject(localizedData.metadata.packageSlider, lang).heading as string}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {packages?.map((pkg, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="aspect-square relative overflow-hidden rounded-t-xl">
                <Image
                  src={pkg.image as string}
                  alt={pkg.name as string}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                  {pkg.name as string}
                </h3>
                <p className="text-base md:text-lg text-gray-600 mb-4 line-through">
                  {pkg.description as string}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  RM{pkg.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageSliderSection;
