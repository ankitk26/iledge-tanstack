import { createFileRoute } from "@tanstack/react-router";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import GithubIcon from "~/components/login/github-icon";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [isLogging, setIsLogging] = useState(false);

  return (
    <div className="flex flex-col h-screen items-center justify-center py-12">
      <div className="border space-y-8 p-10 flex flex-col items-center rounded-lg">
        <h2 className="text-2xl font-bold">Log in</h2>
        <Button
          className="w-60"
          size="lg"
          onClick={async () => {
            setIsLogging(true);
            await authClient.signIn.social({
              provider: "github",
              callbackURL: "/",
            });
          }}
        >
          {isLogging ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <>
              <GithubIcon />
              Sign in with Github
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
