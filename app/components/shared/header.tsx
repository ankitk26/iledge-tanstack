import { Link, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import HeaderSheetMenu from "./header-sheet-menu";
import LoadExpensesButton from "./load-expenses-button";
import ThemeToggle from "./theme-toggle";
import User from "./user";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="py-4 sticky top-0 z-50 backdrop-blur-md bg-background/70 w-11/12 lg:w-5/6 mx-auto border-b">
      <nav className="items-center gap-8 text-sm justify-between flex">
        <Link to="/" className="text-xl font-semibold">
          iledge
        </Link>
        <div className="space-x-6 hidden lg:flex">
          <Link
            to="/expenses"
            className="hover:text-foreground/70 hover:underline"
          >
            Expenses
          </Link>
          <Link
            to="/insights"
            className="hover:text-foreground/70 hover:underline"
          >
            Insights
          </Link>
          <Link
            to="/admin"
            className="hover:text-foreground/70 hover:underline"
          >
            Admin
          </Link>
          <Link
            to="/search"
            className="hover:text-foreground/70 hover:underline"
          >
            Search
          </Link>
        </div>
        <div className="space-x-6 lg:flex items-center hidden">
          <LoadExpensesButton />
          <ThemeToggle />
          <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
            <User />
          </Suspense>
          <Button
            onClick={async () => {
              await authClient.signOut();
              navigate({ to: "/login" });
            }}
          >
            Log out
          </Button>
        </div>

        <HeaderSheetMenu />
      </nav>
    </header>
  );
}
