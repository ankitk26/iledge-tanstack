import { useSuspenseQuery } from "@tanstack/react-query";

import { formatAmount } from "@/lib/format-amount";
import { queries } from "@/queries";

import { CardFooter } from "../ui/card";

const BUDGET = 30000;

export default function CurrMonthExpensesData() {
	const { data } = useSuspenseQuery(queries.expenses.currentAndPreviousMonth);

	const previousMonthAmount = data[0].previousMonthSpent;
	const currentMonthAmount = data[0].currentMonthSpent;

	const budgetPercent = Number(
		((currentMonthAmount / BUDGET) * 100).toFixed(2),
	);

	return (
		<>
			<h2 className="text-3xl">{formatAmount(currentMonthAmount)}</h2>
			<CardFooter className="flex flex-col items-start text-xs text-muted-foreground">
				<p>{budgetPercent}% budget used</p>
				<p>Last month's expenses = {formatAmount(previousMonthAmount)}</p>
			</CardFooter>
		</>
	);
}
