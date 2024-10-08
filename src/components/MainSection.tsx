import React from "react";
import Image from "next/image";
import StylizedHeading from "./StylizedHeading";
import { ConvertMultilingualToString } from "@/utils/site.utils";
import { Section } from "graphql/generated/hooks";

// interface SectionData {
//   heading: {
//     text1: string;
//     text2: string;
//   };
//   title?: string; // Make title optional
//   description: string;
//   images: Array<{
//     src: string;
//     alt: string;
//   }>;
// }

// const sectionData: SectionData[] = [
//   {
//     heading: {
//       text1: "WHY YOU SHOULD",
//       text2: "GRAB PESNAI?",
//     },
//     title: "Eradicate To The Nest",
//     description:
//       "Formulated from special imported ingredients from Germany, the PESNAI formula was created to be SYSTEMIC. Termites that are affected by PESNAI spray will permeate and return to the nest, indirectly other termites will be eliminated when they come into contact with each other.",
//     images: [
//       { src: "/images/before.png", alt: "Before using PESNAI" },
//       { src: "/images/after.png", alt: "After using PESNAI" },
//     ],
//   },
//   {
//     heading: {
//       text1: "SUITABLE FOR",
//       text2: "INSECTS ON PLANTS",
//     },
//     title:
//       "Can be used on various types of termites, weaver ant and tree insects without damaging the plant.",
//     description:
//       "Formulated from special imported ingredients from Germany, the PESNAI formula was created to be SYSTEMIC. Termites that are affected by PESNAI spray will permeate and return to the nest, indirectly other termites will be eliminated when they come into contact with each other.",
//     images: [
//       { src: "/images/mud.png", alt: "White Ants" },
//       { src: "/images/wooden.png", alt: "Weaver Ants" },
//     ],
//   },
//   {
//     heading: {
//       text1: "ODORLESS AND",
//       text2: "SAFE TO USE",
//     },

//     description:
//       "Made from organic ingredients that are safe for household use. There is no unpleasant smell and it is harmless to animals and plants.",
//     images: [{ src: "/images/fullimage.png", alt: "Safe to use" }],
//   },
//   {
//     heading: {
//       text1: "NON-STICK",
//       text2: "LIQUID TYPE",
//     },

//     description:
//       "Water-based formula makes PESNAI quickly absorb on the spray subject and is not sticky or greasy.",
//     images: [
//       {
//         src: "/images/pesnai.png",
//         alt: "pesnai",
//       },
//       { src: "/images/oilbased.png", alt: "Liquid Type" },
//     ],
//   },
// ];

const MainSection = ({
  sectionData,
}: {
  sectionData: ConvertMultilingualToString<Section>[];
}) => {
  return (
    <>
      {sectionData?.map((section, index) => (
        <div
          key={index}
          className={` pt-16 px-10 md:px-0   ${
            index === sectionData.length - 1 ? "pb-20" : ""
          } `}
          style={{
            backgroundColor: section?.sectionColor
              ? section?.sectionColor
              : "white",
          }}
        >
          <div className="  max-w-[1276px] mx-auto">
            <StylizedHeading
              text1={(() => {
                const words = section?.heading?.split(" ") || [];
                const midpoint = Math.ceil(words.length / 2);
                return words.slice(0, midpoint).join(" ");
              })()}
              text2={(() => {
                const words = section.heading?.split(" ") || [];
                const midpoint = Math.ceil(words.length / 2);
                return words.slice(midpoint).join(" ");
              })()}
              className="text-4xl font-bold mb-8 text-white"
              isWhiteText={true}
            />
            <h3 className="text-2xl font-semibold mb-4 text-white">
              {section.subheading}
            </h3>
            <p className="text-white mb-6">{section.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              {section?.images?.map((image, i) => (
                <div
                  key={i}
                  className={`${
                    section?.images?.length === 1 ? "md:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`image ${i + 1}`}
                    width={section?.images?.length === 1 ? 1200 : 577}
                    height={section?.images?.length === 1 ? 400 : 400}
                    objectFit="cover"
                    className="rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MainSection;
