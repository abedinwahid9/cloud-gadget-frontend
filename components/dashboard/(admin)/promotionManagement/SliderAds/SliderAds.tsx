"use client";

import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import Title from "@/components/share/Title/Title";
import UploadImages from "@/components/share/UploadImages/UploadImages";
import { Input } from "@/components/ui/input";
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { removeSeletedImageAll } from "@/lib/redux/slices/imageSeletedSlices";
import { Skeleton } from "@/components/ui/skeleton";

interface SliderItem {
  image: string;
  url: string;
  caption: string;
}

interface SliderAds {
  sliders: SliderItem[];
}

const SliderAds = () => {
  const methods = useForm<SliderAds>({
    defaultValues: {
      sliders: [{ image: "", url: "", caption: "" }],
    },
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  const axiosPublic = useAxiosPublic();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sliders",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // ✅ Fetch data
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/promotion/sliders");
      return res.data.sliders;
    },
  });

  // ✅ Reset with fetched data or show default field if empty
  useEffect(() => {
    if (data && data.length > 0) {
      reset({ sliders: data });
    } else {
      reset({ sliders: [{ image: "", url: "", caption: "" }] });
    }
  }, [data, reset]);

  // ✅ Handle submit
  const handleForm = async (formData: SliderAds) => {
    console.log("Submitted Data:", formData);
    try {
      setLoading(true);
      const res = await axiosPublic.post("/promotion/sliders", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        setLoading(false);
        refetch();

        dispatch(removeSeletedImageAll());
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!isLoading) {
    return (
      <div className="p-6 bg-primary/10 rounded-xl space-y-6 animate-pulse">
        {/* Header */}
        <div className="border-b border-primary/30 pb-3">
          <Skeleton className="h-6 w-40 bg-primary/20 rounded-md" />
        </div>

        {/* One slider card placeholder */}
        <div className="bg-dark/80 border border-primary/30 rounded-lg p-5 space-y-5">
          {/* Slider title */}
          <Skeleton className="h-5 w-24 bg-primary/20 rounded-md" />

          {/* Image Upload Placeholder */}
          <div>
            <Skeleton className="h-52 w-full bg-primary/20 rounded-lg" />
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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="bg-primary/10 text-white p-6 rounded-xl shadow-lg space-y-6"
      >
        <div className="border-b border-primary/40 pb-2 mb-4">
          <Title text="📢 Slider Ads" />
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-dark/80 border border-primary/30 rounded-lg p-5 space-y-4 relative hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-primary">
              Slider #{index + 1}
            </h3>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Banner Image
              </label>
              <Controller
                control={control}
                name={`sliders.${index}.image`}
                rules={{ required: true }}
                render={({ field }) => (
                  <UploadImages
                    index={index}
                    imageIndex={`slider${index}`}
                    limit={1}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.sliders?.[index]?.image && (
                <p className="text-red-500 text-sm mt-1">
                  Slider image is required.
                </p>
              )}
            </div>

            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Caption
              </label>
              <Input
                type="text"
                {...register(`sliders.${index}.caption`, { required: true })}
                placeholder="Caption text"
                className="bg-dark border border-gray-600 text-primary px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
              {errors.sliders?.[index]?.caption && (
                <p className="text-red-500 text-sm mt-1">
                  Caption is required.
                </p>
              )}
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                URL Link
              </label>
              <Input
                type="text"
                {...register(`sliders.${index}.url`, { required: true })}
                placeholder="https://example.com"
                className="bg-dark border border-gray-600 text-primary px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
              {errors.sliders?.[index]?.url && (
                <p className="text-red-500 text-sm mt-1">URL is required.</p>
              )}
            </div>

            {/* Remove */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs rounded-md hover:bg-red-600"
              >
                ✖ Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex gap-2 justify-between items-center pt-4 border-t border-primary/30 w-full">
          {fields.length < 5 && (
            <CustomBtn
              type="button"
              handleBtn={() => {
                dispatch(removeSeletedImageAll());
                append({ image: "", url: "", caption: "" });
              }}
              className="w-full rounded-lg"
              title=" + Add New Slider"
            />
          )}
          <CustomBtn
            disabled={loading}
            className="w-full rounded-lg "
            title={loading ? "loading..." : "Submit All"}
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default SliderAds;
