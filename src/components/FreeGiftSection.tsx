import React from "react";

import { GiftItem } from "./GiftItem";
import StylizedHeading from "./StylizedHeading";

const gifts = [
  {
    icon: "/assets/images/icons/freegift1.svg",
    title: "FREE PENINSULA",
    subtitle: "SHIPPING COST",
  },
  {
    icon: "/assets/images/icons/freegift3.svg",
    title: "FREE PAIR",
    subtitle: "OF GLOVES",
  },
  {
    icon: "/assets/images/icons/freegift2.svg",
    title: "FREE UNIT OF PESNAI",
    subtitle: "BY PACKAGE",
  },
];

const FreeGiftSection = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="max-w-[1276px] mx-auto">
        <StylizedHeading text1="FREE" text2="GIFT" isWhiteText />
        <div className="flex justify-between items-center gap-4 mt-14">
          {gifts.map((gift, index) => (
            <GiftItem
              key={index}
              icon={gift.icon}
              title={gift.title}
              subtitle={gift.subtitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeGiftSection;
