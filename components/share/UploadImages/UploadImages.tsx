"use client";
import React from "react";
import { IoIosCloudUpload } from "react-icons/io";
import FormImage from "@/components/dashboard/(admin)/Components/FormImage";
import { Controller, useFormContext } from "react-hook-form";

interface UploadImagesProps {
  fieldName: string;
  limit?: number;
  index: number;
}

const UploadImages: React.FC<UploadImagesProps> = ({
  fieldName,
  limit = 1,
  index,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={`${fieldName}.${index}.images`}
      control={control}
      rules={{ required: "Image is required" }}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;
          const newFiles = [...value, ...Array.from(e.target.files)];
          onChange(newFiles); // ✅ updates form state
        };

        const handleDelete = (id: number) => {
          const updated = value.filter((_: File, i: number) => i !== id);
          onChange(updated); // ✅ updates form state
        };

        return (
          <>
            {value.length === 0 ? (
              <label
                htmlFor={`images-${index}`}
                className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-sm text-gray-500 h-[300px]"
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="rounded text-secondary px-2 py-1 text-md flex flex-col items-center font-medium">
                    <IoIosCloudUpload className="w-7 h-7" />
                    Upload new
                  </span>
                  <span className="text-xs">Select existing</span>
                  <p className="text-xs">Accepts images</p>
                  <strong>[Note]: Image Size 720px * 300px</strong>
                </div>
              </label>
            ) : (
              <div className={`grid grid-cols-${limit} h-[300px] gap-2 w-full`}>
                {value.map((file: File, idx: number) => (
                  <FormImage
                    key={idx}
                    src={URL.createObjectURL(file)}
                    onDelete={() => handleDelete(idx)}
                  />
                ))}
                {value.length !== limit && (
                  <label
                    htmlFor={`images-${index}`}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-2xl text-gray-400"
                  >
                    +
                  </label>
                )}
              </div>
            )}

            <input
              accept=".jpg, .jpeg, .png, .gif"
              type="file"
              multiple
              id={`images-${index}`}
              className="hidden"
              onChange={handleFileChange}
            />

            {/* ✅ Error message */}
            {error && (
              <p className="text-red-500 text-sm mt-1 ">{error.message}</p>
            )}
          </>
        );
      }}
    />
  );
};

export default UploadImages;
