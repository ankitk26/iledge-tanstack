import { CartesianGrid, XAxis, Bar, Rectangle, BarChart } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
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

// Generate last 12 months of data
const chartData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));
  return {
    month: monthYearFormatter.format(date), // e.g., "Apr 2024"
    amount: Math.floor(Math.random() * 30000 + 5000), // ₹5,000–₹35,000
  };
});

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export default function PayeeMonthlyExpenses() {
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
            <Bar dataKey="amount" className="fill-foreground" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
