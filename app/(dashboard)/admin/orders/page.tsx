import OrdersHistory from "@/components/dashboard/(admin)/OrdersHistory/OrdersHistory";
import SummaryCard from "@/components/share/SummaryCard/SummaryCard";
import React from "react";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-3 py-2">
        <SummaryCard title="Today Order" value={2000} />
        <SummaryCard title="Complete Order" value={2000} />
        <SummaryCard title="In Delivery Cancel" value={2000} />
        <SummaryCard title="Cancel Order" value={2000} />
      </div>
      <div>
        <OrdersHistory />
      </div>
    </>
  );
};

export default page;
