"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import FormImage from "@/components/dashboard/(admin)/Components/FormImage";
import ModelGallery from "@/components/dashboard/(admin)/Content/ModelGallery";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/lib/redux/hooks";
import {
  removeSingleImage,
  setImageSeleted,
} from "@/lib/redux/slices/imageSeletedSlices";
import { useFormContext } from "react-hook-form";

interface UploadImagesProps {
  value?: string;
  onChange?: (value: string) => void;
  nameIndex: number | string;
  sizeNote?: string;
  getImage?: { thumbnail: string }[];
  limit?: number;
  imageIndex: string; // unique key for each image field
}

interface RootState {
  imageSelete: {
    imageSelected: Record<string, string>;
  };
}

const UploadImages: React.FC<UploadImagesProps> = ({
  value = "",
  onChange,
  nameIndex,
  limit = 1,
  imageIndex,
}) => {
  const axiosPublic = useAxiosPublic();
  const dispatch = useAppDispatch();
  const { watch } = useFormContext();

  // ✅ Get only the image that belongs to this specific imageIndex
  const selectedImage = useSelector(
    (state: RootState) => state.imageSelete.imageSelected[imageIndex]
  );

  const [image, setImage] = useState<string>(value);

  // ✅ Sync Redux and local state properly
  useEffect(() => {
    if (selectedImage && selectedImage !== image) {
      setImage(selectedImage[0]);
      onChange?.(selectedImage[0]);
    } else if (value && value !== image) {
      setImage(value);
    }
  }, [selectedImage, value]);

  // const inputRef = useRef(null);

  // ✅ Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    console.log(e.target);
    try {
      const upload = await axiosPublic.post("/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploaded = upload.data?.files?.[0]?.path;
      if (uploaded) {
        setImage(uploaded);
        onChange?.(uploaded);
        dispatch(setImageSeleted({ key: imageIndex, image: uploaded }));
      }
    } catch (error) {
      console.error("Upload error:", error);
    }

    e.target.value = "";
  };

  // ✅ Handle delete
  const handleDelete = () => {
    setImage("");
    onChange?.("");
    dispatch(removeSingleImage(imageIndex));
  };

  return (
    <>
      {!image ? (
        <label
          // ref={inputRef}
          htmlFor={`images-${imageIndex}`}
          className="flex h-64 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-sm text-gray-500"
        >
          <div className="flex flex-col items-center space-y-1">
            <div className="flex gap-3">
              <span className="rounded text-secondary px-2 py-1 text-md flex flex-col items-center font-medium dark:text-primary">
                <IoIosCloudUpload className="w-5 h-5" />
                Upload new
              </span>
              <span className="text-xs">
                <ModelGallery imageIndex={imageIndex} />
              </span>
            </div>
            <p className="text-xs">Accepts a single image</p>
          </div>
        </label>
      ) : (
        <div className="flex gap-2 flex-wrap h-64 overflow-auto">
          <FormImage src={image} onDelete={handleDelete} />

          {limit > 1 && (
            <label
              htmlFor={`images-${imageIndex}`}
              className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-2xl text-gray-400 w-24 h-24"
            >
              +
            </label>
          )}
        </div>
      )}

      <input
        accept=".jpg,.jpeg,.png,.gif,.webp"
        type="file"
        id={`images-${imageIndex}`}
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadImages;
