import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "~/queries";
import CategoryDialog from "./category-dialog";
import PayeeItem from "./payee-item";

export default function PayeeList() {
  const { data } = useSuspenseQuery(queries.payees.all);

  if (data.length === 0) {
    return <p className="text-muted-foreground text-sm">No data found</p>;
  }

  return (
    <div className="space-y-6">
      {data.map((payee) => (
        <PayeeItem key={payee.payeeId + "_admin"} payee={payee} />
      ))}
      <CategoryDialog />
    </div>
  );
}
