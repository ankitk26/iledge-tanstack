import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export default function PayeeMonthlyExpenses({ payees }: { payees: string }) {
	const { data } = useQuery(queries.payees.totalsByMonth(payees));
	const isDesktopSize = useMediaQuery();

	const paginationInstanceId = "payee-monthly-totals";
	const paginationConfig = {
		windowSize: isDesktopSize ? 10 : 6,
		navigationStep: isDesktopSize ? 10 : 6,
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
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-auto h-[250px]"
				>
					<BarChart data={windowedData}>
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
							content={
								<ChartTooltipContent hideLabel hideIndicator />
							}
						/>
						<Bar
							dataKey="amount"
							className="fill-foreground"
							radius={6}
						/>
					</BarChart>
				</ChartContainer>
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
