"use client";

import React, { useMemo, useState } from "react";
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
import DeleteBtn from "@/components/share/DeleteBtn/DeleteBtn";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import ConfirmToast from "@/components/share/ToastCustom/ConfirmToast";
import ModelCharge from "./ModelCharge";

/* ================= TYPES ================= */

type DeliveryZone = {
  id: string;
  zone: string;
  charge: number;
};

/* ================= TABLE COLUMNS ================= */

const getColumns = (
  refetch: () => void,
  handleZoneDelete: (id: string) => Promise<boolean | undefined>,
): ColumnDef<DeliveryZone>[] => [
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => row.original.zone,
  },
  {
    accessorKey: "charge",
    header: "Charge (৳)",
    cell: ({ row }) => row.original.charge,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="group">
        <DeleteBtn
          action={() =>
            ConfirmToast(`Delete ${row.original.zone}`, async () => {
              return await handleZoneDelete(row.original.id);
            })
          }
        />
      </div>
    ),
  },
];

/* ================= COMPONENT ================= */

const DeliveryCharge = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery<DeliveryZone[]>({
    queryKey: ["zone-charge"],
    queryFn: async () => {
      const res = await axiosPublic.get("/charge");

      // 🔥 normalize backend data (_id → id)
      return res.data.zone;
    },
  });

  const handleZoneDelete = async (id: string) => {
    try {
      await axiosPublic.delete(`/charge/${id}`);
      refetch();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const columns = useMemo(
    () => getColumns(refetch, handleZoneDelete),
    [refetch],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Card className="bg-primary/10">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>
            <Title text="Delivery Charge" />
          </CardTitle>

          <Button
            className="bg-primary/50 text-secondary dark:text-nav"
            onClick={() => setModelOpen(true)}
          >
            Add Zone
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader className="bg-primary/70">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No zones found
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ModelCharge
        modelOpen={modelOpen}
        refetch={refetch}
        setModelOpen={setModelOpen}
      />
    </div>
  );
};

export default DeliveryCharge;
