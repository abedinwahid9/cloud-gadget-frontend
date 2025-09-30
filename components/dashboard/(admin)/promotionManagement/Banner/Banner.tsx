"use client";
import UploadImages from "@/components/share/UploadImages/UploadImages";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ImageGallery from "../../Content/ImageGallery";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import ModelGallery from "../../Content/ModelGallery";

const Banner = () => {
  const method = useForm({
    defaultValues: {
      banners: {
        images: [],
        urls: [],
      },
    },
  });

  const { register, handleSubmit } = method;

  const handleButton = (data: { name: string; index: number }) => {
    console.log(data);
  };

  const submitForm = (data: unknown) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <ModelGallery />
          {/* 1st banner */}
          <div className="space-y-1 bg-primary/20  rounded-lg p-2">
            <h3 className="text-lg font-semibold text-primary">
              Banner #1 (limit: 2)
            </h3>
            <div className="flex gap-2">
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>{" "}
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 2nd banner */}
          <div className="space-y-1 bg-primary/20  rounded-lg p-2">
            <h3 className="text-lg font-semibold text-primary">
              Banner #2 (limit: 2)
            </h3>
            <div className="flex gap-2">
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 3rd banner */}
          <div className="space-y-1 bg-primary/20  rounded-lg p-2">
            <h3 className="text-lg font-semibold text-primary">
              Banner #1 (limit: 2)
            </h3>
            <div className="flex gap-2">
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>{" "}
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          {/* 5th banner */}
          <div className="space-y-1 bg-primary/20  rounded-lg p-2">
            <h3 className="text-lg font-semibold text-primary">
              Banner #1 (limit: 2)
            </h3>
            <div className="flex gap-2">
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 4th banner */}
          <div className="space-y-1 bg-primary/20  rounded-lg p-2">
            <h3 className="text-lg font-semibold text-primary">
              Banner #1 (limit: 2)
            </h3>
            <div className="flex gap-2">
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>{" "}
              <div className="w-full">
                <UploadImages fieldName="banners" index={1} limit={1} />
                {/* URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Link
                  </label>

                  <Input
                    type="text"
                    placeholder="https://example.com"
                    className="bg-dark border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    {...register(`banners.urls`)}
                  />
                </div>
              </div>
            </div>
          </div>
          <CustomBtn
            className="w-full rounded-md"
            type="submit"
            title="save data"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default Banner;
