import { localizedData } from "@/constants/locales";
import { localizeObject } from "@/utils/site.utils";
import { useParams } from "next/navigation";
import { GiftItem } from "./GiftItem";
import StylizedHeading from "./StylizedHeading";

// const gifts = [
//   {
//     icon: "/images/icons/freegift1.svg",
//     title: "FREE PENINSULA",
//     subtitle: "SHIPPING COST",
//   },
//   {
//     icon: "/images/icons/freegift3.svg",
//     title: "FREE PAIR",
//     subtitle: "OF GLOVES",
//   },
//   {
//     icon: "/images/icons/freegift2.svg",
//     title: "FREE UNIT OF PESNAI",
//     subtitle: "BY PACKAGE",
//   },
// ];

export type TGiftSection = {
  text: string;
  icon: string;
};
export type TGiftData = {
  heading1: string;
  heading2: string;
  sections: TGiftSection[];
};
const FreeGiftSection = () => {
  const params = useParams();
  const lang = params.lang;
  const gifts = localizeObject(localizedData.gift, lang as string) as TGiftData;

  return (
    <div className="bg-black text-white py-8 px-10 md:px-0">
      <div className="max-w-[1276px] mx-auto">
        <StylizedHeading
          text1={gifts.heading1}
          text2={gifts.heading2}
          isWhiteText
        />
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-60 gap-10 mt-14">
          {gifts.sections.map((gift, index) => (
            <GiftItem key={index} giftData={gift} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeGiftSection;
