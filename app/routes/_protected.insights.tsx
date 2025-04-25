import { createFileRoute } from "@tanstack/react-router";
import ExpenseTable from "~/components/insights/expense-table";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const Route = createFileRoute("/_protected/insights")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8 flex flex-col h-full min-h-0">
      <div className="flex flex-col md:flex-row space-y-4 lg:space-y-0 items-center justify-between">
        <h1 className="text-xl font-semibold">Insights Dashboard</h1>
        <div className="w-full lg:w-fit">
          <Tabs defaultValue="all" className="md:w-[200px] w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grow min-h-0">
        <ExpenseTable />
      </div>
    </div>
  );
}
