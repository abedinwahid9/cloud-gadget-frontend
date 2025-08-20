import MainNav from "@/components/Navbar/MainNav";
import MobileNav from "@/components/Navbar/MobileNav";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="font-bai-jamjuree">
      <MainNav />
      {children}
      <MobileNav />
    </div>
  );
};

export default layout;
