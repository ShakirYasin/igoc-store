import Image from "next/image";
import React from "react";
import { TGiftSection } from "./FreeGiftSection";

interface GiftItemProps {
  giftData: TGiftSection;
}

export const GiftItem: React.FC<GiftItemProps> = ({ giftData }) => {
  return (
    <div className="text-center">
      <Image
        src={giftData.icon}
        alt={giftData.text}
        width={173}
        height={103}
        className="mx-auto mb-4 h-[103px] w-[173px]"
      />
      <h3 className="font-bold text-2xl">{giftData.text}</h3>
    </div>
  );
};
