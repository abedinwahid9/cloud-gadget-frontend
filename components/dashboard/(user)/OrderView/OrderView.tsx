"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const order = {
  id: "ORD-1002",
  date: "Sep 05, 2025",
  status: "Shipped",
  payment: "Paid via bKash",
  address: {
    name: "Abedin Wahid",
    phone: "+880 1712-345678",
    street: "House 23, Road 7",
    city: "Banasree, Dhaka",
    zip: "1219",
    country: "Bangladesh",
  },
  items: [
    { name: "Wireless Earbuds", qty: 1, price: 1200 },
    { name: "Laptop Stand", qty: 2, price: 600 },
  ],
  summary: {
    subtotal: 2400,
    shipping: 100,
    discount: 0,
    total: 2500,
  },
};

const OrderView = () => {
  return (
    <div className=" space-y-4">
      {/* Order Info */}
      <Card className="bg-primary/20 dark:bg-blue-300/20 shadow-[0px_0px_10px_0px_#00a8a8] border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">
            Order #{order.id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-primary">
          <p>
            <span className="font-semibold">Date:</span> {order.date}
          </p>
          <p>
            <span className="font-semibold">Status:</span>
            <Badge
              className={`ml-2 ${
                order.status === "Delivered"
                  ? "bg-green-200 text-green-700"
                  : order.status === "Shipped"
                  ? "bg-blue-200 text-blue-700"
                  : "bg-yellow-200 text-yellow-700"
              }`}
            >
              {order.status}
            </Badge>
          </p>
          <p>
            <span className="font-semibold">Payment:</span> {order.payment}
          </p>
        </CardContent>
      </Card>

      {/* Address */}
      <Card className="shadow-[0px_0px_10px_0px_#00a8a8]">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-primary">
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="text-primary">
          <p className="font-semibold">{order.address.name}</p>
          <p>{order.address.phone}</p>
          <p>{order.address.street}</p>
          <p>
            {order.address.city}, {order.address.zip}
          </p>
          <p>{order.address.country}</p>
        </CardContent>
      </Card>

      {/* Items */}
      <Card className="shadow-[0px_0px_10px_0px_#00a8a8]">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-primary">
            Ordered Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-secondary font-bold dark:text-nav underline">
                  Product
                </TableHead>
                <TableHead className="text-secondary font-bold dark:text-nav underline">
                  Qty
                </TableHead>
                <TableHead className="text-secondary font-bold dark:text-nav underline">
                  Price
                </TableHead>
                <TableHead className="text-right text-secondary font-bold dark:text-nav underline">
                  Subtotal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-primary">{item.name}</TableCell>
                  <TableCell className="text-primary">{item.qty}</TableCell>
                  <TableCell className="text-primary">৳{item.price}</TableCell>
                  <TableCell className="text-right text-primary">
                    ৳{item.qty * item.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="shadow-[0px_0px_10px_0px_#00a8a8]">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-primary">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-primary">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳{order.summary.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>৳{order.summary.shipping}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-৳{order.summary.discount}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳{order.summary.total}</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Download Invoice</Button>
        <Button>Reorder</Button>
      </div>
    </div>
  );
};

export default OrderView;
