"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Categories {
  value: string;
  label: string;
}

interface ComboBoxProps {
  title: string;
  categories: Categories[];
  value: string;
  onChange: (value: string) => void; // ✅ new prop
}

const ComboBox: React.FC<ComboBoxProps> = ({
  title,
  categories,
  value,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full bg-transparent justify-between"
        >
          {value
            ? categories.find((category) => category.value === value)?.label
            : `Select ${title}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] bg-gradient-to-b from-primary to-secondary p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {title} found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  className="text-nav text-base font-semibold data-[selected=true]:text-primary"
                  value={category.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue); // ✅ controlled by parent
                    setOpen(false);
                  }}
                >
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
