import { Link, useNavigate } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import LoadExpensesButton from "./load-expenses-button";
import SheetUser from "./sheet-user";
import ThemeToggle from "./theme-toggle";

export default function HeaderSheetMenu() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="lg:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-6 p-4">
          <Link
            to="/expenses"
            className="hover:text-foreground/70 hover:underline"
            onClick={() => setIsSheetOpen(false)}
          >
            Expenses
          </Link>
          <Link
            to="/insights"
            className="hover:text-foreground/70 hover:underline"
            onClick={() => setIsSheetOpen(false)}
          >
            Insights
          </Link>
          <Link
            to="/admin"
            className="hover:text-foreground/70 hover:underline"
            onClick={() => setIsSheetOpen(false)}
          >
            Admin
          </Link>
          <Link
            to="/search"
            className="hover:text-foreground/70 hover:underline"
            onClick={() => setIsSheetOpen(false)}
          >
            Search
          </Link>
          <LoadExpensesButton />
          <ThemeToggle />
          <SheetUser />
          <Button
            onClick={async () => {
              await authClient.signOut();
              navigate({ to: "/login" });
            }}
          >
            Log out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
