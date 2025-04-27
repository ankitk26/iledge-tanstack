import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { expensesQuery } from "~/queries";
import ExpenseItem from "../expenses/expense-item";

export default function PayeeExpenses() {
  const { payeeId } = useParams({ from: "/_protected/payees/$payeeId" });
  const { data: authData, isPending: authIsPending } = authClient.useSession();
  const { data } = useQuery({
    ...expensesQuery({
      userId: authData?.user.id ?? "",
      payeeId: parseInt(payeeId),
    }),
    enabled: !authIsPending,
  });

  return (
    <div className="mt-4 space-y-4">
      {data?.map((expense) => (
        <ExpenseItem key={expense.id + "_payees_page"} expense={expense} />
      ))}
    </div>
  );
}
