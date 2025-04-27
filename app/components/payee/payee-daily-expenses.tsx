import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";
import { payeeDailyTotalsQuery } from "~/queries";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export default function PayeeDailyExpenses({ payees }: { payees: string }) {
  const { data, isError } = useQuery(payeeDailyTotalsQuery(payees));

  if (isError) {
    return (
      <Card className="p-4">
        <p className="text-muted-foreground text-center text-sm">
          Something went wrong
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Daily Expense Breakdown this month</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <p className="text-muted-foreground text-center text-sm">
            No expenses this month
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] mx-auto"
          >
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <YAxis scale="sqrt" hide />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                interval={1}
                axisLine={false}
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
        )}
      </CardContent>
    </Card>
  );
}
