"use client";

import DeleteBtn from "@/components/share/DeleteBtn/DeleteBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Delete } from "lucide-react";

interface ModelChargeProps {
  modelOpen: boolean;
  setModelOpen: (open: boolean) => void;
}

const ModelCharge = ({ modelOpen, setModelOpen }: ModelChargeProps) => {
  if (!modelOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-gray-100">
          Add Delivery Zone
        </h2>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="zone">Delivery Zone</Label>
            <Input
              id="zone"
              type="text"
              placeholder="e.g. Dhaka"
              className="focus-visible:ring-2 focus-visible:ring-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="charge">Charge (৳)</Label>
            <Input
              id="charge"
              type="number"
              placeholder="e.g. 100"
              className="focus-visible:ring-2 focus-visible:ring-cyan-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md transition-colors"
            >
              Save
            </Button>
            <Button
              type="button" // ✅ not submit
              variant="outline"
              onClick={() => setModelOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelCharge;
