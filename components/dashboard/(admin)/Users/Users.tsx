"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { CardStyle } from "@/lib/utils/customCss";

interface Users {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isBlocked: boolean;
  total_spent: string;
}

const getColumns = (): ColumnDef<Users>[] => [
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => (
      <div>
        <h2 className="font-semibold ">{row.original.name}</h2>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge className="text-primary dark:text-text bg-primary/10 dark:bg-text/10 font-bold shadow-[inset_0px_0px_7px_4px_rgba(0,_0,_0,_0.1)]">
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-sm">{row.original.email}</span>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span>{row.original.phone || " +880"}</span>,
  },
  {
    accessorKey: "total_spent",
    header: "Total Purchase",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.total_spent || 0}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={`${
          row.original.isBlocked === false ? "bg-nav/10" : "bg-badge/50"
        } font-bold border-2 border-nav text-nav`}
      >
        {row.original.isBlocked === false ? "active" : "blocked"}
      </Badge>
    ),
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <Edit className="w-4 h-4" />
        </Button>
        <Button size="sm" className="text-badge bg-transparent">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

const Users = ({ role }: { role: string }) => {
  const columns = React.useMemo(() => getColumns(), []);
  const axiosPublic = useAxiosPublic();

  const { data = [], isLoading } = useQuery({
    queryKey: ["role", role],
    queryFn: async () => {
      const res = await axiosPublic.get("/user", { params: { role } });
      return res.data.users;
    },
    enabled: !!role,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div
      className={`${CardStyle} my-3 p-2 rounded-lg text-primary dark:text-text`}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-bold ">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="hover:bg-text/50 " key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6">
                No customers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
