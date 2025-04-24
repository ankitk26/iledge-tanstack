import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";
import { dailyTotalsQuery } from "~/queries";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export default function DailyExpenseBreakdown() {
  const { data, isPending } = useQuery(dailyTotalsQuery);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Daily Expense Breakdown this month</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="h-[250px] aspect-auto mx-auto w-full flex items-end justify-evenly gap-8">
            <Skeleton className="h-1/2 w-8" />
            <Skeleton className="h-3/4 w-8" />
            <Skeleton className="h-1/4 w-8" />
            <Skeleton className="h-full w-8" />
            <Skeleton className="h-2/3 w-8" />
            <Skeleton className="h-1/3 w-8" />
            <Skeleton className="h-3/4 w-8" />
            <Skeleton className="h-1/2 w-8" />
            <Skeleton className="h-1/4 w-8" />
            <Skeleton className="h-5/6 w-8" />
            <Skeleton className="h-1/3 w-8" />
            <Skeleton className="h-full w-8" />
          </div>
        ) : (
          data &&
          data.length > 0 && (
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
                  axisLine={false}
                  interval={4}
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
          )
        )}
        {data?.length === 0 && (
          <p className="text-sm text-center text-muted-foreground">
            No data found
          </p>
        )}
      </CardContent>
    </Card>
  );
}
