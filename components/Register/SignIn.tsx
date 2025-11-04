"use client";

import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";

const SignIn = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl md:grid-cols-2"
      >
        {/* Left Section */}
        <div className="relative flex flex-col items-center justify-center  ">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center absolute top-1/5 left-1/5 text-nav"
          >
            <h1 className="text-4xl [text-shadow:_0px_0px_3px_#000000] font-bold tracking-wide">
              WELCOME
            </h1>
            <p className="mt-2 text-sm opacity-90 [text-shadow:_0px_0px_3px_#000000]">
              Gadget shop
            </p>
          </motion.div>

          {/* Decorative Circles */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              //   animate={{ y: [0, -10, 0] }}
              //   transition={{ repeat: Infinity, duration: 7 }}
              className="absolute -top-20 -left-20 h-full w-full rounded-full bg-gradient-to-br from-primary to-secondary"
            />
            <motion.div
              //   animate={{ y: [0, 10, 0] }}
              //   transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-1/5 -left-1/5 h-3/5 w-3/5 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]"
            />
            <motion.div
              //   animate={{ y: [0, -10, 0] }}
              //   transition={{ repeat: Infinity, duration: 7 }}
              className="absolute bottom-1/6 right-1/6 h-1/3 w-1/3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]"
            />
          </div>
        </div>

        {/* Right Section */}
        <Card className="border-none relative bg-transparent shadow-none">
          <CardContent className="flex h-full flex-col justify-center p-8 md:p-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Sign in</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <Label>Email or Username</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className="pl-10"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label>Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="pl-10 pr-10"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="h-4 w-4" />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign in
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                Sign in with other
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
          <motion.div
            //   animate={{ y: [0, -10, 0] }}
            //   transition={{ repeat: Infinity, duration: 7 }}
            className="absolute -bottom-14 -right-14 -z-30  h-1/3 w-1/3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]"
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default SignIn;
