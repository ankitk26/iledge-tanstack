import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import MonthWiseExpensesChart from "@/components/expenses/month-wise-expenses-chart";
import MonthWiseExpensesList from "@/components/expenses/month-wise-expenses-list";
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
		context.queryClient.prefetchQuery(
			queries.expenses.monthlyTotals(context.user.id),
		);
		context.queryClient.prefetchQuery(
			queries.expenses.filteredExpenses({
				userId: context.user.id,
				month: deps.month,
				year: deps.year,
			}),
		);
		return context.user;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const user = Route.useLoaderData();

	return (
		<div className="space-y-12">
			<MonthWiseExpensesChart userId={user.id} />
			<MonthWiseExpensesList userId={user.id} />
		</div>
	);
}
