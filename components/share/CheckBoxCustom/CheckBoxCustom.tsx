"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  return (
    <div className="p-2 bg-primary/10 rounded-md shadow-2xl shadow-amber-400 select-none">
      <p className="pb-4 font-semibold text-secondary dark:text-nav">Brand</p>
      {items?.map((item, i) => {
        return (
          <div key={i} className="flex items-center space-x-2">
            <Checkbox id={item.id} />
            <Label htmlFor={item.id}>{item.label}</Label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckBoxCustom;
