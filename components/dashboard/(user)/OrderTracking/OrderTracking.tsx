"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Order {
  orderId: string;
  trackingNumber: string;
  stages: { name: string; completed: boolean }[];
  estimatedDelivery: string;
  items: { id: string; name: string; qty: number; price: string }[];
  shippingAddress: string;
}

const dummyOrder: Order = {
  orderId: "123456",
  trackingNumber: "TRACK78910",
  estimatedDelivery: "Sep 15, 2025",
  shippingAddress: "123 Main St, Dhaka, Bangladesh",
  stages: [
    { name: "Ordered", completed: true },
    { name: "Shipped", completed: true },
    { name: "In Transit", completed: false },
    { name: "Out for Delivery", completed: false },
    { name: "Delivered", completed: false },
  ],
  items: [
    { id: "1", name: "T-Shirt", qty: 2, price: "৳600" },
    { id: "2", name: "Shoes", qty: 1, price: "৳1800" },
  ],
};

const OrderTracking = () => (
  <div className="max-w-2xl mx-auto py-8">
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">
          Order Tracking
        </CardTitle>
        <p className="text-secondary dark:text-nav">
          Order #: {dummyOrder.orderId} &mdash; Tracking #:{" "}
          {dummyOrder.trackingNumber}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stepper */}
        <div className="flex justify-between items-center">
          {dummyOrder.stages.map((stage, idx) => (
            <div key={idx} className="flex-1 text-center">
              <div
                className={`mx-auto w-8 h-8 rounded-full border-2 ${
                  stage.completed
                    ? "border-primary bg-primary"
                    : "border-gray-300"
                }`}
              ></div>
              <p
                className={`mt-2 text-sm ${
                  stage.completed ? "text-primary" : "text-gray-500"
                }`}
              >
                {stage.name}
              </p>
              {idx < dummyOrder.stages.length - 1 && (
                <div className="absolute top-4 left-full w-full h-0.5 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-300">
          Estimated Delivery:{" "}
          <span className="font-medium">{dummyOrder.estimatedDelivery}</span>
        </div>

        {/* Items */}
        <div>
          <h3 className="text-lg font-semibold text-primary">
            Items in your order:
          </h3>
          <ul className="mt-2 space-y-2">
            {dummyOrder.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span className="font-medium text-primary">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Address */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold text-secondary dark:text-nav underline">
            Shipping Address
          </h3>
          <p>{dummyOrder.shippingAddress}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            View in Carrier Site
          </Button>
          <Button className="flex-1">Contact Support</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default OrderTracking;
