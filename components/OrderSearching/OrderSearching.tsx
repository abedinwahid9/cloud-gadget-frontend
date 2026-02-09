"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PackageSearch } from "lucide-react";
import { motion } from "framer-motion";

const OrderSearching = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <PackageSearch className="text-primary" />
            </div>
            <CardTitle className="text-2xl">Track Your Order</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your Order ID or Phone Number
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Order ID / Phone Number"
              className="h-11"
            />

            <Button className="w-full h-11 gap-2">
              <Search size={18} /> Check Order Status
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Example: GS-123456 or 01XXXXXXXXX
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrderSearching;
