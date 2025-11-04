"use client";
import React from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { X } from "lucide-react";
import UploadImages from "@/components/share/UploadImages/UploadImages";
import { generateSlug } from "@/lib/utils/generateSlug";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppDispatch } from "@/lib/redux/hooks";
import { removeSeletedImageAll } from "@/lib/redux/slices/imageSeletedSlices";
import ToastCustom from "@/components/share/ToastCustom/ToastCustom";

// Form type
type FormValues = {
  categories: {
    value: string;
    label: string;
    slug: string;
    image: "";
  }[];
};

// ✅ Shared type for Category state
export interface Cates {
  value: string;
  label: string;
  slug: string;
  image: "";
}

const AddCategories = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      categories: [{ value: "", label: "", slug: "", image: "" }],
    },
  });

  const axoisPublic = useAxiosPublic();
  const dispatch = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const filtered = data.categories.map((c) => {
        const val = c.value.trim();
        if (!val) return null;
        return {
          value: val,
          label: val,
          slug: generateSlug(val),
          image: c.image,
        };
      });
      const categoriesToSubmit = await axoisPublic.post(
        "/category",
        { categories: filtered },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (categoriesToSubmit.status === 201) {
        reset({ categories: [{ value: "", label: "", slug: "", image: "" }] });
        dispatch(removeSeletedImageAll());
        ToastCustom("Category saved");
      }
    } catch (err) {
      console.log("Error submitting categories:", err);
    }
  };

  return (
    <Card className="bg-primary/20 shadow-[0px_0px_10px_0px_#00a8a8] dark:bg-blue-300/20 gap-3 border border-gray-200 dark:border-gray-700 p-4">
      <CardHeader>
        <CardTitle className="text-secondary font-semibold text-lg dark:text-nav underline">
          Add Categories
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2 items-center flex-col border p-2 rounded-md "
              >
                {/* Upload images for each category */}
                <Controller
                  control={control}
                  name={`categories.${index}.image`}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <UploadImages
                      imageIndex={`category-${index}`}
                      limit={1}
                      nameIndex={index}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.categories?.[index]?.image && (
                  <p className="text-red-500 text-sm mt-1">
                    Slider image is required.
                  </p>
                )}
                {/* Category Input */}
                <div className="flex gap-2 items-center w-full">
                  <Input
                    {...register(`categories.${index}.value`, {
                      required: "category must be required",
                    })}
                    placeholder="Category Name"
                    className="text-secondary placeholder:text-primary"
                  />
                  <Button
                    type="button"
                    className="bg-transparent hover:bg-badge hover:text-white font-bold"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <X />
                  </Button>{" "}
                </div>{" "}
                <div className="w-full text-start">
                  {errors.categories?.[index]?.value && (
                    <p className="text-red-500 text-sm in">
                      {errors?.categories?.[index].value.message}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <CustomBtn
                handleBtn={() => {
                  dispatch(removeSeletedImageAll());
                  append({ value: "", label: "", slug: "", image: "" });
                }}
                title="Add Category +"
                className="rounded-md"
                type="button"
              />
              <CustomBtn
                title="Save Categories"
                className="rounded-md"
                type="submit"
              />
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default AddCategories;
