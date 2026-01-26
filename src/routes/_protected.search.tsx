import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import CurrentMonthCard from "@/components/payee/current-month-card";
import OverallSpentCard from "@/components/payee/overall-spent-card";
import PayeeDailyExpenses from "@/components/payee/payee-daily-expenses";
import PayeeExpenses from "@/components/payee/payee-expenses";
import PayeeMonthlyExpenses from "@/components/payee/payee-monthly-expenses";
import PayeeMonthlyExpensesCount from "@/components/payee/payee-monthly-expenses-count";
import SearchInput from "@/components/search/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { queries } from "@/queries";

const searchParams = z.object({
	query: z.string().optional(),
});

export const Route = createFileRoute("/_protected/search")({
	validateSearch: zodValidator(searchParams),
	component: RouteComponent,
});

function RouteComponent() {
	const { query } = Route.useSearch();
	const { data: payees, isPending } = useQuery(
		queries.payees.bySearchQuery(query),
	);

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-4">
				<SearchInput query={query} />

				{isPending && query && query.length >= 2 && (
					<Skeleton className="h-6 w-full" />
				)}
				{query && payees && !isPending && (
					<h2 className="text-xl font-semibold">
						"{query}" Expense Summary
					</h2>
				)}
			</div>

			{payees && !isPending && (
				<>
					<div className="grid gap-8 lg:grid-cols-2">
						<CurrentMonthCard payees={payees} />
						<OverallSpentCard payees={payees} />
					</div>

					<div>
						<PayeeDailyExpenses payees={payees} />
					</div>

					<div className="grid gap-8 lg:grid-cols-2">
						<PayeeMonthlyExpenses payees={payees} />
						<PayeeMonthlyExpensesCount payees={payees} />
					</div>

					<div>
						<h3>All transactions</h3>
						<div className="mt-4 space-y-5">
							<PayeeExpenses payees={payees} />
						</div>
					</div>
				</>
			)}

			{query && query.length < 2 && (
				<p className="text-sm text-muted-foreground">
					Please enter at least 2 characters
				</p>
			)}

			{query && query.length >= 2 && !isPending && !payees && (
				<p className="text-sm text-muted-foreground">
					No expenses for "{query}" payee were found
				</p>
			)}
		</div>
	);
}
