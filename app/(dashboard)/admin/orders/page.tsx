import OrdersHistory from "@/components/dashboard/(admin)/OrdersHistory/OrdersHistory";
import SummaryCard from "@/components/share/SummaryCard/SummaryCard";
import React from "react";
import { FaAddressBook } from "react-icons/fa";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-3 py-2">
        <SummaryCard
          IconComponent={FaAddressBook}
          title="Today Order"
          value={2000}
        />
        <SummaryCard
          IconComponent={FaAddressBook}
          title="Complete Order"
          value={2000}
        />
        <SummaryCard
          IconComponent={FaAddressBook}
          title="In Delivery Cancel"
          value={2000}
        />
        <SummaryCard
          IconComponent={FaAddressBook}
          title="Cancel Order"
          value={2000}
        />
      </div>
      <div>
        <OrdersHistory />
      </div>
    </>
  );
};

export default page;
