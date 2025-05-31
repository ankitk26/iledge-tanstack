import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense } from "react";
import CurrentMonthCard from "~/components/payee/current-month-card";
import OverallSpentCard from "~/components/payee/overall-spent-card";
import PayeeDailyExpenses from "~/components/payee/payee-daily-expenses";
import PayeeExpenses from "~/components/payee/payee-expenses";
import PayeeMonthlyExpenses from "~/components/payee/payee-monthly-expenses";
import PayeeMonthlyExpensesCount from "~/components/payee/payee-monthly-expenses-count";
import PayeeTitle from "~/components/payee/payee-title";
import { Skeleton } from "~/components/ui/skeleton";
import { queries } from "~/queries";
import { getPayeeById } from "~/server-fns/get-payee-by-id";

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

    context.queryClient.prefetchQuery(queries.payees.info(payeeId));
    context.queryClient.prefetchQuery(
      queries.payees.currentAndPreviousMonthTotals(payeeId)
    );
    context.queryClient.prefetchQuery(queries.payees.totalAndAverage(payeeId));
    context.queryClient.prefetchQuery(queries.payees.totalsByDay(payeeId));
    context.queryClient.prefetchQuery(
      queries.payees.expenseCountByMonth(payeeId)
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
            <div className="flex flex-col w-full items-start gap-2">
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-1/4 h-6" />
            </div>
          }
        >
          <PayeeTitle />
        </Suspense>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <CurrentMonthCard payees={payeeId} />
        <OverallSpentCard payees={payeeId} />
      </div>

      <div>
        <PayeeDailyExpenses payees={payeeId} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <PayeeMonthlyExpenses payees={payeeId} />
        <PayeeMonthlyExpensesCount payees={payeeId} />
      </div>

      <div>
        <h3>All transactions</h3>
        <div className="space-y-5 mt-4">
          <PayeeExpenses payees={payeeId} />
        </div>
      </div>
    </div>
  );
}
