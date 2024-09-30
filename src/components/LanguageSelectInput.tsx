"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSelectInput() {
  const languages = [
    { value: "en", label: "English" },
    { value: "ms", label: "Malay" },
  ];
  const router = useRouter();

  const handleLanguageChange = (newLanguage: string) => {
    router.push(`/${newLanguage}`);
  };
  const pathname = usePathname();
  const language = pathname.split("/")[1];

  return (
    <Select
      value={language ? language : "en"}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[40px] h-[40px] text-primary bg-transparent border-none rounded-full flex items-center justify-center p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
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
