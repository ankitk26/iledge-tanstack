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

export default function DailyExpenseBreakdownData() {
	const { data } = useSuspenseQuery(queries.expenses.byDay);

	if (data.length === 0) {
		return (
			<p className="text-center text-sm text-muted-foreground">No data found</p>
		);
	}

	return (
		<ChartContainer config={chartConfig} className="mx-auto aspect-auto h-62.5">
			<BarChart data={data}>
				<CartesianGrid vertical={false} />
				<YAxis scale="sqrt" domain={[0, "auto"]} hide />
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
	);
}
