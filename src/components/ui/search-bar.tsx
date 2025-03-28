"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function SearchBar({
  placeholder = "Type anything...",
}: {
  placeholder?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState<string | undefined>(
    searchParams.get("search") ?? ""
  );
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push(
        `${pathname}?${createQueryString({
          search: search || "",
        })}`,
        { scroll: false }
      );
    }, 600);

    return () => clearTimeout(timeoutId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <div className="">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 " />
        <Input
          className="pl-8 text-black transition-all duration-300 ease-in-out w-[150px] rounded-full  h-9 flex items-center justify-center bg-gray-100   md:w-[250px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          placeholder={placeholder}
          type="search"
        />
      </div>
    </div>
  );
}
