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
import { Cates } from "../AddCategories/AddCategories"; // shared type
import { generateSlug } from "@/lib/utils/generateSlug";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { toast } from "sonner";
import ToastCustom from "@/components/share/ToastCustom/ToastCustom";
import UploadImages from "@/components/share/UploadImages/UploadImages";
import { removeSeletedImageAll } from "@/lib/redux/slices/imageSeletedSlices";
import { useAppDispatch } from "@/lib/redux/hooks";

// Form data type
type FormValues = {
  subCategories: {
    categoryId: string;
    value: string;
    label: string;
    slug: string;
    image: string;
  }[];
};

const AddSubCate = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      subCategories: [
        { categoryId: "", image: "", value: "", label: "", slug: "" },
      ],
    },
  });
  const axiosPublic = useAxiosPublic();
  const dispatch = useAppDispatch();

  const { data: category = [], refetch } = useQuery({
    queryKey: ["add-category"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data.allCategory;
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await axiosPublic.post("/sub-category", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        ToastCustom(
          `${data.subCategories
            .map((cat) => cat.label)
            .toString()} sub category is saved`
        );
        dispatch(removeSeletedImageAll());
        reset();
      }
    } catch (err) {
      console.log("Error submitting sub-categories:", err);
    }
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
              className="flex flex-col gap-2 items-start md:items-center"
            >
              {/* Upload images for each category */}
              <Controller
                control={control}
                name={`subCategories.${index}.image`}
                rules={{ required: true }}
                render={({ field }) => (
                  <UploadImages
                    imageIndex={`subCategories-${index}`}
                    index={index}
                    limit={1}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.subCategories?.[index]?.image && (
                <p className="text-red-500 text-sm mt-1">
                  Subcategory image is required.
                </p>
              )}
              <div className="flex flex-col md:flex-row w-full gap-3">
                {/* Controlled ComboBox */}
                <div className="md:w-1/2 w-full">
                  <Controller
                    control={control}
                    name={`subCategories.${index}.categoryId`}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <ComboBox
                        title="Category"
                        refetch={refetch}
                        categories={category}
                        value={
                          category?.find(
                            (c: { id: string }) => c?.id === field.value
                          )?.label || ""
                        }
                        onChange={(val) => {
                          field.onChange(val.id);
                          setValue(`subCategories.${index}.label`, val.label);
                          setValue(
                            `subCategories.${index}.slug`,
                            generateSlug(val.label)
                          );
                        }}
                      />
                    )}
                  />
                  {errors.subCategories?.[index]?.categoryId && (
                    <p className="text-red-500 text-sm ">
                      Sub Categories is required.
                    </p>
                  )}
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
                    <p className="text-red-500 text-sm ">
                      {errors.subCategories[index]?.value?.message}
                    </p>
                  )}
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
            </div>
          ))}

          {/* Add & Save buttons */}
          <div className="flex gap-3">
            <CustomBtn
              handleBtn={() =>
                append({
                  categoryId: "",
                  image: "",
                  value: "",
                  label: "",
                  slug: "",
                })
              }
              title="Add Sub-Category +"
              type="button"
              className="rounded-md"
            />
            <CustomBtn
              title="Save Sub-Categories"
              className="rounded-md"
              type="submit"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSubCate;
