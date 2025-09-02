"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const CheckBoxCustom = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleCheckedChange = (
    checked: boolean | "indeterminate",
    id: string
  ) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <div className="p-2 bg-primary/10 rounded-md shadow-[0px_0px_5px_2px_#00a8a8] select-none">
      <p className="pb-4 font-semibold text-secondary dark:text-nav">Brand</p>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-1.5">
            <Checkbox
              className="border-secondary"
              id={item.id}
              checked={checkedItems.has(item.id)}
              onCheckedChange={(checked) =>
                handleCheckedChange(checked, item.id)
              }
            />
            <Label className="font-semibold text-secondary" htmlFor={item.id}>
              {item.label}
            </Label>
          </div>
        ))}
      </div>
      {/* Optional: Display selected items for debugging */}
      <div className="mt-4 p-2 text-sm text-gray-500 dark:text-gray-400">
        Selected IDs: {Array.from(checkedItems).join(", ")}
      </div>
    </div>
  );
};

export default CheckBoxCustom;
