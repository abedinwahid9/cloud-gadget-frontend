import MainNav from "@/components/Navbar/MainNav";
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
    </div>
  );
};

export default layout;
