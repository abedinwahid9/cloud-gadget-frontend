"use client";

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
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Users {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  total_spent: string;
  currency: string;
}

const data = [
  {
    id: 1001,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    role: "customer",
    status: "active",
    orders_count: 5,
    total_spent: "542.75",
    currency: "USD",
    tags: ["vip", "newsletter-subscriber"],
    last_order_id: 5001,
    last_order_name: "#1005",
    addresses: [
      {
        id: 201,
        address1: "123 Main Street",
        city: "New York",
        province: "NY",
        country: "USA",
        zip: "10001",
        default: true,
      },
    ],
    orders: [
      {
        id: 5001,
        name: "#1005",
        created_at: "2025-09-20T14:21:00Z",
        financial_status: "paid",
        fulfillment_status: "shipped",
        currency: "USD",
        total_price: "120.50",
        line_items: [
          {
            product_id: 501,
            title: "Black Hoodie",
            quantity: 1,
            price: "60.25",
          },
          {
            product_id: 502,
            title: "White Sneakers",
            quantity: 1,
            price: "60.25",
          },
        ],
      },
    ],
  },
  {
    id: 1002,
    first_name: "Sarah",
    last_name: "Smith",
    email: "sarah.smith@example.com",
    phone: "+44-20-5555-1111",
    role: "customer",
    status: "active",
    orders_count: 3,
    total_spent: "299.99",
    currency: "GBP",
    tags: ["loyal", "discount-user"],
    last_order_id: 5002,
    last_order_name: "#1006",
    addresses: [
      {
        id: 202,
        address1: "45 Baker Street",
        city: "London",
        province: "London",
        country: "UK",
        zip: "NW1 6XE",
        default: true,
      },
    ],
    orders: [
      {
        id: 5002,
        name: "#1006",
        created_at: "2025-09-18T10:10:00Z",
        financial_status: "paid",
        fulfillment_status: "delivered",
        currency: "GBP",
        total_price: "99.99",
        line_items: [
          {
            product_id: 503,
            title: "Leather Wallet",
            quantity: 1,
            price: "99.99",
          },
        ],
      },
    ],
  },
  {
    id: 1003,
    first_name: "Ali",
    last_name: "Khan",
    email: "ali.khan@example.com",
    phone: "+971-50-9876543",
    role: "customer",
    status: "blocked",
    orders_count: 8,
    total_spent: "1450.00",
    currency: "AED",
    tags: ["vip"],
    last_order_id: 5003,
    last_order_name: "#1007",
    addresses: [
      {
        id: 203,
        address1: "Palm Jumeirah Villa 12",
        city: "Dubai",
        province: "Dubai",
        country: "UAE",
        zip: "00000",
        default: true,
      },
    ],
    orders: [
      {
        id: 5003,
        name: "#1007",
        created_at: "2025-09-19T16:45:00Z",
        financial_status: "paid",
        fulfillment_status: "processing",
        currency: "AED",
        total_price: "320.00",
        line_items: [
          {
            product_id: 504,
            title: "Smart Watch",
            quantity: 1,
            price: "320.00",
          },
        ],
      },
    ],
  },
  {
    id: 1004,
    first_name: "Maria",
    last_name: "Garcia",
    email: "maria.garcia@example.com",
    phone: "+34-91-555-2222",
    role: "customer",
    status: "active",
    orders_count: 2,
    total_spent: "180.00",
    currency: "EUR",
    tags: ["newsletter-subscriber"],
    last_order_id: 5004,
    last_order_name: "#1008",
    addresses: [
      {
        id: 204,
        address1: "Calle Mayor 123",
        city: "Madrid",
        province: "Madrid",
        country: "Spain",
        zip: "28013",
        default: true,
      },
    ],
    orders: [
      {
        id: 5004,
        name: "#1008",
        created_at: "2025-09-15T09:00:00Z",
        financial_status: "paid",
        fulfillment_status: "shipped",
        currency: "EUR",
        total_price: "180.00",
        line_items: [
          {
            product_id: 505,
            title: "Denim Jacket",
            quantity: 1,
            price: "180.00",
          },
        ],
      },
    ],
  },
  {
    id: 1005,
    first_name: "David",
    last_name: "Miller",
    email: "david.miller@example.com",
    phone: "+1-310-222-7890",
    role: "customer",
    status: "active",
    orders_count: 6,
    total_spent: "765.50",
    currency: "USD",
    tags: ["vip", "returning"],
    last_order_id: 5005,
    last_order_name: "#1009",
    addresses: [
      {
        id: 205,
        address1: "890 Sunset Blvd",
        city: "Los Angeles",
        province: "CA",
        country: "USA",
        zip: "90028",
        default: true,
      },
    ],
    orders: [
      {
        id: 5005,
        name: "#1009",
        created_at: "2025-09-22T13:00:00Z",
        financial_status: "paid",
        fulfillment_status: "delivered",
        currency: "USD",
        total_price: "210.00",
        line_items: [
          {
            product_id: 506,
            title: "Bluetooth Headphones",
            quantity: 1,
            price: "210.00",
          },
        ],
      },
    ],
  },
  {
    id: 1006,
    first_name: "Emma",
    last_name: "Wilson",
    email: "emma.wilson@example.com",
    phone: "+61-2-9999-1111",
    role: "customer",
    status: "blocked",
    orders_count: 4,
    total_spent: "420.20",
    currency: "AUD",
    tags: ["loyal"],
    last_order_id: 5006,
    last_order_name: "#1010",
    addresses: [
      {
        id: 206,
        address1: "12 George St",
        city: "Sydney",
        province: "NSW",
        country: "Australia",
        zip: "2000",
        default: true,
      },
    ],
    orders: [
      {
        id: 5006,
        name: "#1010",
        created_at: "2025-09-12T08:30:00Z",
        financial_status: "pending",
        fulfillment_status: "unfulfilled",
        currency: "AUD",
        total_price: "150.20",
        line_items: [
          { product_id: 507, title: "Yoga Mat", quantity: 2, price: "75.10" },
        ],
      },
    ],
  },
  {
    id: 1007,
    first_name: "Hiroshi",
    last_name: "Tanaka",
    email: "hiroshi.tanaka@example.com",
    phone: "+81-3-5555-7890",
    role: "vendor",
    status: "active",
    orders_count: 7,
    total_spent: "98000",
    currency: "JPY",
    tags: ["vip", "premium"],
    last_order_id: 5007,
    last_order_name: "#1011",
    addresses: [
      {
        id: 207,
        address1: "2-1 Shibuya",
        city: "Tokyo",
        province: "Tokyo",
        country: "Japan",
        zip: "150-0002",
        default: true,
      },
    ],
    orders: [
      {
        id: 5007,
        name: "#1011",
        created_at: "2025-09-14T18:00:00Z",
        financial_status: "paid",
        fulfillment_status: "shipped",
        currency: "JPY",
        total_price: "45000",
        line_items: [
          {
            product_id: 508,
            title: "Gaming Laptop",
            quantity: 1,
            price: "45000",
          },
        ],
      },
    ],
  },
  {
    id: 1008,
    first_name: "Sophia",
    last_name: "Rossi",
    email: "sophia.rossi@example.com",
    phone: "+39-06-555-3333",
    role: "customer",
    status: "active",
    orders_count: 1,
    total_spent: "95.00",
    currency: "EUR",
    tags: [],
    last_order_id: 5008,
    last_order_name: "#1012",
    addresses: [
      {
        id: 208,
        address1: "Via Roma 77",
        city: "Rome",
        province: "Lazio",
        country: "Italy",
        zip: "00184",
        default: true,
      },
    ],
    orders: [
      {
        id: 5008,
        name: "#1012",
        created_at: "2025-09-11T11:15:00Z",
        financial_status: "paid",
        fulfillment_status: "delivered",
        currency: "EUR",
        total_price: "95.00",
        line_items: [
          { product_id: 509, title: "Sunglasses", quantity: 1, price: "95.00" },
        ],
      },
    ],
  },
  {
    id: 1009,
    first_name: "Chen",
    last_name: "Wei",
    email: "chen.wei@example.com",
    phone: "+86-21-5555-4444",
    role: "admin",
    status: "active",
    orders_count: 9,
    total_spent: "7200.00",
    currency: "CNY",
    tags: ["wholesale"],
    last_order_id: 5009,
    last_order_name: "#1013",
    addresses: [
      {
        id: 209,
        address1: "88 Nanjing Rd",
        city: "Shanghai",
        province: "Shanghai",
        country: "China",
        zip: "200000",
        default: true,
      },
    ],
    orders: [
      {
        id: 5009,
        name: "#1013",
        created_at: "2025-09-10T12:00:00Z",
        financial_status: "paid",
        fulfillment_status: "shipped",
        currency: "CNY",
        total_price: "3000.00",
        line_items: [
          {
            product_id: 510,
            title: "Office Chair",
            quantity: 2,
            price: "1500.00",
          },
        ],
      },
    ],
  },
  {
    id: 1010,
    first_name: "Amina",
    last_name: "Rahman",
    email: "amina.rahman@example.com",
    phone: "+880-171-555-7777",
    role: "customer",
    status: "blocked",
    orders_count: 2,
    total_spent: "15000.00",
    currency: "BDT",
    tags: ["new-user"],
    last_order_id: 5010,
    last_order_name: "#1014",
    addresses: [
      {
        id: 210,
        address1: "House 12, Road 4",
        city: "Dhaka",
        province: "Dhaka",
        country: "Bangladesh",
        zip: "1212",
        default: true,
      },
    ],
    orders: [
      {
        id: 5010,
        name: "#1014",
        created_at: "2025-09-09T09:00:00Z",
        financial_status: "paid",
        fulfillment_status: "processing",
        currency: "BDT",
        total_price: "7500.00",
        line_items: [
          {
            product_id: 511,
            title: "Air Conditioner",
            quantity: 1,
            price: "7500.00",
          },
          {
            product_id: 512,
            title: "Microwave Oven",
            quantity: 1,
            price: "7500.00",
          },
        ],
      },
    ],
  },
];

const Customers = () => {
  const columns: ColumnDef<Users>[] = [
    {
      accessorKey: "first_name",
      header: "User Name",
      cell: ({ row }) => (
        <div>
          <h2 className="font-semibold">
            {row.original.first_name} {row.original.last_name}
          </h2>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge className="text-secondary bg-primary/20 font-bold">
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.email}
        </span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <span>{row.original.phone}</span>,
    },
    {
      accessorKey: "total_spent",
      header: "Total Purchase",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.total_spent} {row.original.currency}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={`${
            row.original.status === "active" ? "bg-primary/20" : "bg-badge/50"
          } font-bold text-secondary`}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" className="text-badge bg-transparent">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border shadow-sm p-4 bg-primary/20 my-3">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-bold">
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
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
                No customers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Customers;
