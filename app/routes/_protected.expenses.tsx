import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import MonthWiseExpensesChart from "~/components/expenses/month-wise-expenses-chart";
import MonthWiseExpensesList from "~/components/expenses/month-wise-expenses-list";

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
  loader: ({ context }) => {
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
