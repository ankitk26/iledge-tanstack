import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { queries } from "~/queries";
import CategoryDialog from "../admin/category-dialog";
import { Badge } from "../ui/badge";
import UpdateCategoryButton from "./update-category-button";

export default function PayeeTitle() {
  const { payeeId } = useParams({ from: "/_protected/payees/$payeeId" });
  const { data, isError } = useSuspenseQuery(queries.payees.info(payeeId));

  if (isError) {
    return <p>Something went wrong. Please try again</p>;
  }

  const payee = data[0];

  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <h2 className="text-xl font-semibold">{payee.name}</h2>
        <h5 className="text-muted-foreground">{payee.payee_upi_id}</h5>
        <Badge className="mt-4" variant="secondary">
          {payee.category_name}
        </Badge>
      </div>

      <UpdateCategoryButton payee={payee} />
      <CategoryDialog />
    </div>
  );
}
