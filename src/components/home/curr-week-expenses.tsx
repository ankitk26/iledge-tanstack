import { useQuery } from "@tanstack/react-query";
import { formatAmount } from "~/lib/format-amount";
import { queries } from "~/queries";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CurrWeekExpenses() {
  const { data, isPending } = useQuery(queries.expenses.currentWeek);

  const amount =
    data && data.length === 1 ? formatAmount(data[0].amount ?? 0) : 0;

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm">
          This week's expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="w-full h-6" />
        ) : (
          <h2 className="text-3xl">{amount}</h2>
        )}
      </CardContent>
    </Card>
  );
}
