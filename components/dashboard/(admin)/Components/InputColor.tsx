import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdFormatColorFill } from "react-icons/md";

const InputColor = ({ index }: { index: number }) => {
  const { control, register } = useFormContext();

  // useFieldArray for colors
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${index}.options`,
  });

  return (
    <div className=" flex gap-3">
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="flex gap-1 border-2  border-secondary rounded-lg bg-primary/30 items-center group "
        >
          <Input
            className="w-10 h-10 p-0 cursor-pointer border-none"
            type="color"
            {...register(`variants.${index}.options.${i}` as const)}
          />

          <button
            type="button"
            onClick={() => remove(i)}
            className="text-red-500 hidden group-hover:block w-10 h-10 "
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append("#000000")}
        className="   border-2 border-secondary p-1 rounded-lg bg-primary/30"
      >
        <MdFormatColorFill className="w-full h-full" />
      </button>
    </div>
  );
};

export default InputColor;
