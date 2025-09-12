"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

interface Category {
  id: string;
  name: string;
  subCategories: { id: string; name: string }[];
}

interface CategoryTableProps {
  data: Category[];
  onEditCategory: (id: string) => void;
  onDeleteCategory: (id: string) => void;
  onEditSubCategory: (catId: string, subId: string) => void;
  onDeleteSubCategory: (catId: string, subId: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  data,
  onEditCategory,
  onDeleteCategory,
  onEditSubCategory,
  onDeleteSubCategory,
}) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Sub-Categories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell className="flex items-center gap-2">
              <span>{cat.name}</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-primary"
                  onClick={() => onEditCategory(cat.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-primary"
                  onClick={() => onDeleteCategory(cat.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
            <TableCell>
              {cat.subCategories.map((sub) => (
                <div key={sub.id} className="flex items-center gap-2 pt-1">
                  <span>{sub.name}</span>
                  <div className="flex gap-0.5">
                    <Popover>
                      <PopoverTrigger
                        className="hover:bg-primary py-1.5 px-2.5 rounded-md border-2"
                        onClick={() => onEditSubCategory(cat.id, sub.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </PopoverTrigger>
                      <PopoverContent className="bg-primary">
                        Place content for the popover here.
                      </PopoverContent>
                    </Popover>

                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary"
                      onClick={() => onDeleteSubCategory(cat.id, sub.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
