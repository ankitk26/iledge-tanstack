import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import { formatAmount } from "~/lib/format-amount";
import { queries } from "~/queries";
import { useInsightsStore } from "~/store/use-insights";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import FilterSection from "./filter-section";
import TableHeader from "./table-header";
import TablePayeeRow from "./table-payee-row";
import TableSkeleton from "./table-skeleton";

export default function ExpenseTable() {
  const searchQuery = useInsightsStore((store) => store.searchQuery);
  const { sortBy, sortDirection, month, year } = useSearch({
    from: "/_protected/insights",
  });

  const {
    data = [],
    isPending,
    isError,
  } = useQuery(queries.payees.totalsByMonthYear({ month, year }));

  if (isError) {
    return (
      <div className="border rounded-lg p-6 text-destructive">
        <p>Error loading data</p>
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
      <FilterSection filteredData={filteredData} />

      <TableHeader />

      <CardContent className="px-0 text-sm flex flex-col gap-4 mt-0 rounded-lg">
        {isPending && <TableSkeleton />}

        {!isPending && data.length > 0 && filteredData.length === 0 && (
          <div className="text-center text-muted-foreground py-6">
            No expenses found for the selected filters
          </div>
        )}

        {!isPending && data.length === 0 && (
          <div className="text-center text-muted-foreground py-6">
            No data found
          </div>
        )}

        {!isPending &&
          filteredData.length > 0 &&
          filteredData.map((payee) => (
            <TablePayeeRow key={payee.id} payee={payee} />
          ))}
      </CardContent>

      <div className="flex items-center text-sm justify-between px-4 mt-4">
        {isPending ? (
          <Skeleton className="h-4 w-16 mt-4 lg:mt-0" />
        ) : (
          <div>{filteredData.length} rows</div>
        )}

        {isPending ? (
          <Skeleton className="h-4 w-16 mt-4 lg:mt-0" />
        ) : (
          <div>
            Total: <strong>{formatAmount(filteredTotalAmount ?? 0)}</strong>
          </div>
        )}
      </div>
    </Card>
  );
}
