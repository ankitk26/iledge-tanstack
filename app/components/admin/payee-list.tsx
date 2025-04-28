import { useQuery } from "@tanstack/react-query";
import { payeesQuery } from "~/queries";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import CategoryDialog from "./category-dialog";
import PayeeItem from "./payee-item";

export default function PayeeList() {
  const { data, isPending } = useQuery(payeesQuery);

  if (isPending) {
    return Array.from({ length: 5 }).map((_, index) => (
      <Card className="p-4" key={index + "_category_skeleton"}>
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />

          <div className="flex flex-col w-full items-start gap-2">
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-1/4 h-5" />
          </div>
        </div>
      </Card>
    ));
  }

  if (data?.length === 0) {
    return <p className="text-muted-foreground text-sm">No data found</p>;
  }

  return (
    <div className="space-y-6">
      {data?.map((payee) => (
        <PayeeItem key={payee.payeeId + "_admin"} payee={payee} />
      ))}
      <CategoryDialog />
    </div>
  );
}
