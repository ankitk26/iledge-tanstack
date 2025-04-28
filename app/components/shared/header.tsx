import { Link, useNavigate } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { navlinks } from "~/lib/nav-links";
import { Button } from "../ui/button";
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
          {navlinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-foreground/70 hover:underline"
              search={(prev) =>
                link.path === "/search" ? { query: undefined } : prev
              }
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

        <HeaderSheetMenu />
      </nav>
    </header>
  );
}
