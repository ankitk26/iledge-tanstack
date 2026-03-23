import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "@/queries";
import ExpenseItem from "../expenses/expense-item";

export default function PayeeExpenses({ payees }: { payees: string }) {
	const { data } = useSuspenseQuery({
		...queries.expenses.filteredExpenses({
			payees,
		}),
	});

	return (
		<div className="mt-4 space-y-4">
			<h4 className="-mt-2 mb-8 text-sm text-muted-foreground">
				{data.length} expense{(data ?? []).length > 1 ? "s" : ""}
			</h4>
			{data.map((expense) => (
				<ExpenseItem key={expense.id + "_payees_page"} expense={expense} />
			))}
		</div>
	);
}
