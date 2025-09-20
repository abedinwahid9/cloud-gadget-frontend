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

import AddProduct from "../AddProduct/AddProduct";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// --- Product type ---
type Product = {
  id: number;
  name: string;
  category: string;
  stock: string;
  price: number;
  discountPercentage: number;
  status: string;
  image: StaticImageData;
};

// --- Sample data ---
const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 2 === 0 ? "Clothes" : "Gadget",
  stock: i % 3 === 0 ? "Out of Stock" : "124 Low Stock",
  price: 47 * (i + 1),
  discountPercentage: 15,
  status: i % 2 === 0 ? "Published" : "Inactive",
  image: img1,
}));

// --- Helpers ---
const getStockClass = (stock: string) => {
  if (stock.includes("Out")) return "text-red-500 font-medium";
  if (stock.includes("Low")) return "text-orange-500 font-medium";
  return "text-green-500 font-medium";
};

const calculateDiscountPrice = ({
  value,
  percentage,
}: {
  value: number;
  percentage: number;
}) => {
  const discountAmount = value * (percentage / 100);
  return Math.floor(value - discountAmount);
};

// --- Columns generator ---
const getColumns = (
  switchStates: Record<number, boolean>,
  handleSwitchChange: (id: number, checked: boolean) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={40}
          height={40}
          className="rounded-md"
        />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  { accessorKey: "category", header: "Category" },
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
          percentage: row.original.discountPercentage,
        })}{" "}
        <span className="text-gray-500 text-xs">
          ({row.original.discountPercentage}% off)
        </span>
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <span className={getStockClass(row.original.stock)}>
        {row.original.stock}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <Switch
        checked={!!switchStates[row.original.id]}
        onCheckedChange={(checked) =>
          handleSwitchChange(row.original.id, checked)
        }
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
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

  const handleSwitchChange = (id: number, checked: boolean) => {
    setSwitchStates((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const columns = React.useMemo(
    () => getColumns(switchStates, handleSwitchChange),
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

  return (
    <div className="p-4">
      <Card className="border shadow-sm">
        {/* Header */}
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <CardTitle className="text-lg md:text-xl font-bold text-primary">
            {title}
          </CardTitle>

          <div className="flex gap-2">
            <CustomBtn className="rounded-md" title="Import" />
            <CustomBtn className="rounded-md" title="Export" />
            {/* <Dialog>
              <DialogTrigger>
                <CustomBtn
                  type="button"
                  className="rounded-md"
                  title="add product"
                />
              </DialogTrigger>
              <DialogContent className="bg-white absolute top-0 left w-full h-full bg-none"> */}

            {/* </DialogContent>
            </Dialog> */}
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
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader className="bg-gray-100 dark:bg-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="font-semibold">
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
                      <TableCell key={cell.id}>
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
              <div className="text-sm text-gray-500">
                Showing {pagination.pageIndex * pagination.pageSize + 1}–
                {Math.min(
                  (pagination.pageIndex + 1) * pagination.pageSize,
                  products.length
                )}{" "}
                of {products.length} products
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
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
                    onClick={() => table.setPageIndex(i)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
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
    </div>
  );
};

export default ProductListPage;
