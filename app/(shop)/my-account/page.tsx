import OrderHistory from "@/components/dashboard/(user)/OrderHistory/OrderHistory";
import ProfileCard from "@/components/share/ProfileCard/ProfileCard";
import SummaryCard from "@/components/share/SummaryCard/SummaryCard";
import { FaMoneyBillWave, FaShoppingBag } from "react-icons/fa";

const page = () => {
  return (
    <>
      <ProfileCard />
      <div className="grid md:grid-cols-3 md:gap-5 gap-3 md:py-5 py-3">
        <SummaryCard
          IconComponent={FaShoppingBag}
          title="total order"
          value={50}
        />
        <SummaryCard
          IconComponent={FaMoneyBillWave}
          title="total purchase"
          value={50}
        />
      </div>
      <OrderHistory title="ongoing order" />
    </>
  );
};

export default page;
