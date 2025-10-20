import Banner from "@/components/dashboard/(admin)/promotionManagement/Banner/Banner";
import React from "react";

const page = () => {
  return (
    <div className="space-y-4">
      <Banner limit={2} nameIndex={1} />
      <Banner limit={4} nameIndex={2} />
    </div>
  );
};

export default page;
