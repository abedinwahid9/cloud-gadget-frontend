"use client";

import { motion } from "framer-motion";
import React from "react";

interface LiquidButtonProps {
  text: string;
}

const LiquidBtn: React.FC<LiquidButtonProps> = ({ text }) => {
  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="relative md:px-6 md:py-3 px-4 py-1 rounded-2xl overflow-hidden md:text-xl text-sm capitalize text-white font-semibold shadow-[inset_0px_0px_10px_0px_#00A5A5]"
      >
        {/* background layer with distortion */}
        <div
          className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-md liquid-glass-card"
          style={{
            filter: "url(#glass-distortion)",
            zIndex: 0,
            backdropFilter: "blur(5px)",
          }}
        ></div>

        {/* text layer */}
        <span className="relative z-10">{text}</span>
      </motion.button>

      {/* SVG Filter Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.019 0.019"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="5" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LiquidBtn;
