"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Sheet } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import img1 from "@/app/assets/img1.png";
import { Switch } from "@/components/ui/switch";
import CustomBtn from "@/components/share/CustomBtn/CustomBtn";
import { CiEdit } from "react-icons/ci";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";
import { CardStyle } from "@/lib/utils/customCss";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmToast from "@/components/share/ToastCustom/ConfirmToast";
import { Spinner } from "@/components/ui/spinner";
import ToastCustom from "@/components/share/ToastCustom/ToastCustom";
import StatusSwitch from "@/components/share/StatusSwitch/StatusSwitch";

// --- Product type ---
type Product = {
  productId: string;
  id: number;
  title: string;
  category: string;
  stock_quantity: string;
  price: number;
  discount: number;
  status: boolean;
  variants?: Array<{
    name: string;
    options: string[];
  }>;
  images: string[];
};

// --- Helpers ---
// const getStockClass = (stock: string) => {
//   if (stock.includes("Out")) return "text-red-500 font-medium";
//   if (stock.includes("Low")) return "text-orange-500 font-medium";
//   return "text-green-500 font-medium";
// };

const calculateDiscountPrice = ({
  value,
  percentage,
}: {
  value: number;
  percentage: number;
}) => {
  const discountAmount = value * (percentage / 100);
  if (discountAmount === 0) {
    return 0;
  }
  return Math.floor(value - discountAmount);
};

// --- Columns generator ---
const getColumns = (
  switchStates: Record<number, boolean>,
  refetch: () => void,
  handleProductDelete: (id: number) => Promise<boolean | undefined>
): ColumnDef<Product>[] => [
  {
    accessorKey: "productId",
    header: "Product ID",
    cell: ({ row }) => <span>{row.original.productId}</span>,
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.images[0] ? (
          <Image
            src={row.original.images[0]}
            alt={row.original.title}
            width={40}
            height={40}
            className="rounded-md"
          />
        ) : (
          <Spinner className="size-6" />
        )}
        <span className="font-medium text-wrap truncate w-28">
          {row.original.title}
        </span>
      </div>
    ),
  },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "sub_category", header: "Sub Category" },
  { accessorKey: "collections", header: "Category" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>${row.original.price}</span>,
  },
  {
    accessorKey: "discountPercentage",
    header: "Discounted Price",
    cell: ({ row }) => (
      <span className="text-green-600 font-semibold">
        $
        {calculateDiscountPrice({
          value: row.original.price,
          percentage: row.original.discount,
        })}{" "}
        <span className="text-gray-500 text-xs">
          ({row.original.discount}% off)
        </span>
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <span
      //  className={getStockClass(row.original.stock_quantity)}
      >
        {row.original.stock_quantity}
      </span>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const variants = row.original.variants || [];
      const colorVariant = variants.find((v) => v.name === "color");

      return (
        <div className="flex gap-1">
          {colorVariant?.options?.map((color: string) => (
            <div
              key={color}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusSwitch
        refetch={refetch}
        status={row.original.status}
        id={row.original.id}
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-primary/85 backdrop:blur-xl text-text border-2 border-primary
         font-bold text-lg p-2 space-y-1 rounded-lg "
        >
          <DropdownMenuItem>
            <Link
              className="hover:underline  hover:text-primary hover:bg-nav  px-3 py-1 rounded-md flex items-center gap-2"
              href={`/admin/products/edit-product/${row.original.id}`}
            >
              <CiEdit /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              ConfirmToast(`${row.original.title} will be delete`, async () => {
                return await handleProductDelete(row.original.id);
              })
            }
            className="hover:underline  flex items-center gap-1"
          >
            <span className="hover:bg-nav hover:underline hover:text-primary px-3 py-1 rounded-md flex items-center gap-2">
              <RiDeleteBin5Line /> Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// --- Page Component ---
const ProductListPage = ({ title }: { title: string }) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [switchStates, setSwitchStates] = React.useState<
    Record<number, boolean>
  >({});

  const axiosPublic = useAxiosPublic();

  // product data fetching
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products-all"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data.allProduct;
    },
  });

  // delete product function
  const handleProductDelete = async (id: number) => {
    try {
      const res = await axiosPublic.delete(`/product/${id}`);
      if (res.status === 203) {
        refetch();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = React.useMemo(
    () => getColumns(switchStates, refetch, handleProductDelete),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [switchStates]
  );

  const table = useReactTable({
    data: products,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(products.length / pagination.pageSize),
  });

  // if no data showing skeleton
  if (isLoading && products.length === 0) {
    return (
      <Skeleton className="w-full h-full bg-primary/10 space-y-5">
        <div className="flex justify-between  px-4 pt-6">
          <Skeleton className="w-40 h-6 bg-primary/50"></Skeleton>
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <Skeleton
                  key={i}
                  className="w-30 h-10 bg-primary/50"
                ></Skeleton>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between px-4">
          <Skeleton className="w-48 h-6 bg-primary/50"></Skeleton>
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => {
              return (
                <Skeleton
                  key={i}
                  className="w-30 h-10 bg-primary/50"
                ></Skeleton>
              );
            })}
          </div>
        </div>
        <Skeleton className=" px-4  space-y-1">
          <Skeleton className="flex bg-primary/30 p-3 justify-around">
            {Array.from({ length: 6 }).map((_, i) => {
              return (
                <Skeleton key={i} className="w-30 h-4 bg-primary/50"></Skeleton>
              );
            })}
          </Skeleton>
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <Skeleton
                key={i}
                className="flex bg-primary/30 p-1.5 items-center justify-around"
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  return (
                    <Skeleton
                      key={i}
                      className="w-30 h-4 bg-primary/50"
                    ></Skeleton>
                  );
                })}
                <Skeleton className="w-8 h-8 bg-primary/50"></Skeleton>
              </Skeleton>
            );
          })}
        </Skeleton>
      </Skeleton>
    );
  }

  return (
    <Card className={CardStyle}>
      {/* Header */}
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <CardTitle className="text-lg md:text-xl font-bold text-primary">
          {title}
        </CardTitle>

        <div className="flex gap-2">
          <CustomBtn className="rounded-md" title="Import" />
          <CustomBtn className="rounded-md" title="Export" />
          {/* <Link className="w-full" href="/admin/products/add-product"> */}
          <CustomBtn className="rounded-md w-36" title="add product" />
          {/* </Link> */}
        </div>
      </CardHeader>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 pb-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            Status
          </Button>
          <Button variant="outline" size="sm">
            Category
          </Button>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <CardContent>
        <div className="w-full ">
          <Table>
            <TableHeader className="bg-secondary/20 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-primary font-semibold text-lg dark:text-nav underline"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="text-secondary  dark:text-nav "
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {products.length > 10 && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-2 py-4 border-t mt-4">
            <div className="text-sm text-primary">
              Showing {pagination.pageIndex * pagination.pageSize + 1}–
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                products.length
              )}{" "}
              of {products.length} products
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                className="bg-secondary/40 hover:bg-primary/30"
                variant="outline"
                size="sm"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                Previous
              </Button>
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <Button
                  key={i}
                  variant={i === pagination.pageIndex ? "default" : "outline"}
                  size="sm"
                  className="hover:bg-secondary/10 text-secondary"
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                className="bg-secondary/40 hover:bg-primary/30"
                variant="outline"
                size="sm"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductListPage;
