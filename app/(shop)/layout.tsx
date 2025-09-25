import Footer from "@/components/Footer/Footer";
import MainNav from "@/components/Navbar/MainNav";
import MobileNav from "@/components/Navbar/MobileNav";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="font-bai-jamjuree overflow-hidden">
      <MainNav />
      {children}
      <MobileNav />
      <Footer />
    </div>
  );
};

export default layout;
