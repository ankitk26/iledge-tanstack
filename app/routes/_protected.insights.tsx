import { createFileRoute } from "@tanstack/react-router";
import { columns, Payee } from "~/components/insights/columns";
import ExpenseTable from "~/components/insights/expense-table";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const Route = createFileRoute("/_protected/insights")({
  component: RouteComponent,
});

const data: Payee[] = [
  {
    id: 1,
    name: "Amazon",
    upiId: "amazon@upi1",
    amount: 400,
  },
  {
    id: 2,
    name: "Flipkart",
    upiId: "flipkart.hfc@u",
    amount: 10000,
  },
  {
    id: 3,
    name: "Myntra",
    upiId: "well",
    amount: 300,
  },
];

function RouteComponent() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Insights Dashboard</h1>
        <div>
          <Tabs defaultValue="all" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <ExpenseTable columns={columns} data={data} />
    </div>
  );
}
