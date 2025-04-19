import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export type Payee = {
  id: number;
  name: string;
  upiId: string;
  amount: number;
};

export const columns: ColumnDef<Payee>[] = [
  {
    accessorKey: "id",
    header: "Rank",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 size-4 text-foreground/60" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return <div className="flex-1 text-center">{name}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          className="w-full inline-flex"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 size-4 text-foreground/60" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-mono text-center">{formatted}</div>;
    },
  },
];
