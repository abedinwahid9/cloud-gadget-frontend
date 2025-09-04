import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CartTotals = () => {
  return (
    <Card className="lg:w-1/3 w-full bg-primary/10">
      <CardHeader>
        <CardTitle>CART TOTALS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Subtotal</span>
          <span>৳ 5,469</span>
        </div>
        <hr className="my-2" />
        {/* Shipping */}
        <div>
          <span className="text-muted-foreground block mb-2">Shipping</span>
          <RadioGroup defaultValue="insideDhaka" className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="insideDhaka" id="inside-dhaka" />
                <Label htmlFor="inside-dhaka" className="font-normal">
                  Inside Dhaka
                </Label>
              </div>
              <span>৳ 70</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outsideDhaka" id="outside-dhaka" />
                <Label htmlFor="outside-dhaka" className="font-normal">
                  Outside Dhaka
                </Label>
              </div>
              <span>৳ 130</span>
            </div>
          </RadioGroup>
          <div className="mt-2 text-sm text-right">
            <p>Shipping to Dhaka.</p>
            <a href="#" className="text-blue-500 hover:underline">
              Change address
            </a>
          </div>
        </div>
        <hr className="my-2" />
        {/* Total */}
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total</span>
          <span>৳ 5,539</span>
        </div>
        {/* Checkout Button */}
        <Button className="w-full">PROCEED TO CHECKOUT</Button>
      </CardContent>
    </Card>
  );
};

export default CartTotals;
