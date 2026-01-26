import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import ExpenseTable from "@/components/insights/expense-table";
import FilterTabs from "@/components/insights/filter-tabs";
import { queries } from "@/queries";

const paramsSchema = z.object({
	sortBy: z.enum(["name", "amount"]).default("name"),
	sortDirection: z.enum(["asc", "desc"]).default("asc"),
	view: z.enum(["all", "monthly"]).default("all"),
	month: z.coerce.number().min(1).max(12).optional(),
	year: z.coerce.number().min(2000).max(3000).optional(),
});

export const Route = createFileRoute("/_protected/insights")({
	validateSearch: zodValidator(paramsSchema),
	loaderDeps: ({ search }) => {
		return search;
	},
	loader: ({ context, deps }) => {
		context.queryClient.prefetchQuery(
			queries.payees.totalsByMonthYear({
				month: deps.month,
				year: deps.year,
			}),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full min-h-0 flex-col space-y-8">
			<div className="flex flex-col items-center justify-between space-y-4 md:flex-row lg:space-y-0">
				<h1 className="text-xl font-semibold">Insights Dashboard</h1>
				<div className="w-full lg:w-fit">
					<FilterTabs />
				</div>
			</div>

			<div className="min-h-0 grow">
				<ExpenseTable />
			</div>
		</div>
	);
}
