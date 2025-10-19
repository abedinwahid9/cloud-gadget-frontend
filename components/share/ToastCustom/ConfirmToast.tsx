import React from "react";
import { toast } from "sonner";

const ConfirmToast = (
  title: string,
  onConfirm?: () => void,
  onCancel?: () => void
) => {
  toast.custom(
    (id) => (
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-4 w-[320px] flex flex-col gap-3 border">
        <p className="font-semibold">{title}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss(id);
              onCancel?.();
              toast("Cancelled ❌", {
                position: "top-center",
                style: {
                  backgroundColor: "#aacec8",
                  color: "#004030",
                },
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              });
            }}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(id);
              onConfirm?.();
              toast.success("Deleted ✅", {
                position: "top-center",
                style: {
                  backgroundColor: "#aacec8",
                  color: "#004030",
                },
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              });
            }}
            className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    ),
    { position: "top-center" }
  );
};

export default ConfirmToast;
