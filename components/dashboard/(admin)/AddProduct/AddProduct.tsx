// pages/dashboard/add-product.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Title from "@/components/share/Title/Title";
import Image from "next/image";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    price: "",
    discountedPrice: "",
    stock: "",
    variants: [{ name: "", options: "" }],
    category: "",
    subcategory: "",
    tags: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVariantChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVariants = [...formData.variants];
    newVariants[index][e.target.name] = e.target.value;
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: "", options: "" }],
    });
  };

  const removeVariant = (index: number) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting product:", formData);
  };

  return (
    <div>
      <Title text="Add New Product" />
      <form onSubmit={handleFormSubmit} className="space-y-2 pt-2">
        {/* Basic Info */}
        <Card>
          <CardContent className="space-y-6 px-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Wireless Noise-Canceling Headphones"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* image */}
            <div className="grid gap-2">
              <Label htmlFor="images">Product Images</Label>

              {/* When no image uploaded → Show 1st design */}
              {images.length === 0 ? (
                <label
                  htmlFor="images"
                  className="flex h-64 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      type="button"
                      className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
                    >
                      Upload new
                    </button>
                    <span className="text-xs">Select existing</span>
                    <p className="text-xs">Accepts images</p>
                  </div>
                </label>
              ) : (
                <div className="grid gap-2 h-64 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr">
                  {/* First image → big preview */}
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

                  {/* Other images */}
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

                  {/* Add new button */}
                  <label
                    htmlFor="images"
                    className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-2xl text-gray-400"
                  >
                    +
                  </label>
                </div>
              )}

              {/* hidden input */}
              <input
                type="file"
                multiple
                id="images"
                name="images"
                className="hidden"
                onChange={handleFileChange}
              />

              <p className="text-sm text-muted-foreground">
                Upload multiple images to showcase your product.
              </p>
            </div>
            {/* product description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your product features and specifications."
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Stock */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discountedPrice">
                Compare at Price (Optional)
              </Label>
              <Input
                id="discountedPrice"
                name="discountedPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.discountedPrice}
                onChange={handleInputChange}
              />
              <p className="text-sm text-muted-foreground">
                Shows a discount by striking through the old price.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="100"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Variants & Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Add variants like color, size, or storage. Separate multiple
              options with commas.
            </p>
            {formData.variants.map((variant, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-2 gap-4 border p-4 rounded-md relative"
              >
                <div className="grid gap-2">
                  <Label htmlFor={`variant-name-${index}`}>Option Name</Label>
                  <Input
                    id={`variant-name-${index}`}
                    name="name"
                    placeholder="e.g., Color"
                    value={variant.name}
                    onChange={(e) => handleVariantChange(index, e)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`variant-options-${index}`}>
                    Option Values
                  </Label>
                  <Input
                    id={`variant-options-${index}`}
                    name="options"
                    placeholder="e.g., Black, Silver, Blue"
                    value={variant.options}
                    onChange={(e) => handleVariantChange(index, e)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeVariant(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={addVariant}>
              Add Another Option
            </Button>
          </CardContent>
        </Card>

        {/* Organization */}
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphones">Smartphones</SelectItem>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="audio">Audio Devices</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subcategory">Subcategory (Optional)</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, subcategory: value })
                }
                value={formData.subcategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="headphones">Headphones</SelectItem>
                  <SelectItem value="earbuds">Earbuds</SelectItem>
                  <SelectItem value="smartwatches">Smartwatches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g., bluetooth, 5g, gaming"
                value={formData.tags}
                onChange={handleInputChange}
              />
              <p className="text-sm text-muted-foreground">
                Separate tags with commas for better search visibility.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="px-8">
            Save Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
