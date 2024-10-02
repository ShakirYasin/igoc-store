import { MultilingualString } from "graphql/generated/hooks";




// interface LanguageObject {
//   ms?: string;
//   en?: string;
// }
export type ConvertMultilingualToString<T> = T extends MultilingualString
  ? string
  : T extends Array<infer U>
  ? Array<ConvertMultilingualToString<U>>
  : T extends object
  ? { [K in keyof T]: ConvertMultilingualToString<T[K]> }
  : T;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const localizeObject = <T extends Record<string, unknown>>(
  obj: T,
  lang: string
): ConvertMultilingualToString<T> | T => {
  
  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      result[key] = obj[key].map((item) => 
        typeof item === 'object' && item !== null
          ? localizeObject(item, lang)
          : item
      );
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const value = obj[key] ;
      if ("ms" in value && "en" in value) {
        result[key] = (value[lang as keyof typeof value] || value.en);
      } else {
        result[key] = localizeObject(obj[key] as Record<string, unknown>, lang);
      }
    } else {
      result[key] = obj[key];
    }
  }

  return result;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-return */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
