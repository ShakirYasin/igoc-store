"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LanguageSelectInput() {
  const [language, setLanguage] = useState("en");

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ];

  return (
    <Select value={language} onValueChange={setLanguage}>
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
