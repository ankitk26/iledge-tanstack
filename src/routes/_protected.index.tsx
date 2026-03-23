import { createFileRoute } from "@tanstack/react-router";
import DailyExpenseBreakdown from "@/components/home/daily-expense-breakdown";
import ExpenseSummary from "@/components/home/expense-summary";
import WeeklyExpenseBreakdown from "@/components/home/weekly-expense-breakdown";
import { queries } from "@/queries";

export const Route = createFileRoute("/_protected/")({
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(queries.expenses.today);
		context.queryClient.ensureQueryData(queries.expenses.currentWeek);
		context.queryClient.ensureQueryData(
			queries.expenses.currentAndPreviousMonth,
		);
		context.queryClient.ensureQueryData(queries.expenses.byWeek);
		context.queryClient.ensureQueryData(queries.expenses.byDay);
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-10">
			<ExpenseSummary />
			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-1">
					<WeeklyExpenseBreakdown />
				</div>
				<div className="lg:col-span-2">
					<DailyExpenseBreakdown />
				</div>
			</div>
		</div>
	);
}
