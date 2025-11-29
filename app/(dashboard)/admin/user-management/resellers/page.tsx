import Users from "@/components/dashboard/(admin)/Users/Users";
import Title from "@/components/share/Title/Title";
import React from "react";

const page = () => {
  return (
    <div>
      <Title text="Resellers" />
      <Users role="reseller" />
    </div>
  );
};

export default page;
