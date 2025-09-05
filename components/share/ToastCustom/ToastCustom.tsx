import React from "react";
import { toast } from "sonner";

const ToastCustom = ({ title }: { title: string }) => {
  return (
    <>
      {toast.success(title, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
        style: {
          background: "white",
        },
      })}
    </>
  );
};

export default ToastCustom;
