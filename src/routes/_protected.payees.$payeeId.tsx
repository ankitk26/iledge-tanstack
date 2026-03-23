import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense } from "react";
import CurrentMonthCard from "@/components/payee/current-month-card";
import OverallSpentCard from "@/components/payee/overall-spent-card";
import PayeeDailyExpenses from "@/components/payee/payee-daily-expenses";
import PayeeExpenses from "@/components/payee/payee-expenses";
import PayeeMonthlyExpenses from "@/components/payee/payee-monthly-expenses";
import PayeeMonthlyExpensesCount from "@/components/payee/payee-monthly-expenses-count";
import PayeeTitle from "@/components/payee/payee-title";
import { Skeleton } from "@/components/ui/skeleton";
import { queries } from "@/queries";
import { getPayeeById } from "@/server-fns/get-payee-by-id";

export const Route = createFileRoute("/_protected/payees/$payeeId")({
	beforeLoad: async ({ params }) => {
		const payeeId = params.payeeId;
		const payee = await getPayeeById({ data: { payeeId } });

		if (payee.length === 0) {
			throw notFound();
		}
	},
	loader: ({ context, params }) => {
		const payeeId = params.payeeId;

		context.queryClient.ensureQueryData(queries.payees.info(payeeId));
		context.queryClient.ensureQueryData(
			queries.payees.currentAndPreviousMonthTotals(payeeId),
		);
		context.queryClient.ensureQueryData(
			queries.payees.totalAndAverage(payeeId),
		);
		context.queryClient.ensureQueryData(queries.payees.totalsByDay(payeeId));
		context.queryClient.ensureQueryData(
			queries.payees.expenseCountByMonth(payeeId),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { payeeId } = Route.useParams();

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<Suspense
					fallback={
						<div className="flex w-full flex-col items-start gap-2">
							<Skeleton className="h-6 w-1/2" />
							<Skeleton className="h-6 w-1/4" />
						</div>
					}
				>
					<PayeeTitle />
				</Suspense>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				<Suspense fallback={<Skeleton className="h-6 w-1/4" />}>
					<CurrentMonthCard payees={payeeId} />
				</Suspense>
				<Suspense
					fallback={
						<div className="flex h-full flex-col justify-between rounded-none border p-6">
							<div>
								<Skeleton className="h-4 w-1/3" />
								<Skeleton className="mt-4 h-8 w-1/2" />
							</div>
							<Skeleton className="mt-4 h-3 w-1/4" />
						</div>
					}
				>
					<OverallSpentCard payees={payeeId} />
				</Suspense>
			</div>

			<Suspense
				fallback={
					<div className="flex h-62.5 flex-col justify-center rounded-none border">
						<Skeleton className="mx-auto h-4 w-1/3" />
						<Skeleton className="mx-auto mt-4 h-40 w-full" />
					</div>
				}
			>
				<PayeeDailyExpenses payees={payeeId} />
			</Suspense>

			<div className="grid gap-8 lg:grid-cols-2">
				<Suspense
					fallback={
						<div className="flex h-62.5 flex-col justify-center rounded-none border">
							<Skeleton className="mx-auto h-4 w-1/3" />
							<Skeleton className="mx-auto mt-4 h-40 w-full" />
						</div>
					}
				>
					<PayeeMonthlyExpenses payees={payeeId} />
				</Suspense>
				<Suspense
					fallback={
						<div className="flex h-62.5 flex-col justify-center rounded-none border">
							<Skeleton className="mx-auto h-4 w-1/3" />
							<Skeleton className="mx-auto mt-4 h-40 w-full" />
						</div>
					}
				>
					<PayeeMonthlyExpensesCount payees={payeeId} />
				</Suspense>
			</div>

			<div>
				<h3>All transactions</h3>
				<Suspense
					fallback={
						<div className="mt-4 space-y-4">
							{Array.from({ length: 3 }).map((_, i) => (
								<Skeleton key={i} className="h-20 w-full" />
							))}
						</div>
					}
				>
					<PayeeExpenses payees={payeeId} />
				</Suspense>
			</div>
		</div>
	);
}
