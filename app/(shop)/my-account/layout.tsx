import LayoutCom from "@/components/dashboard/(user)/Layout/LayoutCom";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <LayoutCom> {children}</LayoutCom>
    </>
  );
};

export default layout;
