import { ListIcon, TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatAmount } from "@/lib/format-amount";
import { queries } from "@/queries";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

export default function CurrentMonthCard({ payees }: { payees: string }) {
	const { data } = useSuspenseQuery(
		queries.payees.currentAndPreviousMonthTotals(payees),
	);

	const currentMonthSpent = data.currentMonthSpent ?? 0;
	const previousMonthSpent = data.previousMonthSpent ?? 0;

	const margin =
		previousMonthSpent === 0
			? 0
			: ((currentMonthSpent - previousMonthSpent) /
					(data.previousMonthSpent ?? 1)) *
				100;

	const marginFormatted = isNaN(margin) ? 0 : Math.abs(margin).toFixed(0);

	return (
		<Card className="lg:grid-cols-1">
			<CardHeader>
				<CardTitle className="text-muted-foreground">
					Amount spent this month
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-3xl">{formatAmount(currentMonthSpent)}</p>
			</CardContent>
			<CardFooter className="text-xs">
				{previousMonthSpent > 0 && (
					<>
						{margin > 0 ? (
							<TrendUpIcon className="mr-2 size-4 text-foreground/70" />
						) : margin < 0 ? (
							<TrendDownIcon className="mr-2 size-4 text-foreground/70" />
						) : (
							<ListIcon className="mr-2 size-4 text-foreground/70" />
						)}
						{margin === 0
							? "Same as previous month"
							: `${marginFormatted}% ${
									margin > 0 ? "more" : "less"
								} than previous
            month (${formatAmount(previousMonthSpent)})`}
					</>
				)}
			</CardFooter>
		</Card>
	);
}
