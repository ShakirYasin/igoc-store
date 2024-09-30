import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-black">
      <Image
        className="mx-auto"
        src={"/assets/images/igoclogo.png"}
        alt="logo"
        width={227}
        height={100}
      />
    </div>
  );
};

export default Footer;
