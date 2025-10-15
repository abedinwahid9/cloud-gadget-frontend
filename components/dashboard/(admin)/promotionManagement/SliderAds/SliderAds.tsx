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
import ImageGallery from "../../Content/ImageGallery";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";

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
  } = methods;
  const axiosPublic = useAxiosPublic();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sliders",
  });

  const handleForm = async (data: SliderAds) => {
    try {
      // console.log("Submitted sliders:", data);
      const res = await axiosPublic.post("/promotion/sliders", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleButton = (data: { name: string; index: number }) => {
  //   console.log(data);
  // };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="bg-primary/10 text-white p-6 rounded-xl shadow-lg space-y-6"
      >
        {/* Title */}
        <div className="border-b border-primary/40 pb-2 mb-4">
          <Title text="📢 Slider Ads" />
        </div>

        {/* Slider Items */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-dark/80 border border-primary/30 rounded-lg p-5 space-y-4 relative hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-primary">
              Slider #{index + 1}
            </h3>
            {/* Banner Image */}
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
                    limit={1}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.sliders?.[index]?.image?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Slider image is required.
                </p>
              )}
            </div>
            {/* caption */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Caption
              </label>
              <Input
                type="text"
                placeholder="https://example.com"
                className="bg-dark border border-gray-600 text-primary px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                {...register(`sliders.${index}.caption`, { required: true })}
              />
              {errors.sliders?.[index]?.caption?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  caption image is required.
                </p>
              )}
            </div>{" "}
            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                URL Link
              </label>
              <Input
                type="text"
                placeholder="https://example.com"
                className="bg-dark border border-gray-600 text-primary px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                {...register(`sliders.${index}.url`, { required: true })}
              />
              {errors.sliders?.[index]?.url?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  url image is required.
                </p>
              )}
            </div>
            {/* Remove button */}
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

        {/* Bottom Actions */}
        <div className="flex gap-2 justify-between items-center pt-4 border-t border-primary/30 w-full">
          {fields.length !== 5 && (
            <CustomBtn
              type="button"
              handleBtn={() => append({ image: "", url: "", caption: "" })}
              className="w-full rounded-lg"
              title=" + Add New Slider"
            />
          )}
          <CustomBtn
            className="w-full rounded-lg"
            title="Submit All"
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default SliderAds;
