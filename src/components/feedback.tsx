import React from "react";
import { FeedbackCard } from "./FeedbackCard";
import StylizedHeading from "./StylizedHeading";
import { TFeedbackHeading } from "./ProductDetailComponent";
import { ConvertMultilingualToString } from "@/utils/site.utils";
import { Feedback } from "graphql/generated/hooks";

const FeedbackSection = ({
  feedbackSection,
  feebackHeading,
}: {
  feedbackSection: ConvertMultilingualToString<Feedback>[];
  feebackHeading: TFeedbackHeading;
}) => {
  return (
    <div className="py-10 md:py-20 px-10 md:px-0">
      <div className="max-w-screen-xl mx-auto">
        <StylizedHeading
          text1={feebackHeading.text1}
          text2={feebackHeading.text2}
          className="text-3xl md:text-6xl font-bold text-center mt-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {feedbackSection?.map((feedback, index) => (
            <FeedbackCard key={index} feedbackData={feedback} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
