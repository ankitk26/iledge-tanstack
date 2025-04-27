import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import CurrentMonthCard from "~/components/payee/current-month-card";
import OverallSpentCard from "~/components/payee/overall-spent-card";
import PayeeDailyExpenses from "~/components/payee/payee-daily-expenses";
import PayeeExpenses from "~/components/payee/payee-expenses";
import PayeeMonthlyExpenses from "~/components/payee/payee-monthly-expenses";
import PayeeMonthlyExpensesCount from "~/components/payee/payee-monthly-expenses-count";
import SearchInput from "~/components/search/search-input";
import { Skeleton } from "~/components/ui/skeleton";
import { searchPayeeIdsQuery } from "~/queries";

const searchParams = z.object({
  query: z.string().optional(),
});

export const Route = createFileRoute("/_protected/search")({
  validateSearch: zodValidator(searchParams),
  component: RouteComponent,
});

function RouteComponent() {
  console.log("rendering parent");
  const { query } = Route.useSearch();
  const { data: payees, isPending } = useQuery(searchPayeeIdsQuery(query));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <SearchInput query={query} />

        {isPending && query && query.length >= 2 && (
          <Skeleton className="w-full h-6" />
        )}
        {query && payees && !isPending && (
          <h2 className="text-xl font-semibold">"{query}" Expense Summary</h2>
        )}
      </div>

      {/* <pre>{JSON.stringify({ payees, query, inputQuery })}</pre> */}

      {payees && !isPending && (
        <>
          <div className="grid lg:grid-cols-2 gap-8">
            <CurrentMonthCard payees={payees} />
            <OverallSpentCard payees={payees} />
          </div>

          <div>
            <PayeeDailyExpenses payees={payees} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <PayeeMonthlyExpenses payees={payees} />
            <PayeeMonthlyExpensesCount payees={payees} />
          </div>

          <div>
            <h3>All transactions</h3>
            <div className="space-y-5 mt-4">
              <PayeeExpenses payees={payees} />
            </div>
          </div>
        </>
      )}

      {query && query.length < 2 && (
        <p className="text-muted-foreground text-sm">
          Please enter at least 2 characters
        </p>
      )}

      {query && query.length >= 2 && !isPending && !payees && (
        <p className="text-muted-foreground text-sm">
          No expenses for "{query}" payee were found
        </p>
      )}
    </div>
  );
}
