"use client";

import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { X } from "lucide-react";

// ✅ Define type for form data
type FormValues = {
  categories: { name: string }[];
  required: boolean;
};

const AddCategories = ({
  setCategory,
}: {
  setCategory: (cats: string[]) => void;
}) => {
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      categories: [{ name: "" }], // initial one empty category
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const filtered = data.categories
      .map((c) => c.name.trim())
      .filter((name) => name !== "");
    setCategory(filtered);
  };

  return (
    <Card className="bg-primary/20 shadow-[0px_0px_10px_0px_#00a8a8] dark:bg-blue-300/20 gap-3 border border-gray-200 dark:border-gray-700 p-4">
      <CardHeader>
        <CardTitle className="text-secondary font-semibold text-lg dark:text-nav underline">
          Add Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <Input
                {...(register(`categories.${index}.name` as const),
                { required: true })}
                placeholder="Add Category"
                className="text-secondary placeholder:text-primary"
              />
              <Button
                type="button"
                className="bg-transparent hover:bg-badge hover:text-white font-bold"
                size="sm"
                onClick={() => remove(index)}
              >
                <X />
              </Button>
            </div>
          ))}

          <div className="flex gap-3">
            <div>
              <CustomBtn
                handleBtn={() => append({ name: "" })}
                title="Add Category +"
                type="button"
              />
            </div>
            <div>
              <CustomBtn title="Save Categories" type="submit" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCategories;
