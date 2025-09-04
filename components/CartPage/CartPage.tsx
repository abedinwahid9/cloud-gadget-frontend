"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CartPage = () => {
  const cartItmes = useAppSelector((state) => state.cart);

  if (cartItmes?.length === 0) {
    return <>no items is here</>;
  }

  return (
    <div className="flex justify-center lg:w-2/3 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Qtn</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItmes.map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <button>x</button>
                  <span>INV001</span>
                </TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-start">$250.00</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartPage;
