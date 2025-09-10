"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import CustomBtn from "@/components/share/CustomBtn/CustomBtn";

type AddressFormValues = {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  note?: string;
};

const Address = ({
  title,
  isNote = false,
}: {
  title: string;
  isNote?: true | false;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>();

  const onSubmit = (data: AddressFormValues) => {
    console.log("Delivery Address:", data);
  };

  return (
    <Card className="bg-primary/20 dark:bg-blue-300/20 border border-gray-200 dark:border-gray-700 shadow-[0px_0px_10px_0px_#00a8a8]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <Label
              htmlFor="fullName"
              className="text-secondary font-bold dark:text-nav underline"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              className="text-primary"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <Label
              htmlFor="phone"
              className="text-secondary font-bold dark:text-nav underline"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              className="text-primary"
              placeholder="+880 1XXXXXXXXX"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label
              htmlFor="email"
              className="text-secondary font-bold dark:text-nav underline"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              className="text-primary"
              placeholder="example@mail.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Street */}
          <div className="space-y-1">
            <Label
              htmlFor="street"
              className="text-secondary font-bold dark:text-nav underline"
            >
              Street Address
            </Label>
            <Input
              id="street"
              className="text-primary"
              placeholder="House, Road, Area"
              {...register("street", {
                required: "Street address is required",
              })}
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                htmlFor="city"
                className="text-secondary font-bold dark:text-nav underline"
              >
                City
              </Label>
              <Input
                id="city"
                className="text-primary"
                placeholder="Enter city"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="state"
                className="text-secondary font-bold dark:text-nav underline"
              >
                State
              </Label>
              <Input
                id="state"
                className="text-primary"
                placeholder="Enter state"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* Postal & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                htmlFor="postalCode"
                className="text-secondary font-bold dark:text-nav underline"
              >
                Postal Code
              </Label>
              <Input
                id="postalCode"
                className="text-primary"
                placeholder="e.g. 1212"
                {...register("postalCode", {
                  required: "Postal code is required",
                })}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="country"
                className="text-secondary font-bold dark:text-nav underline"
              >
                Country
              </Label>
              <Input
                id="country"
                className="text-primary"
                placeholder="Bangladesh"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>
          </div>

          {/* Note */}
          {isNote && (
            <div className="space-y-1">
              <Label
                htmlFor="note"
                className="text-secondary font-bold dark:text-nav underline"
              >
                Delivery Note (Optional)
              </Label>
              <Textarea
                id="note"
                className="text-primary"
                placeholder="Any specific delivery instruction..."
                {...register("note")}
              />
            </div>
          )}

          {/* Submit */}
          <CustomBtn
            title="Save Address"
            type="submit"
            className="w-full mt-2"
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default Address;
