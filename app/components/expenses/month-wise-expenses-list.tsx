import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { queries } from "~/queries";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import ExpenseItem from "./expense-item";

export default function MonthWiseExpensesList({ userId }: { userId: string }) {
  const { month, year } = useSearch({ from: "/_protected/expenses" });
  const { data, isPending } = useQuery(
    queries.expenses.filteredExpenses({ userId, month, year })
  );

  const date = new Date(year, month - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <h1>Expenses in {date}</h1>
      <div className="mt-4 space-y-4">
        {isPending ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Card
              key={i + date}
              className="flex flex-row items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </Card>
          ))
        ) : data?.length === 0 ? (
          <p className="text-muted-foreground text-sm">No data found</p>
        ) : (
          data?.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        )}
      </div>
    </div>
  );
}
