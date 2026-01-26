import { useQuery } from "@tanstack/react-query";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Rectangle,
	XAxis,
	YAxis,
} from "recharts";

import { queries } from "~/queries";

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

export default function WeeklyExpenseBreakdown() {
	const { data, isPending } = useQuery(queries.expenses.byWeek);

	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle>Weekly Expense Breakdown</CardTitle>
			</CardHeader>
			<CardContent>
				{isPending ? (
					<div className="mx-auto flex aspect-auto h-[250px] w-full items-end justify-evenly gap-8">
						<Skeleton className="h-1/2 w-12" />
						<Skeleton className="h-3/4 w-12" />
						<Skeleton className="h-1/4 w-12" />
						<Skeleton className="h-full w-12" />
					</div>
				) : (
					data &&
					data.length > 0 && (
						<ChartContainer
							config={chartConfig}
							className="mx-auto aspect-auto h-[250px]"
						>
							<BarChart accessibilityLayer data={data}>
								<CartesianGrid vertical={false} />
								<YAxis scale="sqrt" hide />
								<XAxis
									dataKey="week"
									tickLine={false}
									axisLine={false}
								/>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											hideLabel
											hideIndicator
										/>
									}
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
					<p className="text-center text-sm text-muted-foreground">
						No data found
					</p>
				)}
			</CardContent>
		</Card>
	);
}
