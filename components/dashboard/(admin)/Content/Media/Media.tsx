"use client";
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table";
// shadcn/ui components (assuming they are correctly aliased)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// lucide-react icons
import {
  Search,
  Plus,
  ListFilter,
  Menu,
  Link,
  Link2,
  Download,
  ArrowUpDown,
} from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";

// --- Interface for Data ---
interface FileItem {
  id: string;
  name: string;
  altText: string;
  dateAdded: string;
  size: string;
  thumbnailUrl: string;
  references: number;
}

// --- Mock Data ---
const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "screencapture-cloudieadg...shop-2025-09-27-00_49_27.PNG",
    altText: "A UI component screenshot",
    dateAdded: "Today at 10:47 AM",
    size: "1.29 MB",
    thumbnailUrl: "https://placehold.co/40x40/E0F2F1/000000?text=P",
    references: 2,
  },
  {
    id: "2",
    name: "screencapture-cloudieadg...dmin-2025-09-27-00_50_29.PNG",
    altText: "A UI component screenshot",
    dateAdded: "Today at 10:47 AM",
    size: "205.56 KB",
    thumbnailUrl: "https://placehold.co/40x40/E0F2F1/000000?text=P",
    references: 0,
  },
  {
    id: "3",
    name: "amitabachan_meme_template.JPG",
    altText: "Amitabh Bachchan meme template",
    dateAdded: "Today at 10:46 AM",
    size: "37.56 KB",
    thumbnailUrl: "https://placehold.co/40x40/FFD1DC/000000?text=J",
    references: 0,
  },
  {
    id: "4",
    name: "screencapture-cloudieadg...duct-2025-09-27-00_51_28.PNG",
    altText: "A UI component screenshot",
    dateAdded: "Today at 3:18 PM",
    size: "178.56 KB",
    thumbnailUrl: "https://placehold.co/40x40/E0F2F1/000000?text=P",
    references: 1,
  },
];

const columnHelper = createColumnHelper<FileItem>();

// --- Column Definitions ---
const columns = [
  // Selection Column
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-primary"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-primary"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  // Thumbnail Column
  columnHelper.accessor("thumbnailUrl", {
    id: "thumbnail",
    header: () => "",
    cell: (info) => (
      <img
        src={info.getValue()}
        alt="Thumbnail"
        className="h-10 w-10 object-cover rounded"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  // File Name Column (Sortable)
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4 hover:bg-transparent"
      >
        File name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
  }),

  // Alt Text Column
  columnHelper.accessor("altText", {
    header: () => "Alt text",
    cell: () => <div className="text-muted-foreground">—</div>, // Static dash for now
    enableSorting: false,
  }),

  // Date Added Column (Sortable)
  columnHelper.accessor("dateAdded", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4 hover:bg-transparent"
      >
        Date added
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),

  // Size Column (Sortable)
  columnHelper.accessor("size", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4 hover:bg-transparent"
      >
        Size
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),

  // References Column
  columnHelper.accessor("references", {
    header: () => <div className="text-center">References</div>,
    cell: (info) => (
      <div className="flex items-center justify-center text-muted-foreground">
        {info.getValue() > 0 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center space-x-1">
                <span>{info.getValue()}</span>
                <Link className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{info.getValue()} uses in content</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span>—</span>
        )}
      </div>
    ),
    enableSorting: false,
    size: 100, // Hint for column width
  }),

  // Actions Column (Display)
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end space-x-2 text-muted-foreground">
        <TooltipProvider>
          {/* Copy URL */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Link2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy URL</p>
            </TooltipContent>
          </Tooltip>

          {/* Download */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <RiDeleteBin6Line className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 120, // Hint for column width
  }),
];

// --- Component: Media Manager ---
const Media = () => {
  const [data] = React.useState(() => mockFiles);
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState(""); // For the search bar

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      sorting,
      globalFilter,
    },
  });

  return (
    <div className="border rounded-xl shadow-lg  text-card-foreground bg-primary/10">
      {/* Header/Toolbar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          {/* Select All Status */}
          <div className="w-6 h-6 flex items-center justify-center">
            <Checkbox
              className="border-primary"
              checked={
                table.getIsAllRowsSelected() ||
                (table.getIsSomeRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>

          {/* Filter Dropdown */}
          <Button
            variant="outline"
            className="flex items-center space-x-1 bg-secondary/30"
          >
            <span>All ({table.getFilteredRowModel().rows.length})</span>
            <ListFilter className="h-4 w-4 ml-1" />
          </Button>

          {/* Add/Upload Button */}
          <Button variant="default" className="flex items-center space-x-1">
            <Plus className="h-4 w-4" />
          </Button>

          {/* Bulk Actions */}
          {Object.keys(rowSelection).length > 0 && (
            <span className="text-sm font-medium text-muted-foreground ml-4">
              {Object.keys(rowSelection).length} selected
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Search Input (Global Filter) */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search files..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 h-9 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* View Toggle (List/Grid) - Placeholder */}
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* TanStack Table Implementation */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer/Pagination Placeholder (Optional) */}
      <div className="p-4 border-t flex justify-end text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} file(s) displayed.
      </div>
    </div>
  );
};

export default Media;
