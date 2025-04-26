import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";

export default function TableHeader() {
  const { sortBy, sortDirection } = useSearch({
    from: "/_protected/insights",
  });
  const navigate = useNavigate();

  return (
    <CardHeader className="flex rounded-lg px-0 justify-between">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => {
          if (sortDirection === "asc") {
            navigate({
              to: "/insights",
              search: (prev) => ({
                ...prev,
                sortDirection: "desc",
                sortBy: "name",
              }),
            });
          } else {
            navigate({
              to: "/insights",
              search: (prev) => ({
                ...prev,
                sortDirection: "asc",
                sortBy: "name",
              }),
            });
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
          if (sortDirection === "asc") {
            navigate({
              to: "/insights",
              search: (prev) => ({
                ...prev,
                sortDirection: "desc",
                sortBy: "amount",
              }),
            });
          } else {
            navigate({
              to: "/insights",
              search: (prev) => ({
                ...prev,
                sortDirection: "asc",
                sortBy: "amount",
              }),
            });
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
  );
}
