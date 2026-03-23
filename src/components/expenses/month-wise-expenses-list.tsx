import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { queries } from "@/queries";
import ExpenseItem from "./expense-item";

export default function MonthWiseExpensesList() {
	const { month, year } = useSearch({ from: "/_protected/expenses" });
	const { data } = useSuspenseQuery(
		queries.expenses.filteredExpenses({ month, year }),
	);

	const date = new Date(year, month - 1).toLocaleString("en-US", {
		month: "short",
		year: "numeric",
	});

	return (
		<div>
			<h1>Expenses in {date}</h1>
			<div className="mt-4 space-y-4">
				{data.length === 0 ? (
					<p className="text-sm text-muted-foreground">No data found</p>
				) : (
					data.map((expense) => (
						<ExpenseItem key={expense.id} expense={expense} />
					))
				)}
			</div>
		</div>
	);
}
