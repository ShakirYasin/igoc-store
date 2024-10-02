import Image from "next/image";
import LanguageSelectInput from "./LanguageSelectInput";

const HeaderListing = ({
  className = "",
  isFooter = false,
}: {
  className?: string;
  isFooter?: boolean;
}) => {
  return (
    <div
      className={`${className} bg-black flex items-center justify-between px-4`}
    >
      <div className="flex-1"></div>
      <Image
        className="mx-auto"
        src={"/images/igoclogo.png"}
        alt="logo"
        width={227}
        height={100}
      />
      <div className="flex-1 flex justify-end">
        {!isFooter && <LanguageSelectInput />}
      </div>
    </div>
  );
};

export default HeaderListing;
