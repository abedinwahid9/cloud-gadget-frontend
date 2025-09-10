import React from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  gradient?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  gradient,
}) => {
  return (
    <div
      className={`relative h-28 rounded-2xl shadow-[0px_0px_10px_0px_#00a8a8] overflow-hidden`}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-l ${
          gradient || "from-primary/40 to-secondary/40"
        }`}
      ></div>

      {/* Wavy overlay effect */}
      <div className=" absolute right-0 -top-5 h-full w-20 bg-badge/20 rounded-l-full"></div>

      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col justify-between h-full text-white">
        <span className="text-md capitalize font-semibold opacity-90">
          {title}
        </span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
