import Customers from "@/components/dashboard/(admin)/Customers/Customers";
import Title from "@/components/share/Title/Title";
import React from "react";

const page = () => {
  return (
    <div>
      <Title text="Customers & Admins" />
      <Customers />
    </div>
  );
};

export default page;
