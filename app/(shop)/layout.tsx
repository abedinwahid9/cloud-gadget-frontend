import MainNav from "@/components/Navbar/MainNav";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MainNav />
      {children}
    </>
  );
};

export default layout;
