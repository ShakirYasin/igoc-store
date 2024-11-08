import { ConvertMultilingualToString } from "@/utils/site.utils";
import { Section } from "graphql/generated/hooks";
import Image from "next/image";
import React from "react";

const WarningSection = ({
  warningSection,
}: {
  warningSection: ConvertMultilingualToString<Section>;
}) => {
  return (
    <div
      className="py-10 md:py-10 px-10 md:px-0"
      style={{
        backgroundColor: warningSection?.sectionColor
          ? warningSection?.sectionColor
          : "whtite",
      }}
    >
      <div className="max-w-[1276px] mx-auto">
        <h2 className="text-3xl md:text-6xl font-bold mb-4  break-words">
          {warningSection.heading}
        </h2>
        <p className="mt-5 text-[#1E282A] text-justify">
          {warningSection?.subheading}
        </p>
        <div className="flex flex-col md:flex-row items-start gap-10 mt-6">
          <Image
            src={warningSection?.images?.[0] as string}
            alt="warning"
            className=""
            width={150}
            height={191}
          />
          <div className="flex-1 flex flex-col justify-between text-[#ED1E24] gap-7">
            {warningSection?.description?.split(".").map((line, index) => (
              <p key={index} className="font-bold text-xl md:text-2xl">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningSection;
