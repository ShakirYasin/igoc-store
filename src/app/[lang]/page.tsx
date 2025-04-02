import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";

const page = () => {
  return (
    <div className="max-w-[440px] mx-auto ">
      <div className="bg-[#1F1F1F] text-white py-1 px-6 uppercase sticky top-0">
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm">PROMOSI</p>
          <h1 className="font-extrabold text-[#ecef5c] shadow-lg text-3xl animate-zoom-in-out">
            KAW
          </h1>
          <p className="font-bold text-sm shadow-lg">Premium high quality</p>
        </div>
        <div className="flex justify-between pb-1 my-1">
          <h4 className="font-bold">Tawaran terhad</h4>
          <div className="flex gap-4 items-center">
            <h1 className="flex items-center gap-2">
              <FaShoppingBag size={32} />
            </h1>
            <button className="bg-white text-black text-base px-2 py-2 uppercase animate-zoom-in-out font-bold rounded-full  animate-zoom">
              Beli sekarang
            </button>
          </div>
        </div>
      </div>
      <Section1 />
      <Section2 />
      <div className="bg-[#4c4a4f]/90 animate-zoom-in-out text-center font-bold text-lg uppercase text-white py-6 sticky bottom-0">
        <button className="uppercase">beli sekarang</button>
      </div>
    </div>
  );
};

export default page;
