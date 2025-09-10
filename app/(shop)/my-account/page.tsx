import OrderHistory from "@/components/dashboard/(user)/OrderHistory/OrderHistory";
import ProfileCard from "@/components/share/ProfileCard/ProfileCard";
import SummaryCard from "@/components/share/SummaryCard/SummaryCard";

const page = () => {
  return (
    <div>
      <ProfileCard />
      <div className="grid lg:grid-cols-3 md:gap-5 gap-2 md:py-5 py-2">
        <SummaryCard title="total order" value={50} />
        <SummaryCard title="total purchase" value={50} />
      </div>
      <OrderHistory title="ongoing order" />
    </div>
  );
};

export default page;
