import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";

const ConfirmToast = (
  title: string,
  onConfirm?: () => void,
  onCancel?: () => void
) => {
  toast.custom(
    (id) => (
      <div className="bg-text/50 border-2 border-primary/10 text-primary rounded-xl blur-3xl shadow-lg p-4 w-[320px] flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <RiDeleteBin5Line className="text-red-600 text-lg" />
          <span className="font-semibold">Are you sure?</span>
        </div>
        <p className="text-lg text-nav font-bold">{title}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              console.log("Cancelled ❌");
              onCancel?.();
              toast.dismiss(id);
              toast("Delete cancelled", {
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
            className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Deleted ✅");
              onConfirm?.();
              toast.dismiss(id);
              toast.success("Item deleted", {
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
            className="px-3 py-1 text-sm rounded-md bg-primary/50 text-white hover:bg-primary"
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
