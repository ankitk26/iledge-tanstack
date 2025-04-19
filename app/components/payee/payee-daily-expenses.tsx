import { CartesianGrid, XAxis, Bar, Rectangle, BarChart } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  amount: Math.floor(Math.random() * 200 + 50), // random $50-$250
}));

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export default function PayeeDailyExpenses() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Daily Expense Breakdown this month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] mx-auto"
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={4}
              tickFormatter={(value: string) => value.replace("Day ", "")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Bar
              dataKey="amount"
              radius={6}
              className="fill-foreground"
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
