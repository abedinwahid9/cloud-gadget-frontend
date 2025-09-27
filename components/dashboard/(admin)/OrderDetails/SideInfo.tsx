import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const SideInfo = () => {
  return (
    <>
      <Card className="bg-primary/20">
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Image
              width={0}
              height={0}
              src="https://i.pravatar.cc/100?img=5"
              alt="customer"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <p className="font-semibold">John Wick</p>
              <p className="text-sm text-muted-foreground">
                Customer ID: 810101
              </p>
              <p className="text-sm text-muted-foreground">
                Email: johnwick@gmail.com
              </p>
              <p className="text-sm text-muted-foreground">
                Call: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <div>
              <p className="font-medium">Total Orders</p>
              <p>18</p>
            </div>
            <div>
              <p className="font-medium">Total Spent</p>
              <p>$2,340.50</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Address */}
      <Card className="bg-primary/20">
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <div>
            <p className="font-semibold">Shipping Address</p>
            <p>123 Continental Street</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <p className="font-semibold">Billing Address</p>
            <p>123 Continental Street</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </CardContent>
      </Card>
      {/* Payment */}
      <Card className="bg-primary/20">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <span className="font-semibold">Payment Method:</span> Credit Card
            (Visa)
          </p>
          <p>
            <span className="font-semibold">Card Holder:</span> John Wick
          </p>
          <p>
            <span className="font-semibold">Payment Date:</span> Apr 25, 2025
          </p>
          <p>
            <span className="font-semibold">Payment Status:</span>{" "}
            <span className="text-green-600 font-semibold">Paid</span>
          </p>
          <p>
            <span className="font-semibold">Amount Paid:</span> $129.99
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SideInfo;
