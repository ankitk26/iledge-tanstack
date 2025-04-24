import { useQuery } from "@tanstack/react-query";
import { formatAmount } from "~/lib/format-amount";
import { monthComparisonQuery } from "~/queries";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const BUDGET = 30000;

export default function CurrMonthExpenses() {
  const { data, isPending } = useQuery(monthComparisonQuery);

  const prev = data && data.length === 2 ? data[0].amount : 0;
  const curr = data && data.length === 2 ? data[1].amount : 0;

  const currMonthAmount = formatAmount(curr);
  const prevMonthAmount = formatAmount(prev);
  const budgetPercent = Number(((curr / BUDGET) * 100).toFixed(2));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm">
          This month's expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="w-full h-6" />
        ) : (
          <h2 className="text-3xl">{currMonthAmount}</h2>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start text-xs text-muted-foreground">
        {isPending ? (
          <>
            <Skeleton className="w-32 h-3" />
            <Skeleton className="w-48 mt-1 h-3" />
          </>
        ) : (
          <>
            <p>{budgetPercent}% budget used</p>
            <p>Last month's expenses = {prevMonthAmount}</p>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
