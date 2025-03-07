import { MultilingualString } from "graphql/generated/hooks";
import * as z from "zod";

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
        typeof item === "object" && item !== null
          ? localizeObject(item, lang)
          : item
      );
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const value = obj[key];
      if ("ms" in value && "en" in value) {
        result[key] = value[lang as keyof typeof value] || value.en;
      } else {
        result[key] = localizeObject(obj[key] as Record<string, unknown>, lang);
      }
    } else {
      result[key] = obj[key];
    }
  }

  return result;
};

export async function sha256Hash(str?: string): Promise<string | undefined> {
  if (!str) return;
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getBrowserCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function setBrowserCookie(
  name: string,
  value: string,
  days: number
): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export const phoneNumberSchema = z
  .string()
  .transform((val) => val || undefined)
  .optional()
  .refine(
    (val): val is string => {
      if (!val) return true; // Allow undefined/empty since it's optional

      // Matches Malaysian phone numbers:
      // - Starts with 01 (mobile) or 03/04/05/06/07/08/09 (landline)
      // - Followed by 7-9 digits
      // - Optional spaces or dashes between numbers
      const malaysianPhoneRegex = /^(0[1-9][0-9][-\s]?[0-9]{6,8})$/;
      const cleanNumber = val.replace(/[\s-]/g, "");
      return malaysianPhoneRegex.test(cleanNumber);
    },
    {
      message:
        "Invalid phone number format. Only Malaysian phone numbers are allowed.",
    }
  );

export const postcodeSchema = z
  .string()
  .transform((val) => val || undefined)
  .refine(
    (val): val is string => {
      if (!val) return false; // Postcode is required
      
      // Malaysian postcodes are 5 digits
      const malaysianPostcodeRegex = /^(0[1-9]|[1-9][0-9])\d{3}$/;
      return malaysianPostcodeRegex.test(val);
    },
    {
      message: "Invalid postcode format. Enter correct 5 digitsMalaysian postcode",
    }
  );
