import { createFileRoute } from "@tanstack/react-router";
import PayeeList from "~/components/admin/payee-list";

export const Route = createFileRoute("/_protected/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage payees</h1>
      <PayeeList />
    </div>
  );
}
