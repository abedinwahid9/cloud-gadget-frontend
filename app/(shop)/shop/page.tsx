import AdsBanner from "@/components/share/AdsBanner/AdsBanner";
import img from "@/app/assets/cover5.png";
import CustomBreadCrumb from "@/components/share/CustomBreadCrumb/CustomBreadCrumb";
import Shop from "@/components/Shop/Shop";

const page = () => {
  const image = [img];
  return (
    <div className="w-full  container mx-auto ">
      <div className="pt-2">
        <AdsBanner images={image} />
      </div>
      <CustomBreadCrumb />
      <Shop />
    </div>
  );
};

export default page;
