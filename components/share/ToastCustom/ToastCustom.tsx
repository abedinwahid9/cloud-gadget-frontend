import React from "react";
import { toast } from "sonner";

const ToastCustom = (title: string) => {
  toast.custom(
    (id) => (
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-4 w-[320px] flex justify-between gap-1 border">
        <p className="font-semibold w-4/6">{title}</p>
        <div className="flex justify-end  w-2/6">
          <button
            onClick={() => toast.dismiss(id)}
            className="px-2 py-1  rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
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
