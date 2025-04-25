import { useQuery } from "@tanstack/react-query";
import { payeesTotalsQuery } from "~/queries";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { formatAmount } from "~/lib/format-amount";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";

export default function ExpenseTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "amount">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { data = [], isPending, isError, error } = useQuery(payeesTotalsQuery);

  if (isError) {
    return (
      <div className="border rounded-lg p-6 text-destructive">
        <p>
          Error loading data:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  const filteredData = useMemo(() => {
    const lowerCaseSearchTerm = searchQuery.toLowerCase().trim();
    let result = data;

    if (lowerCaseSearchTerm) {
      result = data?.filter((item) => {
        const nameMatch = item.name
          ?.toLowerCase()
          .includes(lowerCaseSearchTerm);
        const upiMatch = item.upi_id
          ?.toLowerCase()
          .includes(lowerCaseSearchTerm);
        return nameMatch || upiMatch;
      });
    }

    return [...result].sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });
  }, [data, searchQuery, sortBy, sortDirection]);

  const filteredTotalAmount = filteredData?.reduce((a, b) => a + b.amount, 0);

  return (
    <Card className="px-4">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for payee by name or UPI ID..."
      />
      <CardHeader className="flex rounded-lg px-0 justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => {
            setSortBy("name");
            if (sortDirection === "asc") {
              setSortDirection("desc");
            } else {
              setSortDirection("asc");
            }
          }}
        >
          <span className="font-semibold">Name</span>
          {sortBy === "name" ? (
            sortDirection === "asc" ? (
              <ArrowUp className="size-4 text-muted-foreground" />
            ) : (
              <ArrowDown className="size-4 text-muted-foreground" />
            )
          ) : null}
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => {
            setSortBy("amount");
            if (sortDirection === "asc") {
              setSortDirection("desc");
            } else {
              setSortDirection("asc");
            }
          }}
        >
          <span className="font-semibold">Amount</span>
          {sortBy === "amount" ? (
            sortDirection === "asc" ? (
              <ArrowUp className="size-4 text-muted-foreground" />
            ) : (
              <ArrowDown className="size-4 text-muted-foreground" />
            )
          ) : null}
        </Button>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-450px)] overflow-hidden">
        <CardContent className="px-0 text-sm flex flex-col gap-4 mt-0 rounded-lg">
          {filteredData?.map((payee) => (
            <>
              <div
                key={payee.id}
                className="px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex flex-col ">
                  <span>{payee.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {payee.upi_id}
                  </span>
                </div>
                <div className="mt-4 lg:mt-0">{formatAmount(payee.amount)}</div>
              </div>
              <Separator />
            </>
          ))}
        </CardContent>
      </ScrollArea>
      <div className="flex items-center text-sm justify-between px-4 mt-4">
        <div>{filteredData.length} rows</div>
        <div>Total: {formatAmount(filteredTotalAmount ?? 0)}</div>
      </div>
    </Card>
  );
}
