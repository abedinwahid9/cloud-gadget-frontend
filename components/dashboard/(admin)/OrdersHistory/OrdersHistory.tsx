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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Title from "@/components/share/Title/Title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Order = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  orderDate: string;
  deliveryDate: string;
  items: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  amount: string;
  avatar: string;
};

const data: Order[] = [
  {
    id: "#10025",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "Mobile Number",
    orderDate: "Apr 25, 2025",
    deliveryDate: "Apr 29, 2025",
    items: "3 Items",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    amount: "$129.99",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "#10026",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "+1 555-234-7890",
    orderDate: "Apr 26, 2025",
    deliveryDate: "Apr 30, 2025",
    items: "2 Items",
    paymentMethod: "PayPal",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    amount: "$89.50",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "#10027",
    name: "David Miller",
    email: "david.miller@example.com",
    mobile: "+1 555-345-1234",
    orderDate: "Apr 27, 2025",
    deliveryDate: "May 1, 2025",
    items: "5 Items",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    orderStatus: "Pending",
    amount: "$159.75",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "Shipped":
      return "text-blue-600 font-medium";
    case "Processing":
      return "text-orange-600 font-medium";
    case "Delivered":
      return "text-green-600 font-medium";
    case "Pending":
      return "text-red-600 font-medium";
    default:
      return "text-gray-600";
  }
};

const columns: ColumnDef<Order>[] = [
  { accessorKey: "id", header: "Order ID" },
  {
    accessorKey: "name",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.avatar}
          alt={row.original.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-gray-500">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  { accessorKey: "mobile", header: "Mobile Number" },
  { accessorKey: "orderDate", header: "Order Date" },
  { accessorKey: "deliveryDate", header: "Delivery Date" },
  { accessorKey: "items", header: "Items" },
  { accessorKey: "paymentMethod", header: "Payment Method" },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(
          row.original.paymentStatus
        )}`}
      >
        {row.original.paymentStatus}
      </span>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => (
      <span className={getOrderStatusColor(row.original.orderStatus)}>
        {row.original.orderStatus}
      </span>
    ),
  },
  { accessorKey: "amount", header: "Total Amount" },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="flex gap-2">
        <Button variant="outline" size="icon">
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];

const OrdersHistory = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className=" w-full min-w-screen-2xl mx-auto bg-primary/20 ">
      <CardHeader>
        <Title text="Orders History" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersHistory;
