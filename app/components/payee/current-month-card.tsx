import { useQuery } from "@tanstack/react-query";
import { AlignJustify, TrendingDown, TrendingUp } from "lucide-react";
import { formatAmount } from "~/lib/format-amount";
import { payeeMonthStatsQuery } from "~/queries";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CurrentMonthCard({ payees }: { payees: string }) {
  const { data, isPending, isError } = useQuery(payeeMonthStatsQuery(payees));

  if (isError) {
    return (
      <Card className="lg:grid-cols-1 p-4">
        <p className="text-muted-foreground text-center text-sm">
          Something went wrong
        </p>
      </Card>
    );
  }

  const currentMonthSpent = data?.currentMonthSpent ?? 0;
  const previousMonthSpent = data?.previousMonthSpent ?? 0;

  const margin =
    previousMonthSpent === 0
      ? 0
      : ((currentMonthSpent - previousMonthSpent) /
          (data?.previousMonthSpent ?? 1)) *
        100;

  const marginFormatted = isNaN(margin) ? 0 : Math.abs(margin).toFixed(0);

  return (
    <Card className="lg:grid-cols-1">
      <CardHeader>
        <CardTitle className="text-muted-foreground">
          Amount spent this month
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-3xl">
          {isPending ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            formatAmount(currentMonthSpent)
          )}
        </h2>
      </CardContent>
      <CardFooter className="text-xs">
        {isPending ? (
          <Skeleton className="w-1/4 h-6" />
        ) : (
          <>
            {margin > 0 ? (
              <TrendingUp className="size-4 mr-2 text-foreground/70" />
            ) : margin < 0 ? (
              <TrendingDown className="size-4 mr-2 text-foreground/70" />
            ) : (
              <AlignJustify className="size-4 mr-2 text-foreground/70" />
            )}
            {margin === 0
              ? "Same as previous month"
              : `${marginFormatted}% ${margin > 0 ? "more" : "less"} than previous
            month (${formatAmount(previousMonthSpent)})`}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
