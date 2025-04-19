import { createFileRoute } from "@tanstack/react-router";
import DailyExpenseBreakdown from "~/components/home/daily-expense-breakdown";
import ExpenseSummary from "~/components/home/expense-summary";
import WeeklyExpenseBreakdown from "~/components/home/weekly-expense-breakdown";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-10">
      <ExpenseSummary />
      <div className="grid lg:grid-cols-3 gap-8">
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
