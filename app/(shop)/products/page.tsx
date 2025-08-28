import AdsBanner from "@/components/share/AdsBanner/AdsBanner";
import img from "@/app/assets/cover5.png";
import CustomBreadCrumb from "@/components/share/CustomBreadCrumb/CustomBreadCrumb";

const page = () => {
  const image = [img];
  return (
    <div className="w-full h-[1200px] container mx-auto">
      <div className="">
        <AdsBanner images={image} />
      </div>
      <CustomBreadCrumb />
    </div>
  );
};

export default page;
