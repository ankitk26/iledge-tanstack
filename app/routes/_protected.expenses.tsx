import { createFileRoute } from "@tanstack/react-router";
import MonthExpensesList from "~/components/expenses/month-expenses-list";
import MonthWiseExpensesChart from "~/components/expenses/month-wise-expenses-chart";

export const Route = createFileRoute("/_protected/expenses")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-12">
      <MonthWiseExpensesChart />
      <div>
        <h1>Expenses in Mar 2024</h1>
        <div className="mt-4 space-y-5">
          <MonthExpensesList />
        </div>
      </div>
    </div>
  );
}
