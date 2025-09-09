import { createFileRoute } from "@tanstack/react-router";
import GithubIcon from "~/components/login/github-icon";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center py-12">
      <div className="border p-10 flex flex-col items-center rounded-lg">
        <h2 className="text-2xl font-bold">Log in</h2>
        <Button
          className="mt-8"
          size="lg"
          onClick={async () => {
            await authClient.signIn.social({
              provider: "github",
              callbackURL: "/",
            });
          }}
        >
          <GithubIcon />
          Sign in with Github
        </Button>
      </div>
    </div>
  );
}
