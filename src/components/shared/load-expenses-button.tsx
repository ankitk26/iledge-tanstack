import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";

import { loadExpenses } from "~/server-fns/load-expenses";

import { Button } from "../ui/button";

export default function LoadExpensesButton() {
	const queryClient = useQueryClient();

	const loadExpensesMutation = useMutation({
		mutationFn: () => loadExpenses(),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries();
			toast.success(data?.message ?? "Load successful");
		},
		onError: async () => {
			toast.error("Load unsuccessful", {
				description: "Something went wrong. Try again later",
			});
			await queryClient.invalidateQueries();
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
				<RefreshCwIcon className="animate-spin" />
			) : (
				<RefreshCwIcon />
			)}
		</Button>
	);
}
