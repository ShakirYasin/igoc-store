import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faCircleCheck as faCircleCheckRegular,
  faClockRotateLeft as faRotate,
} from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from "./CountdownTimer";
import OrderForm from "./OrderForm";
import Accordion from "./Accordion";

const data = [
  {
    id: 1,
    icon: faTruck,
    title: "penghantaran ke seluruh Malaysia",
    size: "size-16",
  },
  {
    id: 2,
    icon: faCircleCheckRegular,
    title: "BAYARAN DIBUAT WAKTU TERIMA BARANG",
    size: "size-16",
  },
  {
    id: 3,
    icon: faRotate,
    title: "JAMINAN 30 HARI WANG DIKEMBALIKAN",
    size: "size-16",
  },
];

export default function Section2() {
  return (
    <>
      <div className="border-b-[18px] border-[#1f1f1f] mb-8">
        <h1 className="text-white bg-[#1f1f1f] px-6 py-3 text-center font-bold text-2xl uppercase">
          jaminan keselamatan
        </h1>
        <ul className="flex flex-col gap-4 py-2 px-5 max-w-[90%] mx-auto">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex gap-8 items-center justify-center"
            >
              <FontAwesomeIcon
                icon={item.icon}
                style={{ color: "#000000" }}
                className={`${item.size} p-2`}
              />
              <p className="text-md text-black uppercase text-left  font-bold">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-b-[18px] border-t-[18px] border-[#1f1f1f]">
        <h1 className=" text-center font-bold text-2xl text-red-400 py-3 uppercase">
          tak perlu tunggu lagi!{" "}
        </h1>
        <div>
          <p className="text-center leading-normal text-black font-bold text-xl px-1">
            Stop buang masa sental sofa tak hilang kesan! Bertindak sekarang!{" "}
          </p>
          <p className="text-center leading-normal text-black font-bold text-xl px-1 my-4">
            Isi maklumat di bawah untuk buat pembelian sekarang!
          </p>
        </div>
      </div>
      <div>
        <div>
          <CountdownTimer />
          <OrderForm />
          <Accordion />
        </div>
        <div className="bg-[#1f1f1f] px-2 py-3 text-white ">
          <h1 className="font-bold">Disclaimer</h1>
          <p className="mt-3 text-sm">
            Facebook™ or FB is a Registered Trademark of Facebook.com. The site
            is not affiliated with Facebook.com in any way, nor does they
            sponsor or approve any of products. All trademarks mentioned here
            are copyrighted by their respective owners” This site is not part of
            the Facebook website or Facebook Inc. Additionally, this site is NOT
            endorsed by Facebook in any way. FACEBOOK is a trademark of
            FACEBOOK, Inc.
          </p>
        </div>
      </div>
    </>
  );
}
