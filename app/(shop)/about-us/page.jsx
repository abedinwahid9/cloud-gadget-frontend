import LiquidBtn from "@/components/share/LiquidBtn/LiquidBtn";
import CustomDemo from "../../../components/CustomDemo/CustomDemo";

const page = () => {
  return (
    <div className="md:py-10 py-3 md:px-5 px-1">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 ">
        <LiquidBtn text="dfshjdhsfjh" />
        <div className="bg-amber-400 w-52 h-52">
          <svg xmlns="http://www.w3.org/2000/svg">
            <filter id="filter">
              <feTurbulence baseFrequency="0.8" />
              <feGaussianBlur in="noise" stdDeviation="40" result="blurred" />
              <feTurbulence
                // type="fractalNoise"
                baseFrequency="0.04 0.05"
                // numOctaves="2"
                // seed="10"
                // result="noise"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#filter)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default page;
