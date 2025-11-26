"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import CustomBtn from "../CustomBtn/CustomBtn";

const Otp = ({ onSuccess }: { onSuccess: () => void }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

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
        handleBtn={() => {
          const otpValue = otp.join("");

          if (otpValue.length === 6) {
            // TODO: call API to validate OTP

            onSuccess(); // 🔥 Go to next step
          } else {
            alert("Please enter all 6 digits");
          }
        }}
      />

      <button className="w-full mt-4 text-nav text-sm hover:underline">
        Resend
      </button>
    </motion.div>
  );
};

export default Otp;
