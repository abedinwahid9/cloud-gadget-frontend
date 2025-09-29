"use client";

import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import Title from "@/components/share/Title/Title";
import UploadImages from "@/components/share/UploadImages/UploadImages";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";

interface SliderItem {
  images: File[];
  url: string;
}

interface SliderAds {
  sliders: SliderItem[];
}

const SliderAds = () => {
  const methods = useForm<SliderAds>({
    defaultValues: {
      sliders: [{ images: [], url: "" }],
    },
  });

  const { control, register, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sliders",
  });

  const handleForm = (data: SliderAds) => {
    console.log("Submitted sliders:", data);
  };

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
              <UploadImages
                fieldName={`sliders.${index}.images`}
                index={index}
                limit={1}
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL Link
              </label>
              <Input
                type="text"
                placeholder="https://example.com"
                className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                {...register(`sliders.${index}.url`)}
              />
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
          <CustomBtn
            type="button"
            handleBtn={() => append({ images: [], url: "" })}
            className="w-full rounded-lg"
            title=" + Add New Slider"
          />
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
