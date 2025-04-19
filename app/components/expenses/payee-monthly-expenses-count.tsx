import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

// Generate last 12 months of data
const chartData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));
  return {
    month: monthYearFormatter.format(date), // e.g., "Apr 2024"
    expenseCount: Math.floor(Math.random() * 10 + 1), // 1–10 expenses
  };
});

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export default function PayeeMonthlyExpensesCount() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Monthly Expenses Count</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] mx-auto"
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar
              dataKey="expenseCount"
              className="fill-foreground"
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
