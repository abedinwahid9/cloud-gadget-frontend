"use client";
import React, { useState, useEffect } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import FormImage from "@/components/dashboard/(admin)/Components/FormImage";
import ModelGallery from "@/components/dashboard/(admin)/Content/ModelGallery";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useSelector } from "react-redux";
import { removeSingleImage } from "@/lib/redux/slices/imageSeletedSlices";
import { useAppDispatch } from "@/lib/redux/hooks";

interface UploadImagesProps {
  value?: string;
  onChange?: (value: string) => void;
  index: number;
  sizeNote?: string;
  getImage?: { thumbnail: string }[];
  limit?: number;
}

interface RootState {
  imageSelete: {
    imageSelected: string[];
  };
}

const UploadImages: React.FC<UploadImagesProps> = ({
  value = "",
  onChange,
  index,
  limit = 1,
}) => {
  const axiosPublic = useAxiosPublic();
  const [image, setImage] = useState<string>(value);
  const imageSelete = useSelector(
    (state: RootState) => state.imageSelete.imageSelected
  );
  const dispatch = useAppDispatch();

  // Keep local state in sync with form value
  useEffect(() => {
    if (!value && imageSelete.length > 0) {
      setImage(imageSelete[0]);
      onChange?.(imageSelete[0]);
    } else {
      setImage(value);
    }
  }, [value, imageSelete]);

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const formData = new FormData();
    formData.append("files", e.target.files[0]); // single file only

    try {
      const upload = await axiosPublic.post("/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploaded = upload.data?.files?.[0]?.path;
      if (uploaded) {
        setImage(uploaded);
        onChange?.(uploaded);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }

    e.target.value = "";
  };

  const handleDelete = () => {
    if (imageSelete.length > 0) {
      dispatch(removeSingleImage(image));
    }
    setImage("");
    onChange?.("");
  };

  return (
    <>
      {!image ? (
        <label
          htmlFor={`images-${index}`}
          className="flex h-64 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-sm text-gray-500"
        >
          <div className="flex flex-col items-center space-y-1">
            <div className="flex gap-3">
              <span className="rounded text-secondary px-2 py-1 text-md flex flex-col items-center font-medium dark:text-primary">
                <IoIosCloudUpload className="w-5 h-5" />
                Upload new
              </span>
              <span className="text-xs">
                <ModelGallery />
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
              htmlFor={`images-${index}`}
              className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-2xl text-gray-400 w-24 h-24"
            >
              +
            </label>
          )}
        </div>
      )}

      <input
        accept=".jpg,.jpeg,.png,.gif"
        type="file"
        id={`images-${index}`}
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadImages;
