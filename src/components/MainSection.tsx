import React from "react";
import Image from "next/image";
import StylizedHeading from "./StylizedHeading";

interface SectionData {
  heading: {
    text1: string;
    text2: string;
  };
  title?: string; // Make title optional
  description: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
}

const sectionData: SectionData[] = [
  {
    heading: {
      text1: "WHY YOU SHOULD",
      text2: "GRAB PESNAI?",
    },
    title: "Eradicate To The Nest",
    description:
      "Formulated from special imported ingredients from Germany, the PESNAI formula was created to be SYSTEMIC. Termites that are affected by PESNAI spray will permeate and return to the nest, indirectly other termites will be eliminated when they come into contact with each other.",
    images: [
      { src: "/assets/images/before.png", alt: "Before using PESNAI" },
      { src: "/assets/images/after.png", alt: "After using PESNAI" },
    ],
  },
  {
    heading: {
      text1: "SUITABLE FOR",
      text2: "INSECTS ON PLANTS",
    },
    title:
      "Can be used on various types of termites, weaver ant and tree insects without damaging the plant.",
    description:
      "Formulated from special imported ingredients from Germany, the PESNAI formula was created to be SYSTEMIC. Termites that are affected by PESNAI spray will permeate and return to the nest, indirectly other termites will be eliminated when they come into contact with each other.",
    images: [
      { src: "/assets/images/image1.png", alt: "White Ants" },
      { src: "/assets/images/image2.png", alt: "Weaver Ants" },
    ],
  },
  {
    heading: {
      text1: "ODORLESS AND",
      text2: "SAFE TO USE",
    },

    description:
      "Made from organic ingredients that are safe for household use. There is no unpleasant smell and it is harmless to animals and plants.",
    images: [{ src: "/assets/images/fullimage.png", alt: "Safe to use" }],
  },
  {
    heading: {
      text1: "NON-STICK",
      text2: "LIQUID TYPE",
    },

    description:
      "Water-based formula makes PESNAI quickly absorb on the spray subject and is not sticky or greasy.",
    images: [
      {
        src: "/assets/images/image3.png",
        alt: "PESNAI Water-Based",
      },
      { src: "/assets/images/image4.png", alt: "Liquid Type" },
    ],
  },
];

const MainSection = () => {
  return (
    <div className="bg-[#1E282A] py-20 max-w-[1920px] mx-auto">
      <div className="max-w-[1276px] mx-auto">
        {sectionData.map((section, index) => (
          <div key={index} className="mb-20">
            <StylizedHeading
              text1={section.heading.text1}
              text2={section.heading.text2}
              className="text-4xl font-bold mb-8 text-white"
              isWhiteText={true}
            />
            <h3 className="text-2xl font-semibold mb-4 text-white">
              {section.title}
            </h3>
            <p className="text-white mb-6">{section.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#1E282A]">
              {section.images.map((image, i) => (
                <div
                  key={i}
                  className={`${
                    section.images.length === 1 ? "md:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={section.images.length === 1 ? 1200 : 577}
                    height={section.images.length === 1 ? 400 : 400}
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
        ))}
      </div>
    </div>
  );
};

export default MainSection;
