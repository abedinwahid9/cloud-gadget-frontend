// components/sections/AdsBanner.tsx
"use client";

import Image, { StaticImageData } from "next/image";

interface AdsBannerProps {
  images: (string | StaticImageData)[];
}

const AdsBanner: React.FC<AdsBannerProps> = ({ images }) => {
  // Dynamically set grid columns
  const gridCols =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
      ? "grid-cols-2"
      : images.length === 4
      ? "grid-cols-4"
      : "grid-cols-3"; // fallback for 3, 5, etc.

  return (
    <div className={`grid ${gridCols} gap-2 `}>
      {images.map((img, index) => (
        <div key={index} className="relative w-full h-full  overflow-hidden">
          <Image
            src={img}
            alt={`Ad Banner ${index + 1}`}
            className="object-full"
          />
        </div>
      ))}
    </div>
  );
};

export default AdsBanner;
