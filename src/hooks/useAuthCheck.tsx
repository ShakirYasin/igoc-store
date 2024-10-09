"use client";

import { AUTH_KEY } from "@/constants/locales";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthCheck = (redirectPath: string) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_KEY);
      if (token) {
        router.replace(redirectPath);
      } else {
        setLoading(false);
      }
    }
  }, [router, redirectPath]);

  return { loading };
};
