"use client";
import React, { useState } from "react";
import {
  Accordion as ShadcnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionData = [
  {
    id: "payment",
    question: "Cara Pembayaran?",
    answer:
      'Kami menawarkan pakej COD – "DAPAT BARANG BARU BAYAR" kepada semua pelanggan. Sila lengkapkan butiran dalam borang pesanan di atas',
  },
  {
    id: "delivery",
    question: "Berapa Lama Barang Sampai?",
    answer: "Kebiasaannya barang akan sampai dalam masa 2 atau 3 hari bekerja",
  },
];

export default function Accordion() {
  const [value, setValue] = useState<string>();

  return (
    <>
      <div className="text-black font-extrabold text-center text-xl capitalize pb-3">
        soalan lazim yang ditanya
      </div>
      <ShadcnAccordion
        type="single"
        collapsible
        className="w-full"
        value={value}
        onValueChange={setValue}
      >
        {AccordionData.map((item) => (
          <AccordionItem value={item.id} key={item.id}>
            <AccordionTrigger className="bg-[#dcdcdc] font-extrabold px-4 mb-3">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="bg-[#dcdcdc] px-4 py-3 mb-3">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </ShadcnAccordion>
    </>
  );
}
