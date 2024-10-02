import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/images/igoclogo.png"
            alt="IMAGE MARKETING"
            width={227}
            height={100}
          />
        </div>
        <div className="hidden md:block text-6xl font-bold">FLASH SALE!</div>
        <div className="flex items-center space-x-4">
          {isSearchVisible ? (
            <div className="flex items-center bg-gray-800 rounded-full transition-all duration-300 ease-in-out">
              <Input
                type="search"
                placeholder="Search..."
                className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 w-full md:w-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400"
                onClick={toggleSearch}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button className="bg-limeGreen hover:bg-limeGreen text-black font-semibold">
            SHOP NOW
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
