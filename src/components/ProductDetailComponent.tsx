"use client";

import {
  Faq,
  Feedback,
  Product,
  Section,
  useProductByIdQuery,
  useProductBySlugQuery,
} from "graphql/generated/hooks";
import Faqs, { TFAQHeading } from "./Faqs";
import FeedbackSection from "./feedback";
import FreeGiftSection from "./FreeGiftSection";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";
import PaymentMethods from "./PaymentMethods";
import WarningSection from "./WarningSection";
import {
  ConvertMultilingualToString,
  localizeObject,
} from "@/utils/site.utils";
import { localizedData } from "@/constants/locales";

export type TFeedbackHeading = {
  text1: string;
  text2: string;
};
const ProductDetailComponent = ({
  slug,
  lang,
}: {
  slug: string;
  lang: string;
}) => {
  const { data } = useProductBySlugQuery({
    slug,
  });
  const productData = localizeObject(
    data?.productBySlug as Product,
    lang
  ) as ConvertMultilingualToString<Product>;

  const sectionData = productData?.sections?.filter(
    (section) => section.type === "NORMAL"
  );
  const warningSection = productData?.sections?.filter(
    (section) => section.type === "WARNING"
  );
  const faqSection = productData?.faqs;
  const feedbackSection = productData?.feedback;
  const feebackHeading = localizeObject(
    localizedData.feedback,
    lang
  ) as TFeedbackHeading;
  return (
    <>
      <HeroSection product={productData} />

      <MainSection
        sectionData={sectionData as ConvertMultilingualToString<Section>[]}
      />
      {warningSection?.[0] && (
        <WarningSection
          warningSection={
            warningSection?.[0] as ConvertMultilingualToString<Section>
          }
        />
      )}
      <FreeGiftSection />
      <FeedbackSection
        feedbackSection={
          feedbackSection as ConvertMultilingualToString<Feedback>[]
        }
        feebackHeading={feebackHeading}
      />
      <PaymentMethods />
      <Faqs
        faqSection={faqSection as ConvertMultilingualToString<Faq>[]}
        faqHeading={localizeObject(localizedData.faq, lang) as TFAQHeading}
      />
    </>
  );
};

export default ProductDetailComponent;
