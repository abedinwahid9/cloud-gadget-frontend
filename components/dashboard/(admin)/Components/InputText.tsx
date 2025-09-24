import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { TbCategoryPlus } from "react-icons/tb";

const InputText = ({ index }: { index: number }) => {
  const { register, control } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    control,
    name: `variants.${index}.options`,
  });

  return (
    <div className="grid grid-cols-4 gap-1">
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="flex gap-0.5 px-2 border-2  border-secondary rounded-lg bg-primary/30 items-center group"
        >
          <div className=" group ">
            <Input
              className="border-none p-0 m-0"
              {...register(`variants.${index}.options.${i}` as const)}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-red-500 hidden group-hover:block  "
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append(" ")}
        className="   border-2 border-secondary flex justify-center w-full p-2 rounded-lg bg-primary/30"
      >
        <TbCategoryPlus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default InputText;
