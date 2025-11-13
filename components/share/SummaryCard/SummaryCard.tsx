import React from "react";

interface IconProps {
  className?: string;
}
interface SummaryCardProps {
  title: string;
  value: string | number;
  gradient?: string;
  IconComponent: React.ComponentType<IconProps>;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  gradient,
  IconComponent,
}) => {
  return (
    <div
      className={`relative h-28 rounded-2xl shadow-[0px_0px_1px_1px_#00a8a8] overflow-hidden`}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          gradient || "from-nav/40 to-secondary/40"
        }`}
      ></div>

      {/* Wavy overlay effect */}
      <div className=" absolute right-0 -top-5 h-full w-20 bg-text/40 rounded-l-full"></div>

      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col justify-between h-full dark:text-white text-primary">
        <div className="flex justify-between items-center">
          <span className="text-md capitalize font-semibold opacity-90">
            {title}
          </span>
          <IconComponent className="size-6 text-nav" />
        </div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
