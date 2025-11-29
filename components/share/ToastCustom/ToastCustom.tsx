import React from "react";
import { toast } from "sonner";

const ToastCustom = (title: string) => {
  toast.custom(
    (id) => (
      <div className="bg-text/50 border-2 border-primary/10 text-primary rounded-xl backdrop:blur-3xl shadow-lg p-4 w-fit flex  gap-3">
        <p className="font-semibold ">{title}</p>
        <div className="flex justify-end  w-2/6">
          <button
            onClick={() => toast.dismiss(id)}
            className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    { position: "top-center" }
  );
};

export default ToastCustom;
