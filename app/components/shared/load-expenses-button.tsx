import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { loadExpenses } from "~/server-fns/load-expenses";
import { Button } from "../ui/button";

export default function LoadExpensesButton() {
  const queryClient = useQueryClient();

  const loadExpensesMutation = useMutation({
    mutationFn: () => loadExpenses(),
    onSuccess: async (data) => {
      if (
        data.message === "No expenses found. Please do a full refresh first"
      ) {
        toast.info("No expenses found", {
          description: "Please try again later",
        });
        return;
      }
      await queryClient.invalidateQueries();
      toast.success("Expenses loaded");
    },
    onError: () => {
      toast.error("Load unsuccessful", {
        description: "Something went wrong. Try again later",
      });
    },
  });

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => loadExpensesMutation.mutate()}
      disabled={loadExpensesMutation.isPending}
      className="w-full lg:size-9"
    >
      {loadExpensesMutation.isPending ? (
        <RefreshCw className="animate-spin" />
      ) : (
        <RefreshCw />
      )}
    </Button>
  );
}
