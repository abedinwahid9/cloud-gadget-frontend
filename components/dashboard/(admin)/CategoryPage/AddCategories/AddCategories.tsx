import React from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { X } from "lucide-react";
import UploadImages from "@/components/share/UploadImages/UploadImages";
import { generateSlug } from "@/lib/utils/generateSlug";

// Form type
type FormValues = {
  categories: {
    value: string;
    label: string;
    slug: string;
    images?: File[];
  }[];
};

// ✅ Shared type for Category state
export interface Cates {
  value: string;
  label: string;
  slug: string;
  images?: File[];
}

interface AddCategoriesProps {
  setCategory: React.Dispatch<React.SetStateAction<Cates[]>>;
}

const AddCategories: React.FC<AddCategoriesProps> = ({ setCategory }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      categories: [{ value: "", label: "", slug: "", images: [] }],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const filtered = data.categories
      .map((c) => {
        const val = c.value.trim();
        if (!val) return null;
        return {
          value: val,
          label: val,
          slug: generateSlug(val),
          images: c.images ?? [],
        };
      })
      .filter(Boolean) as Cates[];

    setCategory((prev) => [...prev, ...filtered]);
    console.log("Final Categories:", filtered);
    // reset();
  };

  return (
    <Card className="bg-primary/20 shadow-[0px_0px_10px_0px_#00a8a8] dark:bg-blue-300/20 gap-3 border border-gray-200 dark:border-gray-700 p-4">
      <CardHeader>
        <CardTitle className="text-secondary font-semibold text-lg dark:text-nav underline">
          Add Categories
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2 items-center flex-col border p-2 rounded-md"
              >
                {/* Upload images for each category */}
                <UploadImages fieldName="categories" index={index} />
                {/* Category Input */}
                <div className="flex gap-2 items-center w-full">
                  <Input
                    {...register(`categories.${index}.value`, {
                      required: "category must be required",
                    })}
                    placeholder="Category Name"
                    className="text-secondary placeholder:text-primary"
                  />
                  <Button
                    type="button"
                    className="bg-transparent hover:bg-badge hover:text-white font-bold"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <X />
                  </Button>{" "}
                </div>{" "}
                <div className="w-full text-start">
                  {errors.categories?.[index]?.value && (
                    <p className="text-red-500 text-sm in">
                      {errors?.categories?.[index].value.message}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <CustomBtn
                handleBtn={() =>
                  append({ value: "", label: "", slug: "", images: [] })
                }
                title="Add Category +"
                className="rounded-md"
                type="button"
              />
              <CustomBtn
                title="Save Categories"
                className="rounded-md"
                type="submit"
              />
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default AddCategories;
