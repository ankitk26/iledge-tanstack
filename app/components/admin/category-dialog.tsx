import { useAdminStore } from "~/store/use-admin-store";
import { useDialogStore } from "~/store/use-dialog-store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import CategoryDialogContent from "./category-dialog-content";

export default function CategoryDialog() {
  const { isOpen, closeDialog } = useDialogStore();
  const setSelectedPayeeId = useAdminStore((store) => store.setSelectedPayeeId);
  const setSelectedCategoryId = useAdminStore(
    (store) => store.setSelectedCategoryId
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedPayeeId(0);
          setSelectedCategoryId(0);
          closeDialog();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl lg:max-h-[80vh] lg:max-w-screen lg:w-[40vw]">
        <DialogHeader className="font-semibold">
          Update default category for payee
        </DialogHeader>

        <ScrollArea className="mt-4 max-h-[40vh] pr-4 lg:mt-6 lg:max-h-[50vh]">
          <CategoryDialogContent />
        </ScrollArea>

        <DialogFooter>
          <Button type="button" variant="secondary">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
