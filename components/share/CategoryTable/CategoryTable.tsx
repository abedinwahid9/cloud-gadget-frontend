"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image, { StaticImageData } from "next/image";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmToast from "../ToastCustom/ConfirmToast";

interface SubCategory {
  id: string;
  label: string;
  image: string;
}

interface Category {
  id: string;
  label: string;
  subCategory: SubCategory[];
  image?: string | StaticImageData;
}

const CategoryTable = () => {
  const axiosPublic = useAxiosPublic();

  // fetch data
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories-marge"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category/merge");
      return res.data.categories;
    },
    refetchInterval: 5000,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  console.log(data);

  // ✅ Confirm toast helper
  // const confirmToast = (
  //   message: string,
  //   onConfirm: () => void,
  //   onCancel?: () => void
  // ) => {
  //   toast.custom(
  //     (id) => (
  //       <div className="bg-white text-gray-900 rounded-lg shadow-lg p-4 w-[320px] flex flex-col gap-3 border">
  //         <p className="font-semibold">{message}</p>
  //         <div className="flex justify-end gap-2">
  //           <button
  //             onClick={() => {
  //               toast.dismiss(id);
  //               onCancel?.();
  //               toast("Cancelled ❌", {
  //                 position: "top-center",
  //                 style: {
  //                   backgroundColor: "#aacec8",
  //                   color: "#004030",
  //                 },
  //                 action: {
  //                   label: "Undo",
  //                   onClick: () => console.log("Undo"),
  //                 },
  //               });
  //             }}
  //             className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             onClick={() => {
  //               toast.dismiss(id);
  //               onConfirm();
  //               toast.success("Deleted ✅", {
  //                 position: "top-center",
  //                 style: {
  //                   backgroundColor: "#aacec8",
  //                   color: "#004030",
  //                 },
  //                 action: {
  //                   label: "Undo",
  //                   onClick: () => console.log("Undo"),
  //                 },
  //               });
  //             }}
  //             className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 text-sm"
  //           >
  //             Confirm
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //     { position: "top-center" }
  //   );
  // };

  // delete category
  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await axiosPublic.delete(`/category/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // delete sub category
  const handleDeleteSubCategory = async (id: string) => {
    try {
      const res = await axiosPublic.delete(`/sub-category/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Category",
      cell: ({ row }) => {
        const cat = row.original;

        return (
          <div className="flex items-center gap-2">
            <div className="w-20 h-16">
              {cat.image && (
                <Image
                  className="object-contain w-full h-full"
                  src={cat.image}
                  width={500}
                  height={500}
                  alt="category"
                />
              )}
            </div>
            <span className="font-medium">{cat.label}</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-secondary"
                // onClick={() => onEditCategory(cat.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-secondary"
                onClick={() =>
                  ConfirmToast(`Delete ${cat.label} category?`, () =>
                    handleDeleteCategory(cat.id)
                  )
                }
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "subCategories",
      header: "Sub-Categories",
      cell: ({ row }) => {
        const cat = row.original;

        return (
          <div className="flex flex-col gap-1">
            {cat.subCategory.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between gap-2 border p-1 rounded-md bg-secondary/20"
              >
                <div className="w-20 h-16">
                  {sub.image && (
                    <Image
                      className="object-contain w-full h-full"
                      src={sub.image}
                      width={500}
                      height={500}
                      alt="subcategory"
                    />
                  )}
                </div>
                <span>{sub.label}</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-secondary"
                    // onClick={() => onEditSubCategory(cat.id, sub.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-secondary"
                    onClick={() =>
                      ConfirmToast(`Delete ${sub.label} sub-category?`, () =>
                        handleDeleteSubCategory(sub.id)
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (isLoading) {
    return (
      <div className=" space-y-2 bg-primary/5 p-2 ">
        <Skeleton className="h-10 rounded-s-sm w-full bg-primary/20 flex items-center ">
          <div className="w-1/2 px-2">
            <Skeleton className="h-6 w-1/2 bg-primary/20 rounded-md" />
          </div>
          <div className="w-1/2 px-5">
            <Skeleton className="h-6 w-1/2 bg-primary/20 rounded-md" />
          </div>
        </Skeleton>

        {Array.from({ length: 8 }).map((_, i) => {
          return (
            <div key={i} className="gap-2 flex">
              <Skeleton className="h-16 w-1/2 bg-primary/20 px-2 flex items-center gap-2">
                <Skeleton className="h-12 w-20 bg-primary/20 rounded-md" />
                <Skeleton className="h-6 w-20 bg-primary/20 rounded-md" />
                <Skeleton className="h-9 w-9 bg-primary/20 rounded-md" />
                <Skeleton className="h-9 w-9 bg-primary/20 rounded-md" />
              </Skeleton>
              <Skeleton className="h-16 w-1/2 bg-primary/20 px-2 flex items-center gap-2 justify-between">
                <Skeleton className="h-6 w-20 bg-primary/20 rounded-md" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9 bg-primary/20 rounded-md" />
                  <Skeleton className="h-9 w-9 bg-primary/20 rounded-md" />
                </div>
              </Skeleton>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="rounded-md border p-2">
      <Table>
        <TableHeader className="bg-secondary/20 rounded-3xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="text-primary font-semibold text-lg dark:text-nav underline"
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="text-primary  dark:text-nav " key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
