"use client";

import AdminFallback from "@/components/fallbacks/Fallback";
import { Button } from "@/components/ui/button";
import { AUTH_KEY } from "@/constants/locales";
import { useCurrentUserQuery } from "graphql/generated/hooks";
import {
  Bug,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Settings,
  Shield,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, error, isError } = useCurrentUserQuery();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Products");
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const router = useRouter();
  const navItems = [
    { name: "Products", icon: Shield, link: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, link: "/admin/orders" },
    { name: "Settings", icon: Settings, link: "/admin/settings" },
  ];

  const handleNavItemClick = (item: string, link: string) => {
    setActiveNavItem(item);
    setIsMobileSidebarOpen(false);
    router.push(link);
  };
  if (isLoading) {
    return <AdminFallback />;
  }
  if (isError) {
    if ((error as Error[])?.[0]?.message.includes("Not authorized")) {
      if (localStorage.getItem(AUTH_KEY)) {
        localStorage.removeItem(AUTH_KEY);
      }
      router.push("/admin/login");
    }
    return <AdminFallback />;
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    router.push("/admin/login");
  };
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`
          ${isSidebarCollapsed ? "w-20" : "w-64"} 
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed left-0 top-0 bottom-0 z-50 
          transition-all duration-300 ease-in-out 
          bg-gray-800
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {!isSidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <Bug className="h-8 w-8 text-lime-400" />
                <span className="text-xl font-bold text-lime-400">
                  IGOC Marketing
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:flex hidden text-lime-400 hover:bg-gray-700 transition-colors duration-200"
              onClick={toggleSidebar}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavItemClick(item.name, item.link)}
                    className={`
                      flex items-center space-x-2 w-full text-left
                      ${isSidebarCollapsed ? "justify-center" : ""}
                      ${
                        activeNavItem === item.name
                          ? "text-lime-400 bg-gray-700"
                          : "text-gray-300 hover:text-lime-400 hover:bg-gray-700"
                      }
                      rounded-md p-2 transition-all duration-200 ease-in-out
                      transform hover:scale-105
                    `}
                  >
                    <item.icon
                      className={`h-5 w-5 ${
                        activeNavItem === item.name ? "animate-pulse" : ""
                      }`}
                    />
                    {!isSidebarCollapsed && <span>{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Header */}
        <header className="bg-gray-800 shadow-md p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-lime-400"
                onClick={toggleMobileSidebar}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-2xl font-bold text-lime-400">
                IGOC Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-lime-500 transition-colors duration-200">
                    <span className="text-sm font-medium text-black">AA</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 bg-gray-800 border-gray-700"
                >
                  <DropdownMenuItem
                    onClick={() => setIsChangePasswordOpen(true)}
                    className="text-gray-200 focus:text-lime-400 focus:bg-gray-700 cursor-pointer"
                  >
                    Change Password
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {isChangePasswordOpen && (
                <ChangePasswordModal
                  isOpen={isChangePasswordOpen}
                  onClose={() => setIsChangePasswordOpen(false)}
                />
              )}

              <div
                onClick={handleLogout}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <LogOut className="transition-transform duration-200 group-hover:scale-110 group-hover:text-lime-400" />
                <span className="hidden sm:inline-block transition-colors duration-200 group-hover:text-lime-400">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
