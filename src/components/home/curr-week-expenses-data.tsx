import { useSuspenseQuery } from "@tanstack/react-query";
import { formatAmount } from "@/lib/format-amount";
import { queries } from "@/queries";

export default function CurrWeekExpensesData() {
	const { data } = useSuspenseQuery(queries.expenses.currentWeek);

	const amount = data.length === 1 ? formatAmount(data[0].amount ?? 0) : 0;

	return <h2 className="text-3xl">{amount}</h2>;
}
