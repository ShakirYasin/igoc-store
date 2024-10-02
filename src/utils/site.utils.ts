import { MultilingualString } from "graphql/generated/hooks";

export const getLocalizedHeading = (lang: string) => {
  if (lang === "ms") {
    return {
      text1: "Habis Rosak",
      text2: "Semua Bila",
      text3: "Anai-Anai",
      text4: "Menyerang!",
    };
  }
  return {
    text1: "Everything",
    text2: "Gets Destroyed When",
    text3: "Termites",
    text4: "Attack!",
  };
};

interface LanguageObject {
  ms?: string;
  en?: string;
}
export type ConvertMultilingualToString<T> = T extends MultilingualString
  ? string
  : T extends Array<infer U>
  ? Array<ConvertMultilingualToString<U>>
  : T extends object
  ? { [K in keyof T]: ConvertMultilingualToString<T[K]> }
  : T;

export const localizeObject = <T extends Record<string, any>>(
  obj: T,
  lang: string
): ConvertMultilingualToString<T> | T => {
  const result: T = { ...obj };

  for (const key in result) {
    if (typeof result[key] === "object" && result[key] !== null) {
      const value = result[key] as LanguageObject;
      if ("ms" in value && "en" in value) {
        result[key] = (value[lang as keyof LanguageObject] || value.en) as unknown as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
};
