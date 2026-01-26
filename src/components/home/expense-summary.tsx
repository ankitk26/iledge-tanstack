import CurrMonthExpenses from "./curr-month-expenses";
import CurrWeekExpenses from "./curr-week-expenses";
import TodayExpenses from "./today-expenses";

export default function ExpenseSummary() {
	return (
		<section>
			<h1 className="text-xl font-semibold">Expense Summary</h1>
			<div className="my-4 grid gap-8 lg:grid-cols-3">
				<TodayExpenses />
				<CurrWeekExpenses />
				<CurrMonthExpenses />
			</div>
		</section>
	);
}
