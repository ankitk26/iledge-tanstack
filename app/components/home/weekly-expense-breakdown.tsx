import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartData = [
  { week: "Week 1", amount: 324 },
  { week: "Week 2", amount: 287 },
  { week: "Week 3", amount: 413 },
  { week: "Week 4", amount: 359 },
  { week: "Week 5", amount: 122 },
];
const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export default function WeeklyExpenseBreakdown() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Weekly Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] mx-auto"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
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
