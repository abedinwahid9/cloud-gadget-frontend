import OrdersHistory from "@/components/dashboard/(admin)/OrdersHistory/OrdersHistory";
import SummaryCard from "@/components/share/SummaryCard/SummaryCard";
import React from "react";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-3 py-2">
        <SummaryCard title="Today Sales" value={2000} />
        <SummaryCard title="Total Order" value={2000} />
        <SummaryCard title="Total Cancel" value={2000} />
        <SummaryCard title="Pending Order" value={2000} />
        <SummaryCard title="Processing Order" value={2000} />
      </div>

      <OrdersHistory />
    </>
  );
};

export default page;
