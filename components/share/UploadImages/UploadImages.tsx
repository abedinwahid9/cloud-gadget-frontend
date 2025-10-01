"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import FormImage from "@/components/dashboard/(admin)/Components/FormImage";
import ModelGallery from "@/components/dashboard/(admin)/Content/ModelGallery";

interface UploadImagesProps {
  fieldName?: string;
  limit?: number;
  index?: number;
  sizeNote?: string;
  getImage?: { thumbnail: string }[];
  setGetImage: Dispatch<SetStateAction<(File | { thumbnail: string })[]>>;
}

const UploadImages: React.FC<UploadImagesProps> = ({
  getImage = [],
  limit = 1,
}) => {
  const [images, setImages] = useState<(File | { thumbnail: string })[]>([]);

  // handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files].slice(0, limit)); // enforce limit
    }
  };

  // initialize with existing images
  useEffect(() => {
    if (getImage?.length) {
      setImages(getImage);
    }
  }, [getImage]);

  // optional delete handler
  const handleDelete = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {images.length === 0 ? (
        <label
          htmlFor="images"
          className="flex h-64 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-sm text-gray-500"
        >
          <div className="flex flex-col items-center space-y-1">
            <div className="flex gap-3">
              <span className="rounded text-secondary px-2 py-1 text-md flex flex-col items-center font-medium dark:text-primary">
                <IoIosCloudUpload className="w-5 h-5" />
                Upload new
              </span>
              <span className="text-xs">
                <ModelGallery setGetImage={setImages} />
              </span>
            </div>
            <p className="text-xs">Accepts images</p>
          </div>
        </label>
      ) : (
        <div className="flex gap-2 flex-wrap h-64 overflow-auto">
          {images.map((file, idx) => {
            const src =
              file instanceof File ? URL.createObjectURL(file) : file.thumbnail;

            return (
              <FormImage
                key={idx}
                src={src}
                onDelete={() => handleDelete(idx)} // ✅ delete works now
              />
            );
          })}

          {images.length < limit && (
            <label
              htmlFor="images"
              className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-2xl text-gray-400 w-24 h-24"
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
        id="images"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImages;
