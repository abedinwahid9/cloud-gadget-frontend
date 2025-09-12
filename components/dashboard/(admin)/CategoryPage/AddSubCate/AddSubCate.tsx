"use client";

import React from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { X } from "lucide-react";
import ComboBox from "@/components/share/ComboBox/ComboBox";
import { Cats } from "../AddCategories/AddCategories"; // shared type

// Form data type
type FormValues = {
  subCategories: {
    category: string;
    value: string;
    label: string;
    slug: string;
  }[];
};

interface AddSubCateProps {
  category: Cats[];
}

const AddSubCate: React.FC<AddSubCateProps> = ({ category }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      subCategories: [{ category: "", value: "", label: "", slug: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  // Slug generator
  const generateSlug = (val: string) =>
    val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted:", data.subCategories);
    reset();
  };

  return (
    <Card className="bg-primary/20 shadow-[0px_0px_10px_0px_#00a8a8] dark:bg-blue-300/20 gap-3 border border-gray-200 dark:border-gray-700 p-4">
      <CardHeader>
        <CardTitle className="text-secondary font-semibold text-lg dark:text-nav underline">
          Add Sub-Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex gap-2 items-start md:items-center"
            >
              <div className="flex flex-col md:flex-row w-full gap-3">
                {/* Controlled ComboBox */}
                <div className="md:w-1/2 w-full">
                  <Controller
                    control={control}
                    name={`subCategories.${index}.category`}
                    render={({ field }) => (
                      <ComboBox
                        title="Category"
                        categories={category}
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          setValue(`subCategories.${index}.label`, val);
                          setValue(
                            `subCategories.${index}.slug`,
                            generateSlug(val)
                          );
                        }}
                      />
                    )}
                  />
                </div>

                {/* SubCategory Name */}
                <div className="md:w-1/2 w-full relative">
                  <Input
                    {...register(`subCategories.${index}.value`, {
                      required: "Sub-Category is required",
                      onChange: (e) => {
                        const val = e.target.value;
                        setValue(`subCategories.${index}.label`, val);
                        setValue(
                          `subCategories.${index}.slug`,
                          generateSlug(val)
                        );
                      },
                    })}
                    placeholder="Add Sub-Category"
                    className="text-secondary placeholder:text-primary"
                  />
                  {errors.subCategories?.[index]?.value && (
                    <p className="text-red-500 text-sm absolute top-full">
                      {errors.subCategories[index]?.value?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Remove Button */}
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

          {/* Add & Save buttons */}
          <div className="flex gap-3">
            <CustomBtn
              handleBtn={() =>
                append({ category: "", value: "", label: "", slug: "" })
              }
              title="Add Sub-Category +"
              type="button"
            />
            <CustomBtn title="Save Sub-Categories" type="submit" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSubCate;
