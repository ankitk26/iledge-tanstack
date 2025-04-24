import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { loadExpenses } from "~/server-fns/load-expenses";
import { Button } from "../ui/button";
import {
  currentDayTotalQuery,
  currentWeekTotalQuery,
  dailyTotalsQuery,
  monthComparisonQuery,
  weeklyTotalsQuery,
} from "~/queries";

export default function LoadExpensesButton() {
  const queryClient = useQueryClient();

  const loadExpensesMutation = useMutation({
    mutationFn: () => loadExpenses(),
    onSuccess: async (data) => {
      console.log(data);
      if (
        data.message === "No transactions found. Please do a full refresh first"
      ) {
        toast.info(data.message);
        return;
      }
      await queryClient.invalidateQueries({
        queryKey: currentDayTotalQuery.queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: currentWeekTotalQuery.queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: monthComparisonQuery.queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: weeklyTotalsQuery.queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: dailyTotalsQuery.queryKey,
      });
      toast.success("Expenses loaded");
    },
    onError: (error) => {
      console.log(error);
      if (typeof error === undefined) {
        toast.error("Load unsuccessful", {
          description: "Something went wrong. Try again later",
        });
        return;
      }
      toast.error("Load unsuccessful", { description: error.message });
    },
  });

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => loadExpensesMutation.mutate()}
      disabled={loadExpensesMutation.isPending}
    >
      {loadExpensesMutation.isPending ? (
        <RefreshCw className="animate-spin" />
      ) : (
        <RefreshCw />
      )}
    </Button>
  );
}
