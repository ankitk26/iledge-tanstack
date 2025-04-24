import { icons, LucideIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Link } from "@tanstack/react-router";

export default function ExpenseItem() {
  const Icon = icons["CircleHelp"] as LucideIcon;

  return (
    <Card className="flex border-border/50 flex-row items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-muted p-2">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span>Amazon</span>
            <Link to="/payees/$payeeId" params={{ payeeId: "45" }}>
              <span className="text-sm text-muted-foreground">amazon@upi</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm font-semibold text-foreground">$200</span>
        <span className="text-xs text-muted-foreground">1 Jun 2024</span>
      </div>
    </Card>
  );
}
