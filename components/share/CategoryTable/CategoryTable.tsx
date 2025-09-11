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
          <TableHead className="w-[200px]">Category</TableHead>
          <TableHead>Sub-Categories</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>{cat.name}</TableCell>
            <TableCell>
              {cat.subCategories.map((sub) => (
                <div
                  key={sub.id}
                  className="flex justify-between items-center gap-2 mb-1"
                >
                  <span>{sub.name}</span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditSubCategory(cat.id, sub.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteSubCategory(cat.id, sub.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                variant="outline"
                className="mr-2"
                onClick={() => onEditCategory(cat.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDeleteCategory(cat.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
