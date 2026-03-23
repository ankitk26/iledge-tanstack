import { useSuspenseQuery } from "@tanstack/react-query";
import { formatAmount } from "@/lib/format-amount";
import { queries } from "@/queries";

export default function TodayExpensesData() {
	const { data } = useSuspenseQuery(queries.expenses.today);

	const amount = data.length === 1 ? formatAmount(data[0].amount ?? 0) : 0;

	return <p className="text-3xl">{amount}</p>;
}
