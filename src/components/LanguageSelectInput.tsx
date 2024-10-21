"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LanguageSelectInput() {
  const languages = [
    { value: "ms", label: "Malay" },
    { value: "en", label: "English" },
  ];
  const router = useRouter();

  const pathname = usePathname();
  const search = useSearchParams().toString();
  const currentLanguage = pathname.split("/")[1] === "en" ? "en" : "ms";

  const handleLanguageChange = (newLanguage: string) => {
    const newPathname = pathname.replace(`${currentLanguage}`, "");
    router.push(`/${newLanguage}${newPathname}?${search}`);
  };

  return (
    <Select
      value={currentLanguage ? currentLanguage : "en"}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[40px] h-[40px] text-primary bg-transparent border-none rounded-full flex items-center justify-center p-0 focus:ring-offset-0">
        <Globe className="h-10 w-10 text-white" />
      </SelectTrigger>
      <SelectContent className="focus-visible:ring-0 focus-visible:ring-offset-0">
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
