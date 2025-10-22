"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Title from "@/components/share/Title/Title";
import ComboBox from "@/components/share/ComboBox/ComboBox";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { IoIosCloudUpload } from "react-icons/io";
import InputColor from "../Components/InputColor";
import FormImage from "../Components/FormImage";
import InputText from "../Components/InputText";
import DetailsEditor from "@/components/DetailsEditor/DetailsEditor";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import ModelGallery from "../Content/ModelGallery";
import { useSelector } from "react-redux";

type Variant = { name: string; options: string | string[] };

type FormValues = {
  title: string;
  description: string;
  price: number | string;
  discount?: number | undefined | string;
  stock_quantity: number | string;
  tags: string;
  category: string;
  sub_category?: string | undefined;
  variants: Variant[];
};

interface RootState {
  imageSelete: {
    imageSelected: {
      addproduct: [];
    };
  };
}

type Variants = { id: string; category: string; value: string; label: string };

const AddProductPage = () => {
  const [images, setImages] = useState<string[]>([]);

  const selectedImages = useSelector(
    (state: RootState) => state.imageSelete.imageSelected.addproduct
  );

  // ✅ Sync Redux with local state
  useEffect(() => {
    if (Array.isArray(selectedImages)) {
      setImages(selectedImages);
    }
  }, [selectedImages]);

  const methods = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      discount: "",
      stock_quantity: "",
      tags: "",
      category: "",
      sub_category: "",
      variants: [{ name: "", options: [] }],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const axiosPublic = useAxiosPublic();

  const variantOptions: Variants[] = [
    { id: "1", category: "color", value: "color", label: "color" },
    { id: "2", category: "size", value: "size", label: "size" },
    { id: "3", category: "material", value: "material", label: "material" },
  ];

  const filterData = () => {
    const variantsValue = watch("variants").map((v) => v.name);

    const filter = variantOptions.filter(
      (v) => !variantsValue.includes(v.label)
    );

    return filter;
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const { data: category } = useQuery({
    queryKey: ["addCategory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data.allCategory;
    },
  });
  const { data: subCategory } = useQuery({
    queryKey: ["sub-Category"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sub-category");
      return res.data.sub_cate;
    },
  });

  // ✅ Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const formData = new FormData();
    formData.append("files", e.target.files[0]);

    try {
      const upload = await axiosPublic.post("/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploaded = upload.data?.files?.[0]?.path;

      if (uploaded) {
        setImages((prev) => [...prev, uploaded]);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }

    e.target.value = "";
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const product = {
        ...data,
        price: Number(data.price) || 0,
        discount: Number(data.discount) || 0,
        stock_quantity: Number(data.stock_quantity) || 0,
        images,
        tags: data.tags.split(","),
        status: true,
      };
      console.log(product);
      const res = await axiosPublic.post("/product", product, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // preview image delete
  const handleDelete = (id: number) => {
    const filter = images.filter((_, i) => i !== id);
    setImages(filter);
  };

  const CartStyle =
    "bg-primary/20 dark:bg-blue-300/20 border border-gray-200 dark:border-gray-700 shadow-[0px_0px_10px_0px_#00a8a8]";

  return (
    <div>
      <FormProvider {...methods}>
        <Title text="Add New Product" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 pt-2">
          {/* Basic Info */}
          <div className="flex gap-2 md:flex-row flex-col">
            <Card className={`w-full md:w-2/3 ${CartStyle}`}>
              <CardContent className="space-y-6 px-2">
                {/* Title */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="title"
                    className="text-secondary font-bold dark:text-nav underline"
                  >
                    Product Title
                  </Label>
                  <Input
                    id="title"
                    className="text-primary"
                    placeholder="e.g., Wireless Noise-Canceling Headphones"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="images"
                    className="text-secondary font-bold dark:text-nav underline"
                  >
                    Product Images
                  </Label>
                  {images?.length === 0 ? (
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
                            <ModelGallery imageIndex={`addproduct`} />
                          </span>
                        </div>
                        <p className="text-xs">Accepts images</p>
                      </div>
                    </label>
                  ) : (
                    <div className="grid gap-2 h-64 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr">
                      <div className="md:col-span-2 col-span-1 row-span-2">
                        <FormImage
                          src={images?.[0]}
                          onDelete={() => handleDelete(0)}
                        />
                      </div>
                      {images?.slice(1).map((file, idx) => (
                        <FormImage
                          key={idx}
                          src={file}
                          onDelete={() => handleDelete(idx + 1)}
                        />
                      ))}
                      <label
                        htmlFor="images"
                        className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-2xl text-gray-400"
                      >
                        +
                      </label>
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

                {/* Description */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="description"
                    className="text-secondary font-bold dark:text-nav underline"
                  >
                    Product Description
                  </Label>
                  <DetailsEditor />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Organization */}
            <Card className={`${CartStyle} w-full md:w-1/3`}>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label className="text-secondary font-bold dark:text-nav underline">
                    Categories
                  </Label>
                  <ComboBox
                    title="Categories"
                    categories={category || []}
                    value={watch("category") || ""}
                    onChange={(val) => setValue("category", val.label)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-secondary font-bold dark:text-nav underline">
                    Subcategory (Optional)
                  </Label>
                  <ComboBox
                    title="Categories"
                    categories={subCategory || []}
                    value={watch("sub_category") || ""}
                    onChange={(val) => setValue("sub_category", val.label)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="tags"
                    className="text-secondary font-bold dark:text-nav underline"
                  >
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    className="text-primary"
                    placeholder="e.g., bluetooth, 5g, gaming"
                    {...register("tags")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing & Stock */}
          <Card className={CartStyle}>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3   gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="price"
                  className="text-secondary font-bold dark:text-nav underline"
                >
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  className="text-primary"
                  placeholder="0.00"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="discountedPrice"
                  className="text-secondary font-bold dark:text-nav underline"
                >
                  Compare at Price (Optional)
                </Label>
                <Input
                  id="discountedPrice"
                  type="number"
                  step="0.01"
                  className="text-primary"
                  placeholder="0.00"
                  {...register("discount")}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="stock"
                  className="text-secondary font-bold dark:text-nav underline"
                >
                  Stock Quantity
                </Label>
                <Input
                  id="stock"
                  type="number"
                  className="text-primary"
                  placeholder="100"
                  {...register("stock_quantity", {
                    required: "Stock is required",
                  })}
                />
                {errors.stock_quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.stock_quantity.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card className={CartStyle}>
            <CardHeader>
              <CardTitle>Variants & Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid sm:grid-cols-2 gap-4 border p-4 rounded-md"
                >
                  <div className="grid gap-2">
                    <Label>
                      {watch(`variants.${index}.name`).toUpperCase() ||
                        "OPTION"}
                      S
                    </Label>
                    <ComboBox
                      title="variants"
                      categories={filterData()}
                      value={watch(`variants.${index}.name`) || ""}
                      onChange={(val) => {
                        setValue(`variants.${index}.name`, val.label);
                        setValue(`variants.${index}.options`, []);
                      }}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label className="uppercase">
                      selete{" "}
                      {watch(`variants.${index}.name`).toUpperCase() ||
                        "OPTION"}
                      S values
                    </Label>
                    {watch(`variants.${index}.name`) === "color" ? (
                      <InputColor index={index} />
                    ) : (
                      <InputText index={index} />
                    )}
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              {fields.length < 3 && (
                <CustomBtn
                  type="button"
                  title="Add Another Option"
                  handleBtn={() => append({ name: "", options: "" })}
                />
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end w-full">
            <CustomBtn
              title="Save Product"
              type="submit"
              className="rounded-lg w-full"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProductPage;
