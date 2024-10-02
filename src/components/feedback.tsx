import React from "react";
import { FeedbackCard } from "./FeedbackCard";
import StylizedHeading from "./StylizedHeading";

const Feedback = () => {
  return (
    <div className="py-20">
      <div className="max-w-screen-xl mx-auto">
        <StylizedHeading
          text1="FEED"
          text2="BACK"
          className="text-6xl font-bold text-center mt-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FeedbackCard
            avatar="/assets/images/avatar-feedback.png"
            name="KAK MIDAH, KEDAH"
            comment="DIA SELALU CUKUP PERSIAPAN SAYA SEBELUM KOT BARANG POPOK ATAU DUIT ATAU APA-APA SAJA"
          />
          <FeedbackCard
            avatar="/assets/images/avatar-feedback.png"
            name="PUAN DA, KEMAMAN"
            comment="ALHAMDULILLAH, DUIT BELI SEBELUM KELUAR UNTUK APA-APA SANGAT MEMBANTU"
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
