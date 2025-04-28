import { Link, Menu } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";
import { SheetContent, SheetTrigger, Sheet } from "../ui/sheet";
import LoadExpensesButton from "./load-expenses-button";
import SheetUser from "./sheet-user";
import ThemeToggle from "./theme-toggle";
import { navlinks } from "~/lib/nav-links";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function HeaderSheetMenu() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-6 p-4">
          {navlinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => {
                setIsSheetOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
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
