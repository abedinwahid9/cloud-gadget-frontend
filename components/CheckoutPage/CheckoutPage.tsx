"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Address, {
  AddressFormValues,
} from "../dashboard/(user)/Address/Address";
import CustomBtn from "../share/CustomBtn/CustomBtn";
import { CardStyle } from "@/lib/utils/customCss";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = useAppSelector((state) => state.cart.totalPrice);
  const deliveryCharge = useAppSelector((state) => state.cart.deliveryCharge);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const charge = deliveryCharge ? deliveryCharge?.charge : 0;
  const total = subtotal + charge;

  // const handleCheckout = () => {
  //   if (cartItems.length === 0) {
  //     alert("Your cart is empty!");
  //     return;
  //   }

  //   // Here you can integrate your payment gateway or redirect to payment page
  //   alert(`Order placed! Total: ৳ ${total.toFixed(2)}`);
  //   router.push("/"); // redirect to home or order confirmation
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>();

  const onSubmit = (data: AddressFormValues) => {
    console.log("Delivery Address:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" px-4 py-5 flex flex-col lg:flex-row gap-6"
    >
      {/* Billing Form */}
      <div className="lg:w-2/3 w-full">
        <Address
          register={register}
          errors={errors}
          title="Billing & Shipping Details "
          isNote={true}
        />
      </div>

      {/* Order Summary */}

      <Card className={`lg:w-1/3 w-full ${CardStyle} h-fit`}>
        <CardHeader>
          <CardTitle className="text-nav">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-primary dark:text-nav font-semibold ">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <h3>
              Shipping:
              <br />
              <span className="text-nav capitalize">
                ({deliveryCharge?.zone})
              </span>
            </h3>

            <span>৳ {deliveryCharge?.charge.toFixed(2)}</span>
          </div>
          <hr className="bg-secondary h-[0.5px] border-none" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳ {total.toFixed(2)}</span>
          </div>

          <CustomBtn
            // handleBtn={handleCheckout}
            type="submit"
            className="w-full mt-4 rounded-md"
            title="Place to order"
          />
        </CardContent>
      </Card>
    </form>
  );
};

export default CheckoutPage;
