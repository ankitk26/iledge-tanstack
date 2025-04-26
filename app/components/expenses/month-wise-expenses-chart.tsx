import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";
import { getDateParts } from "~/lib/month-year-formatter";
import { useIsDesktopScreen } from "~/lib/use-window-size";
import { monthlyTotalsQuery } from "~/queries";
import { usePaginationControls } from "~/store/use-pagination";
import ChartPagination from "../shared/chart-pagination";
import XAxisTick from "../shared/x-axis-tick";
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

export default function MonthWiseExpensesChart({ userId }: { userId: string }) {
  const { data, isPending } = useQuery(monthlyTotalsQuery(userId));
  const { month, year } = useSearch({ from: "/_protected/expenses" });
  const navigate = useNavigate();
  const isDesktopSize = useIsDesktopScreen();

  const paginationInstanceId = "all-transactions";
  const paginationConfig = {
    windowSize: isDesktopSize ? 13 : 6,
    navigationStep: isDesktopSize ? 13 : 6,
  };
  const { getWindowedData, showPagination } = usePaginationControls(
    paginationInstanceId,
    paginationConfig
  );

  const windowedData = getWindowedData(data ?? []);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Monthly Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        {isPending && (
          <div className="h-[250px] aspect-auto mx-auto w-full flex items-end justify-evenly gap-8">
            <Skeleton className="h-1/2 w-12" />
            <Skeleton className="h-3/4 w-12" />
            <Skeleton className="h-1/4 w-12" />
            <Skeleton className="h-full w-12" />
          </div>
        )}
        {!isPending && (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] mx-auto"
          >
            <BarChart data={windowedData}>
              <CartesianGrid vertical={false} />
              <YAxis scale="sqrt" hide />
              <XAxis
                dataKey="month_date"
                tickLine={false}
                tickMargin={15}
                tick={<XAxisTick />}
                axisLine={false}
                interval={0}
                tickFormatter={(value: string) => {
                  const { monthYear } = getDateParts(value);
                  return monthYear;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel hideIndicator />}
              />
              <Bar
                dataKey="amount"
                className="cursor-pointer fill-foreground"
                radius={6}
                activeBar={({ ...props }) => {
                  return <Rectangle {...props} fillOpacity={0.5} />;
                }}
                onClick={(data) => {
                  const { year: yearPart, month: monthPart } = getDateParts(
                    data.month_date
                  );
                  navigate({
                    to: "/expenses",
                    search: {
                      month: monthPart,
                      year: yearPart,
                    },
                  });
                }}
              />
            </BarChart>
          </ChartContainer>
        )}

        {showPagination && (
          <ChartPagination
            paginationInstanceId={paginationInstanceId}
            config={paginationConfig}
          />
        )}
      </CardContent>
    </Card>
  );
}
