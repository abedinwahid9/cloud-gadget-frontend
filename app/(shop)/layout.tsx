import Footer from "@/components/Footer/Footer";
import MainNav from "@/components/Navbar/MainNav";
import MobileNav from "@/components/Navbar/MobileNav";
import { Bai_Jamjuree } from "next/font/google";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={`${baiJamjuree.className} overflow-hidden min-h-screen`}>
      <MainNav />
      {children}
      <MobileNav />
      <Footer />
    </div>
  );
};

export default layout;
