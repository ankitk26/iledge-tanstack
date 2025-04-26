import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import ExpenseTable from "~/components/insights/expense-table";
import FilterTabs from "~/components/insights/filter-tabs";

const paramsSchema = z.object({
  sortBy: z.enum(["name", "amount"]).default("name"),
  sortDirection: z.enum(["asc", "desc"]).default("asc"),
  view: z.enum(["all", "monthly"]).default("all"),
  month: z.coerce.number().min(1).max(12).optional(),
  year: z.coerce.number().min(2000).max(3000).optional(),
});

export const Route = createFileRoute("/_protected/insights")({
  validateSearch: zodValidator(paramsSchema),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8 flex flex-col h-full min-h-0">
      <div className="flex flex-col md:flex-row space-y-4 lg:space-y-0 items-center justify-between">
        <h1 className="text-xl font-semibold">Insights Dashboard</h1>
        <div className="w-full lg:w-fit">
          <FilterTabs />
        </div>
      </div>

      <div className="grow min-h-0">
        <ExpenseTable />
      </div>
    </div>
  );
}
