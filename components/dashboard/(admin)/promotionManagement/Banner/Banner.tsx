"use client";
import UploadImages from "@/components/share/UploadImages/UploadImages";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { useAppDispatch } from "@/lib/redux/hooks";
import { removeSeletedImageAll } from "@/lib/redux/slices/imageSeletedSlices";

interface Banner {
  banner: string;
  image: string;
  url: string;
  caption: string;
}

interface Banners {
  banners: Banner[];
}

const Banner = ({ limit, nameIndex }: { limit: number; nameIndex: number }) => {
  const method = useForm<Banners>({
    defaultValues: {
      banners: [
        {
          banner: `banner-${nameIndex}`,
          image: "",
          url: "",
          caption: "",
        },
      ],
    },
  });
  const dispatch = useAppDispatch();

  const { register, handleSubmit, control } = method;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "banners",
  });

  const submitForm = (data: unknown) => {
    console.log(data);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <div className="space-y-1 bg-primary/20  rounded-lg p-2">
          <h3 className="text-lg font-semibold text-primary">
            Banner #{nameIndex} (limit: {limit})
          </h3>
          <div className="flex gap-2">
            {fields.map((_, index) => {
              return (
                <div key={index} className="w-full space-y-2">
                  {/* image upload */}
                  <Controller
                    control={control}
                    name={`banners.${index}.image`}
                    render={({ field }) => (
                      <UploadImages
                        index={1}
                        limit={1}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  {/* caption */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-secondary my-2">
                      Caption
                    </label>

                    <Input
                      type="text"
                      placeholder="https://example.com"
                      className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      {...register(`banners.${index}.caption`)}
                    />
                  </div>
                  {/* URL */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-secondary my-2">
                      URL Link
                    </label>

                    <Input
                      type="text"
                      placeholder="https://example.com"
                      className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      {...register(`banners.${index}.url`)}
                    />
                  </div>
                  {/* Remove */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className=" bg-red-500 text-white px-2 py-1  text-xs rounded-md hover:bg-red-600"
                    >
                      ✖ Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2">
          {fields.length < limit && (
            <CustomBtn
              type="button"
              handleBtn={() => {
                dispatch(removeSeletedImageAll());
                append({
                  banner: `banner-${nameIndex}`,
                  image: "",
                  url: "",
                  caption: "",
                });
              }}
              className="w-full rounded-lg"
              title=" + Add New Slider"
            />
          )}
          <CustomBtn
            className="w-full rounded-md"
            type="submit"
            title="save data"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default Banner;
