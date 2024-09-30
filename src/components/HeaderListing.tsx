import Image from "next/image";
import LanguageSelectInput from "./LanguageSelectInput";

const HeaderListing = ({ className = "" }) => {
  return (
    <div className={`${className} flex items-center justify-between px-4`}>
      <div className="flex-1"></div>
      <Image
        className="mx-auto"
        src={"/assets/images/igoclogo.png"}
        alt="logo"
        width={227}
        height={100}
      />
      <div className="flex-1 flex justify-end">
        <LanguageSelectInput />
      </div>
    </div>
  );
};

export default HeaderListing;
