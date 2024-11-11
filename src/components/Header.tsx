import { Button } from "@/components/ui/button";
import { localizedData } from "@/constants/locales";
import { localizeObject } from "@/utils/site.utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import LanguageSelectInput from "./LanguageSelectInput";

export default function Header() {
  const { lang } = useParams();
  const router = useRouter();
  const headerData = localizeObject(localizedData.header, lang as string);

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push(lang === "en" ? "/" : `/${lang}`)}
        >
          <Image
            src="/images/igoclogo.png"
            alt="IMAGE MARKETING"
            width={227}
            height={100}
          />
        </div>
        <div className="hidden md:block text-6xl font-bold">
          {headerData.heading as string}
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-limeGreen hover:bg-limeGreen text-black font-semibold">
            {headerData.buttonText as string}
          </Button>
          <Suspense fallback={<div>Loading...</div>}>
            <LanguageSelectInput />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
