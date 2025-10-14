"use client";
import Image from "next/image";
import img from "@/app/assets/cover3.jpg";
import Title from "@/components/share/Title/Title";
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";
import { motion } from "motion/react";

type ButtonProps = {
  handleButton: (params: { name: string; index: number }) => void;
};

const ImageGallery = ({ handleButton }: ButtonProps) => {
  return (
    <div className="py-4 px-2 mt-2 space-y-4  ">
      <Title text="🖼️ Gallery" />
      <div className="grid md:grid-cols-4 grid-cols-2 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-full flex flex-col relative rounded-lg overflow-hidden p-1 group"
          >
            <Image
              src={img}
              alt="slider"
              width={500}
              height={500}
              className="w-full h-full object-fill rounded-lg"
            />
            <p className="truncate text-xs mt-1 text-secondary">
              {"http://localhost:3000/admin/promotion-management/slider"}
            </p>

            <motion.div
              className="absolute inset-0 bg-secondary/40 hidden group-hover:flex items-center justify-center space-x-3"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button onClick={() => handleButton({ name: "edit", index: i })}>
                <RiEdit2Fill className="w-8 h-8 p-1 rounded-lg text-secondary bg-primary" />
              </button>
              <button
                onClick={() => handleButton({ name: "delete", index: i })}
              >
                <RiDeleteBin6Fill className="w-8 h-8 p-1 rounded-lg text-badge bg-primary" />
              </button>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
