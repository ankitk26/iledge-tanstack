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

export default function PayeeItem() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start gap-1">
            <h3 className="text-sm">ABDUL QADIR</h3>
            <h4 className="text-xs text-muted-foreground">aq333667@axl</h4>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline">Doctor Visit</Badge>

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
