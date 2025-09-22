import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const InputColor = ({ index }: { index: number }) => {
  const { control, register } = useFormContext();

  // useFieldArray for colors
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${index}.options`, // <-- must exist in your form's defaultValues
  });

  return (
    <div className="space-y-2 flex gap-3">
      {fields.map((field, i) => (
        <div key={field.id} className="flex gap-2 items-center group">
          <Input
            className="w-10 h-10 p-0 cursor-pointer"
            type="color"
            {...register(`variants.${index}.options.${i}` as const)}
          />

          <button
            type="button"
            onClick={() => remove(i)}
            className="text-red-500 hidden group-hover:block"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append("#000000")} // default black color
        className="bg-gray-200 px-3 py-1 rounded"
      >
        + Add Color
      </button>
    </div>
  );
};

export default InputColor;
