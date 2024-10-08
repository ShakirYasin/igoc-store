import ProtectedLayout from "@/layout/ProtectedLayout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default Layout;
