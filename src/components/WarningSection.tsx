import Image from "next/image";
import React from "react";

const WarningSection = () => {
  return (
    <div className="max-w-[1276px] mx-auto py-20">
      <h2 className="text-6xl font-bold mb-4">WARNING/REMINDER</h2>
      <p className="mt-5">
        Water-based formula makes PESNAI quickly absorb on the spray subject and
        is not sticky or greasy.
      </p>
      <div className="flex items-start gap-10 mt-6">
        <Image
          src="/assets/images/warningimage.png"
          alt="warning"
          width={215}
          height={191}
        />
        <div className="flex-1 flex flex-col justify-between text-[#ED1E24] gap-7">
          <p className="font-bold text-2xl">KEEP OUT OF REACH OF CHILDREN.</p>
          <p className="font-bold text-2xl">
            IF IT CONTACTS THE SKIN AND BURNS OR THE BODY HAS PAIN, RINSE WITH
            PLAIN WATER ONLY.
          </p>
          <p className="font-bold text-2xl">
            AVOID CONTACT WITH EYES AND MOUTH.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningSection;
