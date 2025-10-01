// components/ModelGallery.tsx
"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Check } from "lucide-react";
import image from "@/app/assets/img5.png";
import Image, { StaticImageData } from "next/image";
import { FaDropbox } from "react-icons/fa";
import { Label } from "@/components/ui/label";

type FileItem = {
  id: number;
  name: string;
  type: string;
  thumbnail: string | StaticImageData;
};

interface ModelGalleryProps {
  setGetImage: (files: FileItem[]) => void; // <-- fix: type your prop
}

export default function ModelGallery({ setGetImage }: ModelGalleryProps) {
  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      name: "screencapture-clo-1.png",
      type: "PNG",
      thumbnail: image,
    },
    {
      id: 2,
      name: "screencapture-clo-1.png",
      type: "PNG",
      thumbnail: image,
    },
    {
      id: 3,
      name: "screencapture-clo-1.png",
      type: "PNG",
      thumbnail: image,
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  function toggleSelect(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function deleteFile(id: number) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setSelectedIds((prev) => prev.filter((s) => s !== id));
  }

  function handleDone() {
    const selectedFiles = files.filter((f) => selectedIds.includes(f.id));
    setGetImage(selectedFiles);
    setOpen(false);
  }

  return (
    <div>
      <Drawer direction="top" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="bg-transparent rounded text-secondary px-2 py-1 text-md flex flex-col text-sm hover:bg-primary/30 items-center font-medium dark:text-primary">
            <FaDropbox className="w-5 h-5" />
            Select existing
          </button>
        </DrawerTrigger>

        <DrawerContent className="h-[90vh] rounded-t-xl w-3/4 mx-auto">
          <DrawerHeader className="border-b flex items-center justify-between px-4 py-3">
            <div>
              <DrawerTitle>Select file</DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                Choose images, videos, 3D models or other files
              </DrawerDescription>
            </div>
          </DrawerHeader>

          {/* Search + Filters */}
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <Input placeholder="Search files" className="flex-1" />
            <Button variant="outline" size="sm">
              File type
            </Button>
            <Button variant="outline" size="sm">
              File size
            </Button>
            <Button variant="outline" size="sm">
              Used in
            </Button>
            <Button variant="outline" size="sm">
              Product
            </Button>
            <Button variant="outline" size="sm">
              Sort
            </Button>
          </div>

          {/* Upload / Generate */}
          <div className="border-dashed border-2 rounded-lg mx-4 mt-4 p-6 text-center text-gray-500">
            <p>Drag and drop images, videos, 3D models, and files</p>
            <div className="flex justify-center gap-4 mt-3">
              <input
                accept=".jpg, .jpeg, .png, .gif"
                type="file"
                multiple
                id="images"
                className="hidden"
              />
              <Label
                className="bg-gradient-to-r from-primary/40 via-secondary/40 to-badge/40 
                  hover:from-badge/70 hover:via-secondary/70 hover:to-primary/70 
                  hover:text-nav dark:text-white text-secondary font-semibold 
                  md:font-bold md:text-lg text-sm capitalize rounded-4xl px-10 py-1"
                htmlFor="images"
              >
                Add media
              </Label>
            </div>
          </div>

          {/* Files Grid */}
          <div className="px-4 py-6 overflow-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file) => {
                const isSelected = selectedIds.includes(file.id);
                return (
                  <div
                    key={file.id}
                    className="relative group border rounded-lg overflow-hidden hover:shadow transition"
                  >
                    {/* delete icon */}
                    <button
                      onClick={() => deleteFile(file.id)}
                      aria-label={`Delete ${file.name}`}
                      className="absolute left-2 top-2 z-20 opacity-0 group-hover:opacity-100 transition bg-white/90 p-1 rounded-md"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* checkbox */}
                    <div className="absolute right-2 top-2 z-20">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelect(file.id)}
                        aria-label={`Select ${file.name}`}
                      />
                    </div>

                    {/* thumbnail */}
                    <Image
                      width={0}
                      height={0}
                      src={file.thumbnail}
                      alt={file.name}
                      className="w-full h-36 object-contain"
                    />

                    {/* metadata */}
                    <div className="p-2">
                      <p className="truncate text-sm">{file.name}</p>
                      <span className="text-xs text-gray-400">{file.type}</span>
                    </div>

                    {/* selected overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center pointer-events-none">
                        <Check size={36} color="white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <DrawerFooter className="flex justify-end gap-3 border-t px-4 py-3">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button onClick={handleDone}>Done</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
