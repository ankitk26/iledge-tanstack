import { useQuery } from "@tanstack/react-query";
import { authClient } from "~/lib/auth-client";
import { queries } from "~/queries";
import ExpenseItem from "../expenses/expense-item";

export default function PayeeExpenses({ payees }: { payees: string }) {
  const { data: authData, isPending: authIsPending } = authClient.useSession();
  const { data } = useQuery({
    ...queries.expenses.filteredExpenses({
      userId: authData?.user.id ?? "",
      payees,
    }),
    enabled: !authIsPending,
  });

  return (
    <div className="mt-4 space-y-4">
      <h4 className="text-muted-foreground -mt-2 mb-8 text-sm">
        {data?.length} expense{(data ?? []).length > 1 ? "s" : ""}
      </h4>
      {data?.map((expense) => (
        <ExpenseItem key={expense.id + "_payees_page"} expense={expense} />
      ))}
    </div>
  );
}
