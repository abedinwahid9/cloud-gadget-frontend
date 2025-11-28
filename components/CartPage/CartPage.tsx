"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import img from "@/app/assets/img2.png";

import QuantitySelector from "../share/QuantitySelector/QuantitySelector";
import {
  allCartClear,
  decrementQnt,
  incrementQnt,
  removeCart,
} from "@/lib/redux/slices/cartSlices";
import CartTotals from "./CartTotals";
import Link from "next/link";
import { Button } from "../ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const cartItmes = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  if (cartItmes?.length === 0) {
    return (
      <div className="text-center mt-10 text-lg font-medium">
        No items are here
      </div>
    );
  }

  return (
    <div className="flex justify-between px-3 flex-col lg:flex-row gap-3">
      <div className="flex justify-between lg:w-2/3 w-full flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Product</TableHead>
              <TableHead className="text-center">Qtn</TableHead>
              <TableHead className="text-center">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItmes.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="flex items-start md:items-center gap-2 md:flex-row flex-col ">
                    <Image
                      width={500}
                      height={500}
                      className="w-16 h-16"
                      src={item.imageUrl || img}
                      alt="img"
                    />
                    <div>
                      <Link href={`/shop/${item.id}`}>
                        <h3 className="md:text-lg text-sm capitalize font-semibold truncate w-28 md:w-40 text-primary dark:text-nav hover:underline">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-nav dark:text-nav">
                        price: ৳ {item.price}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <QuantitySelector
                      value={item.qnt}
                      onIncrement={() => {
                        dispatch(incrementQnt({ id: item.id }));
                      }}
                      onDecrement={() =>
                        dispatch(decrementQnt({ id: item.id }))
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center text-primary dark:text-nav text-lg font-semibold ">
                    <div className=" flex justify-center items-center  flex-col md:flex-row gap-3">
                      <span className="md:w-3/4 w-full">
                        {" "}
                        ৳ {(item?.qnt * item?.price).toFixed(2)}
                      </span>
                      <div
                        onClick={() => dispatch(removeCart(item.id))}
                        className="md:w-1/4 w-full flex justify-end"
                      >
                        <RiDeleteBin6Line className=" cursor-pointer text-badge w-5 h-5" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="w-full flex justify-end">
          <Button
            onClick={() => dispatch(allCartClear())}
            className="bg-badge text-white font-bold rounded-md"
          >
            Clear <RiDeleteBin6Line /> All
          </Button>
        </div>
      </div>
      <CartTotals />
    </div>
  );
};

export default CartPage;
