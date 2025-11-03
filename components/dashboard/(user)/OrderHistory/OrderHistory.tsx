"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const orders = [
  {
    id: "ORD-1001",
    date: "Sep 01, 2025",
    status: "Delivered",
    total: "৳2400",
    items: 3,
  },
  {
    id: "ORD-1002",
    date: "Sep 05, 2025",
    status: "Shipped",
    total: "৳1200",
    items: 1,
  },
  {
    id: "ORD-1003",
    date: "Sep 08, 2025",
    status: "Processing",
    total: "৳3200",
    items: 5,
  },
];

const OrderHistory = ({
  title,
  reOrder = false,
}: {
  title: string;
  reOrder?: true | false;
}) => {
  return (
    <div>
      <Card className="bg-primary/15 dark:bg-blue-300/15  border border-gray-200 dark:border-gray-700 shadow-[0px_0px_10px_0px_#00a8a8]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary capitalize">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Your recent orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-secondary font-bold dark:text-nav underline">
                  Order ID
                </TableHead>
                <TableHead className="text-secondary font-bold dark:text-nav underline">
                  Date
                </TableHead>
                <TableHead className="text-secondary font-bold dark:text-nav underline">
                  Status
                </TableHead>
                <TableHead className="text-secondary font-bold dark:text-nav underline">
                  Items
                </TableHead>
                <TableHead className="text-secondary font-bold dark:text-nav underline">
                  Total
                </TableHead>
                <TableHead className="text-right text-secondary font-bold dark:text-nav underline">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-primary">{order.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-200 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-blue-200 text-blue-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-primary">{order.items}</TableCell>
                  <TableCell className="text-primary">{order.total}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/my-account/orders-history/order-view/1`}>
                      <Button variant="outline" size="sm" className="mr-2">
                        View
                      </Button>
                    </Link>
                    {reOrder && <Button size="sm">Reorder</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistory;
