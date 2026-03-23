import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense } from "react";
import { z } from "zod";
import ExpensesListSkeleton from "@/components/expenses/expenses-list-skeleton";
import MonthWiseExpensesChart from "@/components/expenses/month-wise-expenses-chart";
import MonthWiseExpensesList from "@/components/expenses/month-wise-expenses-list";
import MonthlyExpensesChartSkeleton from "@/components/expenses/monthly-expenses-chart-skeleton";
import { queries } from "@/queries";

const searchParams = z.object({
	month: z
		.number()
		.min(1)
		.max(12)
		.default(new Date().getMonth() + 1),
	year: z.number().default(new Date().getFullYear()),
});

export const Route = createFileRoute("/_protected/expenses")({
	validateSearch: zodValidator(searchParams),
	loaderDeps: ({ search }) => {
		return { month: search.month, year: search.year };
	},
	loader: ({ context, deps }) => {
		context.queryClient.ensureQueryData(queries.expenses.monthlyTotals);
		context.queryClient.ensureQueryData(
			queries.expenses.filteredExpenses({
				month: deps.month,
				year: deps.year,
			}),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-12">
			<Suspense fallback={<MonthlyExpensesChartSkeleton />}>
				<MonthWiseExpensesChart />
			</Suspense>
			<Suspense fallback={<ExpensesListSkeleton />}>
				<MonthWiseExpensesList />
			</Suspense>
		</div>
	);
}
