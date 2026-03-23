import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Rectangle,
	XAxis,
	YAxis,
} from "recharts";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getDateParts } from "@/lib/month-year-formatter";
import { queries } from "@/queries";
import { usePaginationControls } from "@/store/use-pagination";
import ChartPagination from "../shared/chart-pagination";
import XAxisTick from "../shared/x-axis-tick";
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

export default function MonthWiseExpensesChart() {
	const { data } = useSuspenseQuery(queries.expenses.monthlyTotals);
	const navigate = useNavigate();
	const isDesktopSize = useMediaQuery();

	const paginationInstanceId = "all-transactions";
	const paginationConfig = {
		windowSize: isDesktopSize ? 13 : 6,
		navigationStep: isDesktopSize ? 13 : 6,
	};
	const { getWindowedData, showPagination } = usePaginationControls(
		paginationInstanceId,
		paginationConfig,
	);

	const windowedData = getWindowedData(data ?? []);

	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle>Monthly Expense Breakdown</CardTitle>
			</CardHeader>
			<CardContent className="mt-4">
				{data?.length === 0 ? (
					<p className="text-center text-sm text-muted-foreground">
						No data found
					</p>
				) : (
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-auto h-62.5"
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
								className="cursor-pointer"
								fill="var(--bar-fill)"
								activeBar={({ ...props }) => {
									return <Rectangle {...props} fillOpacity={0.5} />;
								}}
								onClick={(data) => {
									const { month_date } = data as unknown as {
										month_date: string;
									};
									const { year: yearPart, month: monthPart } =
										getDateParts(month_date);
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
