"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Truck, CheckCircle2, MapPin, Headphones } from "lucide-react";
import { motion } from "framer-motion";

interface Order {
  orderId: string;
  trackingNumber: string;
  stages: { name: string; completed: boolean }[];
  estimatedDelivery: string;
  items: { id: string; name: string; qty: number; price: string }[];
  shippingAddress: string;
}

const dummyOrder: Order = {
  orderId: "GS-123456",
  trackingNumber: "TRACK-78910",
  estimatedDelivery: "15 Sep, 2025",
  shippingAddress: "123 Main St, Dhaka, Bangladesh",
  stages: [
    { name: "Ordered", completed: true },
    { name: "Shipped", completed: true },
    { name: "In Transit", completed: true },
    { name: "Out for Delivery", completed: false },
    { name: "Delivered", completed: false },
  ],
  items: [
    { id: "1", name: "Wireless Headphone", qty: 1, price: "৳6,500" },
    { id: "2", name: "USB‑C Charger", qty: 2, price: "৳1,800" },
  ],
};

export default function OrderTrackingPage() {
  const completedCount = dummyOrder.stages.filter((s) => s.completed).length;
  const progress = (completedCount / dummyOrder.stages.length) * 100;

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Order Tracking</h1>
          <p className="text-muted-foreground">
            Track your gadget order in real time
          </p>
        </div>

        {/* Order Summary */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Order #{dummyOrder.orderId}</CardTitle>
            <Badge variant="secondary">In Transit</Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Tracking Number:{" "}
              <span className="font-medium">{dummyOrder.trackingNumber}</span>
            </p>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Order Placed</span>
                <span>Delivered</span>
              </div>
              <Progress value={progress} />
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {dummyOrder.stages.map((stage, i) => (
                <StatusItem
                  key={i}
                  title={stage.name}
                  active={stage.completed}
                  icon={
                    stage.name === "Ordered" ? (
                      <Package />
                    ) : stage.name === "Shipped" ? (
                      <Truck />
                    ) : stage.name === "Delivered" ? (
                      <CheckCircle2 />
                    ) : (
                      <Truck />
                    )
                  }
                />
              ))}
            </div>

            {/* ETA */}
            <div className="rounded-lg border p-4 text-sm">
              <p className="text-muted-foreground">Estimated Delivery</p>
              <p className="font-semibold">{dummyOrder.estimatedDelivery}</p>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Items in your order</h3>
              <div className="divide-y rounded-lg border">
                {dummyOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between p-4 text-sm"
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="rounded-lg border p-4 text-sm space-y-1">
              <div className="flex items-center gap-2 font-semibold">
                <MapPin size={16} /> Shipping Address
              </div>
              <p className="text-muted-foreground">
                {dummyOrder.shippingAddress}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1 gap-2">
                <Truck size={16} /> Carrier Website
              </Button>
              <Button className="flex-1 gap-2">
                <Headphones size={16} /> Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusItem({
  title,
  active,
  icon,
}: {
  title: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center text-sm transition ${
        active ? "border-primary bg-primary/5" : "opacity-60"
      }`}
    >
      <div
        className={`rounded-full p-2 ${
          active ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {icon}
      </div>
      <span className="font-medium">{title}</span>
    </motion.div>
  );
}
