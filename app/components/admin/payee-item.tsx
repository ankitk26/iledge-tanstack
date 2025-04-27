import { Edit } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import CategoryDialogContent from "./category-dialog-content";

interface Props {
  payee: {
    payeeId: number;
    payeeName: string;
    payeeUpiId: string;
    categoryId: number;
    categoryDescription: string;
    categoryIcon: string;
  };
}

export default function PayeeItem({ payee }: Props) {
  const avatarFallbackValue = payee.payeeName
    .split(" ")
    .map((word, index) => (index < 2 ? word.charAt(0).toUpperCase() : ""))
    .join("");

  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarFallback>{avatarFallbackValue}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start gap-1">
            <h3 className="text-sm">{payee.payeeName}</h3>
            <h4 className="text-xs text-muted-foreground">
              {payee.payeeUpiId}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline">{payee.categoryDescription}</Badge>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <Edit />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80vw]">
              <DialogHeader className="font-semibold">
                Update default category for payee
              </DialogHeader>
              <CategoryDialogContent />
              <DialogFooter>
                <Button type="button" variant="secondary">
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
