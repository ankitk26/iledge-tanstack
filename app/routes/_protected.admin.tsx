import { createFileRoute } from "@tanstack/react-router";
import PayeeItem from "~/components/admin/payee-item";

export const Route = createFileRoute("/_protected/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage payees</h1>
      <PayeeItem />
      <PayeeItem />
      <PayeeItem />
    </div>
  );
}
