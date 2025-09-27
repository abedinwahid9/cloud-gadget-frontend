"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SideInfo from "./SideInfo";
import OrderStatus from "./OrderStatus";

type OrderItem = {
  id: number;
  name: string;
  sku: string;
  price: number;
  qty: number;
};

const orderData: OrderItem[] = [
  {
    id: 1,
    name: "Smartphone X Pro",
    sku: "SKU: SMX-PRO-256",
    price: 899.99,
    qty: 1,
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    sku: "SKU: WES-PRO-202",
    price: 129.99,
    qty: 1,
  },
  {
    id: 3,
    name: "4K Ultra-HD TV",
    sku: "SKU: UHD-55-4K",
    price: 799.0,
    qty: 1,
  },
  {
    id: 4,
    name: "Fitness Tracker",
    sku: "SKU: FIT-TRAC-02",
    price: 79.99,
    qty: 2,
  },
  {
    id: 5,
    name: 'External Monitor 27"',
    sku: "SKU: EXT-MON-27QHD",
    price: 299.99,
    qty: 1,
  },
];

// Column definitions
const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>${row.original.price.toFixed(2)}</span>,
  },
  {
    accessorKey: "qty",
    header: "Qty",
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) => (
      <span>${(row.original.price * row.original.qty).toFixed(2)}</span>
    ),
  },
];

const OrderDetails = () => {
  const table = useReactTable({
    data: orderData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mx-auto space-y-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order #10025</h2>
        <div className="space-x-2">
          <Button variant="destructive">Print</Button>
          <Button>Save as PDF</Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Apr 17, 2025, 5:40 PM (LST)
      </p>

      <div className="flex flex-col lg:flex-row gap-2">
        {/* Order Table */}
        <Card className="lg:w-2/3 w-full bg-primary/20">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      No data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Totals */}
            <div className="mt-4 w-full sm:w-1/2 ml-auto">
              <div className="flex justify-between py-1">
                <span>Sub Total:</span>
                <span>$2,288.95</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Discount (20%):</span>
                <span>-$457.79</span>
              </div>
              <div className="flex justify-between py-1">
                <span>VAT (7.5%):</span>
                <span>$137.34</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping Charge:</span>
                <span>$250.00</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span>Total:</span>
                <span>$2,218.50</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Rebate:</span>
                <span>-$0.50</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-lg">
                <span>Payable Amount:</span>
                <span>$2,218.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side Info */}
        <div className="lg:w-1/3 w-full flex flex-col gap-2">
          <SideInfo />
        </div>
      </div>
      <OrderStatus />
    </div>
  );
};

export default OrderDetails;
