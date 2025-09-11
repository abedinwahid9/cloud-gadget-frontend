"use client";

import React from "react";

import SummaryCard from "@/components/share/SummaryCard/SummaryCard";
import OrderHistory from "@/components/dashboard/(user)/OrderHistory/OrderHistory";
import SalesChart from "@/components/share/SalesChart/SalesChart";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Profile and Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* <ProfileCard /> */}
        <SummaryCard
          title="Total Orders"
          value={1200}
          gradient="from-green-400 to-teal-400"
        />
        <SummaryCard
          title="Total Revenue"
          value="$56,300"
          gradient="from-blue-400 to-indigo-400"
        />
        <SummaryCard
          title="Pending Orders"
          value={15}
          gradient="from-yellow-400 to-orange-400"
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <SalesChart />
      </div>

      {/* Orders & Top Products */}
      <OrderHistory title="Recent Orders" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          {/* <TopProducts /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
