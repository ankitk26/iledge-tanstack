import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { getDateParts } from "~/lib/month-year-formatter";
import { payeeMonthlyTotalsQuery } from "~/queries";
import XAxisTick from "../shared/x-axis-tick";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const monthYearFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  year: "numeric",
});
const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export default function PayeeMonthlyExpenses() {
  const { payeeId } = useParams({ from: "/_protected/payees/$payeeId" });
  const { data } = useQuery(payeeMonthlyTotalsQuery(payeeId));

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Monthly Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] mx-auto"
        >
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <YAxis scale="sqrt" hide />
            <XAxis
              dataKey="monthDate"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
              tick={<XAxisTick />}
              tickFormatter={(value) => {
                const { monthYear } = getDateParts(value);
                return monthYear;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="amount" className="fill-foreground" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
