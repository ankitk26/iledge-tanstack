import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { toast } from "sonner";

import { queries } from "~/queries";
import { updatePayeeCategory } from "~/server-fns/update-payee-category";
import { useAdminStore } from "~/store/use-admin-store";
import { useDialogStore } from "~/store/use-dialog-store";

import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

import CategoryDialogContent from "./category-dialog-content";

export default function CategoryDialog() {
	const { isOpen, closeDialog } = useDialogStore();
	const {
		selectedCategoryId,
		selectedPayeeId,
		defaultCategoryId,
		resetStore,
		setSelectedCategoryId,
	} = useAdminStore();
	const queryClient = useQueryClient();

	const updateCategoryMutation = useMutation({
		mutationFn: async () => {
			if (selectedCategoryId === defaultCategoryId) {
				return -1;
			}
			await updatePayeeCategory({
				data: {
					payeeId: selectedPayeeId,
					updatedCategoryId: selectedCategoryId,
				},
			});
			return selectedPayeeId;
		},
		onSuccess: async (payeeId) => {
			if (payeeId === -1) {
				closeDialog();
				return;
			}

			await Promise.all([
				// payees/$payeeId page
				queryClient.invalidateQueries({
					queryKey: queries.expenses.filteredExpenses({
						userId: "",
						payees: payeeId.toString(),
					}).queryKey,
				}),

				// expenses page
				queryClient.invalidateQueries({
					queryKey: queries.expenses.filteredExpenses({ userId: "" })
						.queryKey,
				}),

				// admin page
				queryClient.invalidateQueries({
					queryKey: queries.payees.all.queryKey,
				}),

				queryClient.invalidateQueries({
					queryKey: queries.payees.info(payeeId.toString()).queryKey,
				}),
			]);
			toast.success("Category updated");
			resetStore();
			closeDialog();
		},
		onError: () => {
			toast.error("Category not updated", {
				description: "Something went wrong. Please try again",
			});
		},
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) {
					resetStore();
					closeDialog();
				}
			}}
		>
			<DialogContent className="max-w-[425px] md:max-h-[80vh] md:w-[80vw] md:max-w-screen">
				<DialogHeader className="font-semibold">
					<DialogTitle>Update default category for payee</DialogTitle>
				</DialogHeader>

				<ScrollArea className="mt-4 max-h-[40vh] w-full flex-1 md:mt-6 md:max-h-[50vh]">
					<Suspense fallback={<p>Loading...</p>}>
						<CategoryDialogContent />
					</Suspense>
				</ScrollArea>

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						disabled={
							updateCategoryMutation.isPending ||
							selectedCategoryId === defaultCategoryId
						}
						onClick={() => setSelectedCategoryId(defaultCategoryId)}
					>
						Reset
					</Button>
					<Button
						type="button"
						disabled={
							updateCategoryMutation.isPending ||
							selectedCategoryId === defaultCategoryId
						}
						onClick={() => {
							updateCategoryMutation.mutate();
						}}
					>
						{updateCategoryMutation.isPending
							? "Updating..."
							: "Update"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
