import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

interface FormAccordionProps {
  openSections: string[];
  setOpenSections: (sections: string[]) => void;
  sections: {
    value: string;
    title: string;
    content: ReactNode;
  }[];
}

const FormAccordion = ({
  openSections,
  setOpenSections,
  sections,
}: FormAccordionProps) => {
  return (
    <Accordion
      type="multiple"
      className="w-full"
      value={openSections}
      onValueChange={setOpenSections}
    >
      {sections.map((section) => (
        <AccordionItem key={section.value} value={section.value}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>{section.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FormAccordion;
