import Footer from "@/components/Footer/Footer";
import MobileNav from "@/components/Navbar/MobileNav";

import dynamic from "next/dynamic";
const MainNav = dynamic(() => import("@/components/Navbar/MainNav"));

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
