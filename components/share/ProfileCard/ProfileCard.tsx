"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ProfileCard = () => {
  return (
    <div className=" ">
      <Card className="bg-primary/20 dark:bg-blue-300/20 shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-col items-center ">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-bold text-primary">
            Abedin Wahid
          </CardTitle>
          <CardDescription className="text-sm text-secondary dark:text-nav text-center flex gap-1 font-semibold">
            <span>Role:</span>
            <span>Admin</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between md:flex-row flex-col gap-1">
          <div className="flex gap-2">
            <span className="text-secondary font-bold dark:text-nav underline">
              Id:
            </span>
            <span className="font-medium text-primary  ">
              abedin@example.com
            </span>
          </div>
          <div className="flex gap-2 ">
            <span className="text-secondary font-bold dark:text-nav underline">
              Email:
            </span>
            <span className="font-medium text-primary  ">
              abedin@example.com
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-secondary font-bold dark:text-nav underline">
              Phone:
            </span>
            <span className="font-medium text-primary  ">+880 1234 567890</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
