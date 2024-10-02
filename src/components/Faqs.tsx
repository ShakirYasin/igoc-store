import React from "react";
import StylizedHeading from "./StylizedHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "HOW LONG CAN THE EFFECTS BE SEEN?",
    answer: "as early 2-3 days depending on the frequency of spraying",
  },
  {
    question: "HOW LONG DOES 1 BOTTLE LAST?",
    answer:
      "The duration of a bottle depends on usage frequency and application amount.",
  },
  {
    question: "HOW LONG IS THE DELIVERY TIME?",
    answer:
      "Delivery times vary based on your location and chosen shipping method.",
  },
];

const Faqs = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-16">
      <StylizedHeading
        text1="Frequently asked"
        text2="Questions"
        className="text-center text-6xl font-bold mb-8"
      />
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((faq, index) => (
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
