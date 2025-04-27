import { createFileRoute } from "@tanstack/react-router";
import CurrentMonthCard from "~/components/payee/current-month-card";
import OverallSpentCard from "~/components/payee/overall-spent-card";
import PayeeDailyExpenses from "~/components/payee/payee-daily-expenses";
import PayeeExpenses from "~/components/payee/payee-expenses";
import PayeeMonthlyExpenses from "~/components/payee/payee-monthly-expenses";
import PayeeMonthlyExpensesCount from "~/components/payee/payee-monthly-expenses-count";
import PayeeTitle from "~/components/payee/payee-title";

export const Route = createFileRoute("/_protected/payees/$payeeId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PayeeTitle />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <CurrentMonthCard />
        <OverallSpentCard />
      </div>

      <div>
        <PayeeDailyExpenses />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <PayeeMonthlyExpenses />
        <PayeeMonthlyExpensesCount />
      </div>

      <div>
        <h3>All transactions</h3>
        <div className="space-y-5 mt-4">
          <PayeeExpenses />
        </div>
      </div>
    </div>
  );
}
