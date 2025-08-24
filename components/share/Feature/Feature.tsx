import React from "react";
import Title from "../Title/Title";
import { Separator } from "@radix-ui/react-separator";

const Feature = () => {
  return (
    <div className="px-2">
      <div className=" flex justify-between">
        <Title text="Trending collection" />
        <div>
          <div>btn</div>
          <div>btn</div>
        </div>
      </div>
      <Separator className="my-[15px] bg-secondary dark:bg-nav w-full h-[1px] " />
    </div>
  );
};

export default Feature;
