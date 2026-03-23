import { useSuspenseQuery } from "@tanstack/react-query";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Rectangle,
	XAxis,
	YAxis,
} from "recharts";
import { queries } from "@/queries";
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

export default function WeeklyExpenseBreakdownData() {
	const { data } = useSuspenseQuery(queries.expenses.byWeek);

	if (data.length === 0) {
		return (
			<p className="text-center text-sm text-muted-foreground">No data found</p>
		);
	}

	return (
		<ChartContainer config={chartConfig} className="mx-auto aspect-auto h-62.5">
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<YAxis scale="sqrt" hide />
				<XAxis dataKey="week" tickLine={false} axisLine={false} />
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel hideIndicator />}
				/>
				<Bar
					dataKey="amount"
					fill="var(--bar-fill)"
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
	);
}
