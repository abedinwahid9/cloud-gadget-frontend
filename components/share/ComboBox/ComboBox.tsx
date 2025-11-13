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
  id: string;
  label: string;
  value?: string;
  slug?: string;
}

interface ComboBoxProps {
  title: string;
  categories: Categories[];
  value: string;

  onChange?: (item: {
    id: string;
    label: string;
    value?: string | undefined;
    slug: string | undefined;
  }) => void;
  refetch?: () => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  title,
  categories,
  value,
  refetch,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={() => (setOpen(!open), refetch ? refetch() : null)}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full bg-transparent border-primary justify-between rounded-lg text-primary hover:text-primary capitalize"
        >
          {value ? value : `Select ${title}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] bg-secondary/85 p-0 drop-shadow-sm drop-shadow-nav">
        <Command>
          <CommandInput
            placeholder={`Search ${title}...`}
            className="h-9 text-text dark:text-primary"
          />
          <CommandList>
            <CommandEmpty>No {title} found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  className="text-text text-base font-semibold data-[selected=true]:text-nav data-[selected=true]:bg-primary capitalize"
                  value={category.id}
                  onSelect={(currentValue) => {
                    const selected = categories.find(
                      (cat) => cat.id === currentValue
                    );

                    if (selected && onChange) {
                      onChange({
                        id: selected.id,
                        label: selected.label,
                        value: selected.value,
                        slug: selected.slug,
                      });
                    }
                    setOpen(false);
                  }}
                >
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.id ? "opacity-100" : "opacity-0"
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
