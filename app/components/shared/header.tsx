import { Link, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SheetUser from "./sheet-user";
import User from "./user";
import ThemeToggle from "./theme-toggle";
import LoadExpensesButton from "./load-expenses-button";

const navlinks = [
  { path: "/expenses", label: "Expenses" },
  { path: "/insights", label: "Insights" },
  { path: "/admin", label: "Admin" },
];

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="py-4 sticky top-0 z-50 backdrop-blur-md bg-background/70 w-5/6 mx-auto border-b">
      <nav className="items-center gap-8 text-sm justify-between flex">
        <Link to="/" className="text-xl font-semibold">
          iledge
        </Link>
        <div className="space-x-6 hidden lg:flex">
          {navlinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-foreground/70 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="space-x-6 lg:flex hidden">
          <LoadExpensesButton />
          <ThemeToggle />
          <User />
          <Button
            onClick={async () => {
              await authClient.signOut();
              navigate({ to: "/login" });
            }}
          >
            Log out
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="grid gap-6 p-4">
              {navlinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.label}
                </Link>
              ))}
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
      </nav>
    </header>
  );
}
