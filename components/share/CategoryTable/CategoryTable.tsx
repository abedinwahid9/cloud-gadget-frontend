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
import { toast } from "sonner";
import Image, { StaticImageData } from "next/image";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";

interface SubCategory {
  id: string;
  label: string;
}

interface Category {
  id: string;
  label: string;
  subCategory: SubCategory[];
  image?: string | StaticImageData;
}

// interface CategoryTableProps {
//   onEditCategory?: (id: string) => void;
//   onDeleteCategory?: (id: string) => void;
//   onEditSubCategory?: (catId: string, subId: string) => void;
//   onDeleteSubCategory?: (catId: string, subId: string) => void;
// }

const CategoryTable = (
  {
    // onEditCategory,
    // onDeleteCategory,
    // onEditSubCategory,
    // onDeleteSubCategory,
  }
) => {
  const axiosPublic = useAxiosPublic();

  // fetch data
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category/merge");
      return res.data.categories;
    },
    refetchInterval: 5000,
  });

  // ✅ Confirm toast helper
  const confirmToast = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    toast.custom(
      (id) => (
        <div className="bg-white text-gray-900 rounded-lg shadow-lg p-4 w-[320px] flex flex-col gap-3 border">
          <p className="font-semibold">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(id);
                onCancel?.();
                toast("Cancelled ❌", {
                  position: "top-center",
                  style: {
                    backgroundColor: "#aacec8",
                    color: "#004030",
                  },
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                });
              }}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(id);
                onConfirm();
                toast.success("Deleted ✅", {
                  position: "top-center",
                  style: {
                    backgroundColor: "#aacec8",
                    color: "#004030",
                  },
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                });
              }}
              className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 text-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { position: "top-center" }
    );
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Category",
      cell: ({ row }) => {
        const cat = row.original;
        console.log(cat);
        return (
          <div className="flex items-center gap-2">
            {cat.image && (
              <Image src={cat.image} width={70} height={30} alt="category" />
            )}
            <span className="font-medium">{cat.label}</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-primary"
                // onClick={() => onEditCategory(cat.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-primary"
                // onClick={() =>
                //   confirmToast("Delete this category?", () =>
                //     onDeleteCategory(cat.id)
                //   )
                // }
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
                className="flex items-center justify-between gap-2 border p-1 rounded-md bg-primary/20"
              >
                <span>{sub.label}</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-primary"
                    // onClick={() => onEditSubCategory(cat.id, sub.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-primary"
                    // onClick={() =>
                    //   confirmToast("Delete this sub-category?", () =>
                    //     onDeleteSubCategory(cat.id, sub.id)
                    //   )
                    // }
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
    return <p>loading...</p>;
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-primary/20">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="text-secondary font-semibold text-lg dark:text-nav underline"
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
              <TableRow className="text-secondary  dark:text-nav " key={row.id}>
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
