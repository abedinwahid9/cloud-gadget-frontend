"use client";

import {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { motion } from "framer-motion";
import CustomBtn from "../CustomBtn/CustomBtn";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { UseFormSetValue } from "react-hook-form";
import { FormValues } from "@/components/Register/SignUp";

const Otp = ({
  onSuccess,
  email,
  setSaveLoad,
  setValue,
}: {
  onSuccess: () => void;
  setSaveLoad: Dispatch<SetStateAction<boolean>>;
  email: string;
  setValue: UseFormSetValue<FormValues>;
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const axiosPublic = useAxiosPublic();

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto move to next input
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    setValue("otpCode", otpValue);
    if (otpValue.length === 6) {
      // TODO: call API to validate OTP
      setSaveLoad(true);
      const varifyOtp = await axiosPublic.post("/otp/verify-otp", {
        email: email,
        otp: otpValue,
      });
      if (varifyOtp.status === 200) {
        onSuccess();
        setSaveLoad(false);
      }
    } else {
      alert("Please enter all 6 digits");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-2">Verification Code</h2>

      <p className="text-gray-500 text-sm mb-6">
        Please enter the 6-digit code we have sent to your email.
      </p>

      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center bg-secondary/20 border rounded-xl text-primary 
            text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <CustomBtn
        className="w-full rounded-lg"
        title="Verify"
        handleBtn={handleVerify}
      />

      <button className="w-full mt-4 text-nav text-sm hover:underline">
        Resend
      </button>
    </motion.div>
  );
};

export default Otp;
