"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FaHome } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import CustomBtn from "../share/CustomBtn/CustomBtn";
import Title from "../share/Title/Title";
import { ThemeBtn } from "../theme/ThemeBtn";

import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getAuthMe } from "@/lib/redux/auth/authThunks";
import axios, { AxiosError } from "axios";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [errorMess, setErrorMess] = useState({ type: "", message: "" });
  const axiosPublic = useAxiosPublic();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      setSaveLoad(true);
      setErrorMess({ type: "", message: "" });

      const res = await axiosPublic.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Handle backend error responses
      if (res.status !== 200) {
        setErrorMess({ type: "error", message: res.data.message });
        setSaveLoad(false);
        return;
      }

      // Fetch user info
      const result = await dispatch(getAuthMe());

      if (result.meta.requestStatus === "fulfilled") {
        router.push("/");

        setTimeout(() => {
          reset({ email: "", password: "" });
          setSaveLoad(false);
        }, 800);
      }
    } catch (err: unknown) {
      let errorMessage = "Login failed";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setErrorMess({
        type: "error",
        message: errorMessage,
      });

      setSaveLoad(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br shadow-[0px_10px_50px_20px_rgba(0,_0,_0,_0.25)]">
      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl flex"
      >
        {/* Left Section */}
        <motion.div
          initial={false} // <-- prevents re-animation
          className="relative lg:flex hidden flex-col items-center justify-center w-1/2"
        >
          <motion.div
            initial={false} // <-- prevents re-animation
            animate={{ y: 0, opacity: 1 }}
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
              initial={false}
              className="absolute -top-20 -left-20 h-full w-full rounded-full bg-gradient-to-br from-primary to-secondary"
            />
            <motion.div
              initial={false}
              className="absolute -bottom-1/5 -left-1/5 h-3/5 w-3/5 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]"
            />
            <motion.div
              initial={false}
              className="absolute bottom-1/6 right-1/6 h-1/3 w-1/3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]"
            />
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div initial={false} className="lg:w-1/2 w-full">
          <Card className="border-none relative bg-transparent shadow-none py-10">
            <div className="w-full flex justify-center items-center gap-3">
              <Link href="/" className="bg-primary p-3 rounded-lg">
                <FaHome className="w-6 h-6 text-nav" />
              </Link>
              <div className="bg-primary p-3 rounded-lg">
                <ThemeBtn />
              </div>
            </div>

            <CardContent className="flex h-full flex-col justify-center">
              <Title text="Log In" />

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 mt-10"
              >
                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="text-secondary font-bold dark:text-nav underline"
                  >
                    Email
                  </Label>

                  <Input
                    id="email"
                    autoComplete="email"
                    className="text-primary mt-3"
                    placeholder="Enter Your Email"
                    {...register("email", { required: "Email is required" })}
                  />

                  {errors.email && (
                    <p className="text-badge text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}

                  {errorMess.type === "email" && (
                    <p className="text-badge text-sm mt-1">
                      {errorMess.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Label
                    htmlFor="password"
                    className="text-secondary font-bold dark:text-nav underline"
                  >
                    Password
                  </Label>

                  <div className="relative mt-3">
                    <Input
                      id="password"
                      autoComplete="current-password"
                      className="text-primary"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be 6+ characters",
                        },
                      })}
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

                  {errors.password && (
                    <p className="text-badge text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  {errorMess.type === "password" && (
                    <p className="text-badge text-sm mt-1">
                      {errorMess.message}
                    </p>
                  )}

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4"
                      />
                      <Label htmlFor="remember" className="text-secondary">
                        Remember me
                      </Label>
                    </div>
                    <Link href="#" className="text-secondary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <CustomBtn
                  disabled={saveLoad}
                  title={saveLoad ? <Spinner className="size-10" /> : "Log In"}
                  type="submit"
                  className={`rounded-lg w-full ${
                    saveLoad
                      ? "disabled:cursor-not-allowed cursor-not-allowed opacity-35"
                      : ""
                  }`}
                />

                <p className="text-center text-sm text-secondary dark:text-nav">
                  Don’t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>

            <motion.div
              initial={false}
              className="absolute -bottom-14 -right-14 -z-30 h-1/3 w-1/3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]"
            />
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;
