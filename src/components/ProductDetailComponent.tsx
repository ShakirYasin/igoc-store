"use client";

import { localizedData } from "@/constants/locales";
import {
  ConvertMultilingualToString,
  localizeObject,
} from "@/utils/site.utils";
import {
  Faq,
  Feedback,
  Package,
  Product,
  Section,
  useProductBySlugQuery,
} from "graphql/generated/hooks";
import Faqs, { TFAQHeading } from "./Faqs";
import FeedbackSection from "./feedback";
import FreeGiftSection from "./FreeGiftSection";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";
import PaymentMethods from "./PaymentMethods";
import WarningSection from "./WarningSection";
import PackageSliderSection from "./PackageSliderSection";

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

  const packages = productData?.packages;
  const colors = productData?.sectionColors;
  return (
    <>
      <HeroSection
        product={productData}
        color={colors?.productSection as string}
      />

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
      <PackageSliderSection
        packages={packages as Package[]}
        color={colors?.packageSection as string}
      />

      <FreeGiftSection color={colors?.freeGiftSection as string} />
      <FeedbackSection
        feedbackSection={
          feedbackSection as ConvertMultilingualToString<Feedback>[]
        }
        feebackHeading={feebackHeading}
        color={colors?.feedbackSection as string}
      />
      <PaymentMethods
        packages={packages as Package[]}
        color={colors?.paymentSection as string}
      />
      <Faqs
        faqSection={faqSection as ConvertMultilingualToString<Faq>[]}
        faqHeading={localizeObject(localizedData.faq, lang) as TFAQHeading}
        color={colors?.faqSection as string}
      />
    </>
  );
};

export default ProductDetailComponent;
