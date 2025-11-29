import Users from "@/components/dashboard/(admin)/Users/Users";
import Title from "@/components/share/Title/Title";
import React from "react";

const page = () => {
  return (
    <div>
      <Title text="Customers" />
      <Users role="customer" />
    </div>
  );
};

export default page;
