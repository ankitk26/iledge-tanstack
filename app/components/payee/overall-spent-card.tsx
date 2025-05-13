import { useQuery } from "@tanstack/react-query";
import { CalculatorIcon } from "lucide-react";
import { formatAmount } from "~/lib/format-amount";
import { payeeOverallSummaryQuery } from "~/queries";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function OverallSpentCard({ payees }: { payees: string }) {
  const { data, isPending, isError } = useQuery(
    payeeOverallSummaryQuery(payees)
  );

  if (isError) {
    return (
      <Card className="lg:grid-cols-1 p-4">
        <p className="text-muted-foreground text-center text-sm">
          Something went wrong
        </p>
      </Card>
    );
  }

  return (
    <Card className="lg:grid-cols-1">
      <CardHeader>
        <CardTitle className="text-muted-foreground">
          Total Amount spent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-3xl">
          {isPending ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            formatAmount(data[0].total_amount)
          )}
        </h2>
      </CardContent>
      <CardFooter className="text-xs">
        {!isPending && (
          <CalculatorIcon className="size-4 mr-2 text-foreground/70" />
        )}{" "}
        {isPending ? (
          <Skeleton className="w-1/4 h-6" />
        ) : (
          `${formatAmount(data[0].average_amount)} spent on average`
        )}
      </CardFooter>
    </Card>
  );
}
