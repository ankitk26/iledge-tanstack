import CurrMonthExpenses from "./curr-month-expenses";
import CurrWeekExpenses from "./curr-week-expenses";
import TodayExpenses from "./today-expenses";

export default function ExpenseSummary() {
  return (
    <section>
      <h1 className="text-xl font-semibold">Expense Summary</h1>
      <div className="grid my-4 lg:grid-cols-3 gap-8">
        <TodayExpenses />
        <CurrWeekExpenses />
        <CurrMonthExpenses />
      </div>
    </section>
  );
}
