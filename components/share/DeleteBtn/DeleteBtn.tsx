import { Button } from "@/components/ui/button";
import React from "react";
import { RiDeleteBin3Fill, RiDeleteBin3Line } from "react-icons/ri";

/**
 *  -----add group in parent for hover-----
 */
const DeleteBtn = ({ action }: { action: () => void }) => {
  return (
    <Button
      onClick={action}
      className="bg-transparent hover:bg-transparent text-badge"
    >
      <RiDeleteBin3Line
        className="block group-hover:hidden"
        style={{ width: "20px", height: "20px" }}
      />
      <RiDeleteBin3Fill
        className="hidden group-hover:block"
        style={{ width: "20px", height: "20px" }}
      />
    </Button>
  );
};

export default DeleteBtn;
