import AdsBanner from "@/components/share/AdsBanner/AdsBanner";
import img from "@/app/assets/cover5.png";
import CustomBreadCrumb from "@/components/share/CustomBreadCrumb/CustomBreadCrumb";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const image = [img];
  return (
    <div className="w-full  container mx-auto ">
      <div className="">
        <AdsBanner images={image} />
      </div>
      <CustomBreadCrumb />
      <main>
        <div className="grid grid-cols-12 w-full h-[800px] gap-2">
          {/* filter section */}
          <div className="col-span-3 border-4 border-amber-950">
            <div className="my-2 mx-4">
              <h2 className="text-3xl  font-semibold text-secondary">Filter</h2>
              <Separator className=" bg-secondary dark:bg-nav w-full h-[1px] " />
            </div>
          </div>
          {/* products section */}
          <div className="col-span-9 border-4 border-amber-950">
            <div className="my-2 mx-4">
              <h2 className="text-3xl  font-semibold text-secondary">
                All Products
              </h2>
              <p className="md:text-base text-xs text-secondary">
                search result (244 items)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
