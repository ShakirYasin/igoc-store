import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ConvertMultilingualToString } from "@/utils/site.utils";
import { Faq } from "graphql/generated/hooks";
import StylizedHeading from "./StylizedHeading";

export type TFAQHeading = {
  text1: string;
  text2: string;
};

const Faqs = ({
  faqSection,
  faqHeading,
}: {
  faqSection: ConvertMultilingualToString<Faq>[];
  faqHeading: TFAQHeading;
}) => {
  return (
    <div className="max-w-screen-xl mx-auto py-10 md:py-20 px-10 md:px-0">
      <StylizedHeading
        text1={faqHeading?.text1}
        text2={faqHeading?.text2}
        className="text-center text-3xl md:text-6xl font-bold mb-8"
      />
      <Accordion type="single" collapsible className="w-full">
        {faqSection?.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-2xl border-b-0"
          >
            <div className="border border-[#D9D9D9] rounded-2xl p-4 mb-5 ">
              <AccordionTrigger className="font-semibold data-[state=open]:font-bold">
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-lime-400">Q:</span>
                  <span className="text-[#5B5B5B] ml-8">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[#5B5B5B] ml-16">
                {faq.answer}
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faqs;
