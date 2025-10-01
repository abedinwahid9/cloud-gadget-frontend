"use client";

import React, { useState } from "react";
import Title from "@/components/share/Title/Title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteIcon } from "lucide-react";
import ModelCharge from "./ModelCharge";
import DeleteBtn from "@/components/share/DeleteBtn/DeleteBtn";

// Types
type DeliveryZone = {
  id: number;
  zone: string;
  charge: number;
};

// Sample data
const defaultData: DeliveryZone[] = [
  { id: 1, zone: "Dhaka", charge: 60 },
  { id: 2, zone: "Chattogram", charge: 120 },
  { id: 3, zone: "Sylhet", charge: 100 },
];

// Table columns
const columns: ColumnDef<DeliveryZone>[] = [
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => <span>{row.original.zone}</span>,
  },
  {
    accessorKey: "charge",
    header: "Charge (৳)",
    cell: ({ row }) => <span>{row.original.charge}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DeleteBtn action={() => alert(`Delete ${row.original.zone}`)} />
    ),
  },
];

const DeliveryCharge = () => {
  const [data] = React.useState<DeliveryZone[]>(defaultData);
  const [modelOpen, setModelOpen] = useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Card className="bg-primary/10">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="flex items-center gap-4">
            <Title text="Delivery Charge" />
          </CardTitle>
          <Button
            className="bg-primary/50 text-secondary dark:text-nav rounded-4xl"
            onClick={() => setModelOpen(!modelOpen)}
          >
            Add Zone
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-primary/70 text-center">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead className="text-center" key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ModelCharge modelOpen={modelOpen} setModelOpen={setModelOpen} />
    </div>
  );
};

export default DeliveryCharge;
