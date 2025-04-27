import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { payeeTitleQuery } from "~/queries";
import { Skeleton } from "../ui/skeleton";

export default function PayeeTitle() {
  const { payeeId } = useParams({ from: "/_protected/payees/$payeeId" });
  const { data, isPending, isError } = useQuery(payeeTitleQuery(payeeId));

  if (isPending) {
    return (
      <div className="flex flex-col w-full items-start gap-2">
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/4 h-6" />
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong. Please try again</p>;
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <h2 className="text-xl font-semibold">{data[0].name}</h2>
      <h5 className="text-muted-foreground">{data[0].payee_upi_id}</h5>
    </div>
  );
}
