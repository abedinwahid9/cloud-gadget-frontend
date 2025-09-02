"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

interface OptionsProps {
  items: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Options: React.FC<OptionsProps> = ({ items, onChange }) => {
  const [value, setValue] = React.useState(items[0].value || "");

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val); // send value to parent if needed
  };

  return (
    <div>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-[220px] border-secondary dark:border-nav">
          <SelectValue
            className="text-secondary dark:text-nav placeholder:text-primary"
            placeholder="Select option"
          />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-secondary">
          <SelectGroup className="bg-primary/45 rounded-lg p-1 text-secondary dark:text-nav ">
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Options;
