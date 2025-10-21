"use client";
import UploadImages from "@/components/share/UploadImages/UploadImages";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { useAppDispatch } from "@/lib/redux/hooks";
import { removeSeletedImageAll } from "@/lib/redux/slices/imageSeletedSlices";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Banner {
  _id?: string;
  banner: string;
  image: string;
  url: string;
  caption: string;
}
interface BannerGet {
  id?: string;
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
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["banners", nameIndex],
    queryFn: async () => {
      const res = await axiosPublic.get(`/banner/${nameIndex}`);
      return res.data.banners || [];
    },
  });

  const { register, handleSubmit, control, reset } = method;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "banners",
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const formatted = data.map((item: BannerGet) => ({
        _id: item.id,
        ...item,
      }));

      reset({ banners: formatted });
    }
  }, [data, reset, nameIndex]);

  const submitForm = async (data: Banners) => {
    try {
      const banner = data;

      const res = await axiosPublic.post(`/banner/${nameIndex}`, banner, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  // banner delete
  const handleDelete = async (id: unknown, index: number) => {
    try {
      const res = await axiosPublic.delete(`/banner/${id}`);

      console.log(res);
      refetch();
      remove(index);
    } catch (err) {
      console.log("banner delete failed", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-primary/10 rounded-xl space-y-6 animate-pulse">
        {/* One slider card placeholder */}
        <div className="bg-dark/80 border border-primary/30 rounded-lg p-5 space-y-5">
          {/* Slider title */}
          <Skeleton className="h-5 w-24 bg-primary/20 rounded-md" />

          {/* Image Upload Placeholder */}
          <div>
            <Skeleton className="h-40 w-full bg-primary/20 rounded-lg" />
          </div>

          {/* Caption field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-primary/20 rounded-md" />
            <Skeleton className="h-10 w-full bg-primary/20 rounded-md" />
          </div>

          {/* URL field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-primary/20 rounded-md" />
            <Skeleton className="h-10 w-full bg-primary/20 rounded-md" />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex gap-3">
          <Skeleton className="h-12 w-full bg-primary/20 rounded-lg" />
          <Skeleton className="h-12 w-full bg-primary/20 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <div className="space-y-1 bg-primary/20  rounded-lg p-2">
          <h3 className="text-lg font-semibold text-primary">
            Banner #{nameIndex} (limit: {limit})
          </h3>
          <div className="flex gap-2">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="w-full space-y-2">
                  {/* image upload */}
                  <Controller
                    control={control}
                    name={`banners.${index}.image`}
                    render={({ field }) => (
                      <UploadImages
                        imageIndex={`banner-${nameIndex}${index}`}
                        index={index}
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
                      onClick={() => {
                        handleDelete(field._id, index);
                      }}
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
