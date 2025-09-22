// pages/dashboard/add-product.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Title from "@/components/share/Title/Title";
import Image from "next/image";
import ComboBox from "@/components/share/ComboBox/ComboBox";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { IoIosCloudUpload } from "react-icons/io";
import InputColor from "../Components/InputColor";

type Variant = { name: string; options: string | string[] };

type FormValues = {
  title: string;
  description: string;
  price: string;
  discountedPrice?: string;
  stock: string;
  tags: string;
  category: string;
  subcategory?: string;
  variants: Variant[];
};

type Variants = { category: string; value: string; label: string };

const AddProductPage = () => {
  const [images, setImages] = useState<File[]>([]);

  const methods = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      discountedPrice: "",
      stock: "",
      tags: "",
      category: "",
      subcategory: "",
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

  const variantOptions: Variants[] = [
    { category: "color", value: "color", label: "color" },
    { category: "size", value: "size", label: "size" },
    { category: "material", value: "material", label: "material" },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const filterData = () => {
    const variantsValue = watch("variants").map((v) => v.name);
    const filter = variantOptions.filter(
      (v) => !variantsValue.includes(v.value)
    );

    return filter;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log("Submitting product:", { ...data, images });
  };

  const categories = [
    { category: "Electronics", value: "electronics", label: "Electronics" },
    {
      category: "Apparel & Accessories",
      value: "apparel-accessories",
      label: "Apparel & Accessories",
    },
    { category: "Home & Garden", value: "home-garden", label: "Home & Garden" },
    {
      category: "Health & Beauty",
      value: "health-beauty",
      label: "Health & Beauty",
    },
    { category: "Books & Media", value: "books-media", label: "Books & Media" },
  ];

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
                  {images.length === 0 ? (
                    <label
                      htmlFor="images"
                      className="flex h-64 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span className="rounded text-secondary px-2 py-1 text-md flex flex-col items-center font-medium">
                          <IoIosCloudUpload className="w-7 h-7" />
                          Upload new
                        </span>
                        <span className="text-xs">Select existing</span>
                        <p className="text-xs">Accepts images</p>
                      </div>
                    </label>
                  ) : (
                    <div className="grid gap-2 h-64 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr">
                      <div className="md:col-span-2 col-span-1 row-span-2">
                        <div className="h-full w-full overflow-hidden rounded-md border">
                          <Image
                            width={0}
                            height={0}
                            src={URL.createObjectURL(images[0])}
                            alt="preview"
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                      {images.slice(1).map((file, idx) => (
                        <div
                          key={idx}
                          className="overflow-hidden rounded-md border"
                        >
                          <Image
                            width={0}
                            height={0}
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="h-full w-full object-contain"
                          />
                        </div>
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
                  <Textarea
                    id="description"
                    className="text-primary"
                    placeholder="Describe your product features and specifications."
                    rows={6}
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
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
                    categories={categories}
                    value={watch("category") || ""}
                    onChange={(val) => setValue("category", val)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-secondary font-bold dark:text-nav underline">
                    Subcategory (Optional)
                  </Label>
                  <ComboBox
                    title="Categories"
                    categories={categories}
                    value={watch("subcategory") || ""}
                    onChange={(val) => setValue("subcategory", val)}
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
                  {...register("discountedPrice")}
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
                  {...register("stock", { required: "Stock is required" })}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock.message}</p>
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
                      onChange={(val) =>
                        setValue(`variants.${index}.name`, val)
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>
                      {watch(`variants.${index}.name`).toUpperCase() ||
                        "OPTION"}{" "}
                      VALUES
                    </Label>
                    <InputColor index={index} />
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
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append({ name: "", options: "" })}
                >
                  Add Another Option
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end w-full">
            <CustomBtn
              title="Save Product"
              type="submit"
              className="rounded-lg"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProductPage;
