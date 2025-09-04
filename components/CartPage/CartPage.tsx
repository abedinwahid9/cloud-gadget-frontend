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
import { decrementQnt, incrementQnt } from "@/lib/redux/slices/cartSlices";

const CartPage = () => {
  const cartItmes = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (cartItmes?.length === 0) {
    return <>no items is here</>;
  }

  const price = 200;

  return (
    <div className="flex justify-center lg:w-2/3 w-full">
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
                  <Image className="w-16 h-16" src={img} alt="img" />
                  <div>
                    <h3 className="md:text-lg text-sm capitalize font-semibold truncate w-28">
                      {item.id} smart watch
                    </h3>
                    <p>price: ৳ {price.toFixed(2)}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <QuantitySelector
                    value={item.qnt}
                    onIncrement={() => {
                      dispatch(incrementQnt({ id: item.id }));
                    }}
                    onDecrement={() => dispatch(decrementQnt({ id: item.id }))}
                  />
                </TableCell>
                <TableCell className="text-center text-lg font-semibold ">
                  ৳ {(item.qnt * price).toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartPage;
