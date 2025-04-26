import React from "react";
import { formatAmount } from "~/lib/format-amount";
import { Separator } from "../ui/separator";

interface Props {
  payee: {
    id: number;
    name: string;
    upi_id: string;
    amount: number;
  };
}

export default function TablePayeeRow({ payee }: Props) {
  return (
    <React.Fragment key={payee.id}>
      <div className="px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col">
          <span>{payee.name}</span>
          <span className="text-muted-foreground text-xs">{payee.upi_id}</span>
        </div>
        <div className="mt-4 lg:mt-0">{formatAmount(payee.amount)}</div>
      </div>
      <Separator />
    </React.Fragment>
  );
}
