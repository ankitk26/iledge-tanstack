import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { expensesQuery, payeesQuery } from "~/queries";
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
          queryKey: expensesQuery({ userId: "", payees: payeeId.toString() })
            .queryKey,
        }),

        // expenses page
        queryClient.invalidateQueries({
          queryKey: expensesQuery({ userId: "" }).queryKey,
        }),

        // admin page
        queryClient.invalidateQueries({ queryKey: payeesQuery.queryKey }),
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
      <DialogContent className="md:max-h-[80vh] max-w-[425px] md:max-w-screen md:w-[80vw]">
        <DialogHeader className="font-semibold">
          <DialogTitle>Update default category for payee</DialogTitle>
        </DialogHeader>

        <ScrollArea className="mt-4 w-full max-h-[40vh] md:mt-6 md:max-h-[50vh] flex-1">
          <CategoryDialogContent />
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
            variant="secondary"
            disabled={
              updateCategoryMutation.isPending ||
              selectedCategoryId === defaultCategoryId
            }
            onClick={() => {
              updateCategoryMutation.mutate();
            }}
          >
            {updateCategoryMutation.isPending ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
