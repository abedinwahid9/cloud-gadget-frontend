"use client";

import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import CustomBtn from "../share/CustomBtn/CustomBtn";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { ThemeBtn } from "../theme/ThemeBtn";
import Title from "../share/Title/Title";
import Otp from "../share/Otp/Otp";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { Spinner } from "../ui/spinner";
import { redirect } from "next/navigation";

export interface FormValues {
  email: string;
  name: string;
  otpCode: number | string;
  password: string;
}

const SignUp = () => {
  const { handleSubmit, control, watch, setValue, reset } = useForm<FormValues>(
    {
      defaultValues: { email: "", name: "", otpCode: "", password: "" },
    }
  );

  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [saveLoad, setSaveLoad] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    console.log("FORM DATA:", data);

    if (step === 0) {
      setSaveLoad(true);
      if (!data.email) return;
      const res = await axiosPublic.post("otp/send-otp", { email: data.email });
      if (res.status) {
        setSaveLoad(false);
      }
      if (res.status === 201) {
        setStep(1);
      }
    } else if (step === 2) {
      setSaveLoad(true);
      const res = await axiosPublic.post(
        "auth/signup",
        {
          email: data.email,
          name: data.name,
          otp: data.otpCode,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setSaveLoad(false);
        reset({ email: "", name: "", otpCode: "", password: "" });
        redirect("/");
      }
    }
  };

  /** STEP UI RENDER */
  const renderStep = () => {
    switch (step) {
      // ----------------------- STEP 0 -------------------------
      case 0:
        return (
          <>
            <div>
              <Label
                htmlFor="email"
                className="text-secondary font-bold dark:text-nav underline"
              >
                Email
              </Label>

              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    className="text-primary mt-3"
                    placeholder="Enter your email"
                  />
                )}
              />
            </div>
            <CustomBtn
              disabled={saveLoad}
              title={saveLoad ? <Spinner className="size-10" /> : "Sign Up"}
              className={`rounded-lg w-full ${
                saveLoad
                  ? "disabled:cursor-not-allowed cursor-not-allowed opacity-35"
                  : ""
              }`}
            />
          </>
        );

      // ----------------------- STEP 1 (OTP) -------------------------
      case 1:
        return (
          <Otp
            email={watch("email")}
            setValue={setValue}
            setSaveLoad={setSaveLoad}
            onSuccess={() => setStep(2)}
          />
        );

      // ----------------------- STEP 2 -------------------------
      case 2:
        return (
          <>
            <div>
              <Label
                htmlFor="name"
                className="text-secondary font-bold dark:text-nav underline"
              >
                Full Name
              </Label>

              <Controller
                name="name"
                control={control}
                rules={{ required: "name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    className="text-primary mt-3"
                    placeholder="Enter full name"
                  />
                )}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <Label
                htmlFor="password"
                className="text-secondary font-bold dark:text-nav underline"
              >
                Password
              </Label>

              <div className="relative mt-3">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      className="text-primary"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
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
            </div>

            <CustomBtn
              disabled={saveLoad}
              title={saveLoad ? <Spinner className="size-10" /> : "Complete"}
              type="submit"
              className={`rounded-lg w-full ${
                saveLoad
                  ? "disabled:cursor-not-allowed cursor-not-allowed opacity-35"
                  : ""
              }`}
            />
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br shadow-[0px_10px_50px_20px_rgba(0,_0,_0,_0.25)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl h-[500px] overflow-hidden rounded-2xl shadow-2xl flex"
      >
        {/* LEFT SECTION */}
        <motion.div className="relative lg:flex flex-col hidden items-center justify-center w-1/2">
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

          {/* DECORATIONS */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div className="absolute -top-20 -left-20 h-full w-full rounded-full bg-gradient-to-br from-primary to-secondary" />
            <motion.div className="absolute -bottom-1/5 -left-1/5 h-3/5 w-3/5 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]" />
            <motion.div className="absolute bottom-1/6 right-1/6 h-1/3 w-1/3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]" />
          </div>
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div className="lg:w-1/2 w-full">
          <div className="border-none relative bg-transparent shadow-none py-10">
            <div className="w-full flex justify-center items-center gap-3">
              <Link href="/" className="bg-primary p-3 rounded-lg">
                <FaHome className="w-6 h-6 text-nav" />
              </Link>

              <div className="bg-primary p-3 rounded-lg">
                <ThemeBtn />
              </div>
            </div>

            <div className="flex h-full flex-col justify-center px-10">
              <Title text="Sign Up" />

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 mt-10"
              >
                {renderStep()}

                {step !== 2 && (
                  <p className="text-center text-sm text-secondary dark:text-nav">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                )}
              </form>
            </div>

            <motion.div className="absolute -bottom-14 -right-14 -z-30 h-1/3 w-1/3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0px_10px_50px_10px_rgba(0,_0,_0,_0.25)]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
